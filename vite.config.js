import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/React-Portfolio/', // Asegúrate de reemplazar esto con el nombre de tu repositorio

  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
});
