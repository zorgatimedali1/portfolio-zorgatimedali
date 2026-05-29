import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

const plugins = process.env.NODE_ENV === "development"
  ? [inspectAttr(), react()]
  : [react()];

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
