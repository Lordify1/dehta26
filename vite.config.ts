// vite.config.ts
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path, { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { visualizer } from "rollup-plugin-visualizer"

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        visualizer({ open: false })
    ],
    server: {
        host: '0.0.0.0',
        port: 8080,
        strictPort: true,
    },
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
        alias: {
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
            '@': resolve(__dirname, 'src')
        },
    }
});
