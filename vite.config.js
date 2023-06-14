/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';
const path = require('path');

export default defineConfig(() => {
    return {
        resolve: {
            alias: { '~': path.resolve(__dirname, 'src') }
        },
        build: {
            outDir: 'build'
        },
        server: {
            port: 3000,
            open: true,
            proxy: {
                '/socket.io': {
                    target: 'http://localhost:4001',
                    ws: true
                },
                '/api': {
                    target: 'http://localhost:3001', // Replace with the URL of your Express server
                    changeOrigin: true,
                    secure: false
                    // Additional options if needed
                }
            }
            // proxy: {
            //     '/api': {
            //         target: 'http://jsonplaceholder.typicode.com',
            //         changeOrigin: true,
            //         configure: (proxy, options) => {
            //             // proxy will be an instance of 'http-proxy'
            //         }
            //     },
            // '/socket.io': {
            //     target: 'ws://localhost:5174',
            //     ws: true
            // }
            // }
        },
        plugins: [svgr(), react(), eslint()]
    };
});
