"use client";

import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

// A helper function to load a script.
const loadScript = (src: string) => {
    return new Promise<void>((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
            return resolve();
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = (err) => reject(new Error(`Failed to load script: ${src}\n${err}`));
        document.body.appendChild(script);
    });
};

// A helper function that polls until a condition is met.
const waitFor = (condition: () => boolean): Promise<void> => {
    return new Promise(resolve => {
        const check = () => {
            if (condition()) {
                resolve();
            } else {
                setTimeout(check, 50); // Check every 50ms
            }
        };
        check();
    });
};

export default function Live2DViewer () {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // Use a ref for the PIXI app so it persists across re-renders
        const appRef = { current: null as PIXI.Application | null };

        const initialize = async () => {
            // Prevent re-initialization on hot-reloads
            if ((window as any).live2d_initialized || !canvasRef.current) {
                return;
            }
            (window as any).live2d_initialized = true;

            try {
                // --- ROBUST LOADING SEQUENCE ---
                (window as any).PIXI = PIXI;
                await loadScript('/pixi-live2d-display/live2dcubismcore.min.js');
                await waitFor(() => (window as any).Live2DCubismCore);
                await loadScript('/pixi-live2d-display/cubism4.min.js');

                // --- PIXI INITIALIZATION ---
                const Live2DModel = (window as any).PIXI.live2d.Live2DModel;

                const app = new PIXI.Application({
                    view: canvasRef.current,
                    autoStart: true,
                    backgroundAlpha: 0,
                    resizeTo: canvasRef.current,
                });
                appRef.current = app;

                const model = await Live2DModel.from('/pixi-live2d-display/Beatrice/ac_base_beatrice_after20y01.model3.json');

                console.log("Model loaded successfully!");

                app.stage.addChild(model);
                model.anchor.set(0.5, 1);
                model.scale.set(0.04);

                const resizeModel = () => {
                    model.x = 150;
                    model.y = app.screen.height;
                };
                resizeModel();
                app.renderer.on('resize', resizeModel);

            } catch (error) {
                console.error("Failed to initialize Live2D model:", error);
                (window as any).live2d_initialized = false;
            }
        };

        initialize();

        // This cleanup function will run when the component is unmounted.
        return () => {
            // Destroy the PIXI app to free up resources.
            if (appRef.current) {
                appRef.current.destroy(true, true);
            }
            // THE FIX: Do NOT reset the live2d_initialized flag here.
            // We want it to persist across hot reloads within the same browser session.
        };
    }, []); // The empty dependency array means this effect runs only on mount/unmount.

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                left: 0,
                bottom: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 3, // <-- ADD THIS LINE
            }}
        />
    );
};