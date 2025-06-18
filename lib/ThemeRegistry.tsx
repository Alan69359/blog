'use client';

import * as React from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from 'lib/theme';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
    useServerInsertedHTML(() => {
        // This part of the code is simplified for CssVarsProvider
        // It's slightly different from the Emotion-based one in the MUI docs
        const a = document.querySelector('style[data-mui-style-id="css-vars"]');
        if (a) {
            return (
                <style
                    data-mui-style-id="css-vars"
                    dangerouslySetInnerHTML={{
                        // VVV THIS IS THE FIX VVV
                        // We use the nullish coalescing operator to provide an
                        // empty string as a fallback if textContent is null.
                        __html: a.textContent ?? '',
                    }}
                />
            );
        }
        return null;
    });

    return (
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <CssVarsProvider theme={theme}>
                <CssBaseline />
                {children}
            </CssVarsProvider>
        </AppRouterCacheProvider>
    );
}