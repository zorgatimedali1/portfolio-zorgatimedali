import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'
import imagemin from 'vite-plugin-imagemin'

const plugins = process.env.NODE_ENV === "development"
  ? [inspectAttr(), react()]
  : [react(), imagemin({
    gifsicle: { optimizationLevel: 3 },
    optipng: { optimizationLevel: 7 },
    pngquant: { quality: [0.7, 0.85] },
    mozjpeg: { quality: 75 },
    webp: { quality: 75 },
  })];

export default defineConfig({
  base: '/',
  plugins,
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
