// lib/Live2dWidget.js
"use client";

import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { Live2DModel } from "pixi-live2d-display/cubism4";

// This is a known workaround for some environments where PIXI events don't work otherwise.
window.PIXI = PIXI;

const Live2dWidget = () => {
  const canvasRef = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
    // This effect runs only once on the client after the component mounts
    if (!canvasRef.current || appRef.current) {
      return;
    }

    // --- THIS IS THE NEW LOGIC ---
    // We create an async function to handle the setup, because we need to `await` the script loading.
    const setupLive2D = async () => {
      try {
        // Load the Cubism 4 core script
        await loadScript("/live2d-widget/dist/live2dcubismcore.min.js");

        // Now that the script is loaded, we can initialize the PIXI Application
        const app = new PIXI.Application({
          view: canvasRef.current,
          width: 300,
          height: 400,
          transparent: true,
          autoStart: true,
        });
        appRef.current = app;

        // Load the Beatrice model
        const model = await Live2DModel.from(
          "/live2d_api/model/Beatrice/index.json",
          { autoInteract: true }
        );

        app.stage.addChild(model);

        // Scale and position the model
        const scale = (canvasRef.current.height / model.height) * 0.8;
        model.scale.set(scale);
        model.x = (canvasRef.current.width - model.width) / 2;
      } catch (err) {
        console.error("Error setting up Live2D model:", err);
      }
    };

    setupLive2D();

    // Cleanup function to destroy the PIXI app when the component unmounts
    return () => {
      if (appRef.current) {
        appRef.current.destroy(true, true);
        appRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ position: "fixed", bottom: 0, right: 0, zIndex: 1000 }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

// Helper function to load a script and return a Promise
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export default Live2dWidget;
