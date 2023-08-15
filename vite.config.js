import { defineConfig } from "vite";

export default defineConfig(({ command, mode }) => {
  return {
    server: {
      port: 3000,
      host: true,
      open: true
    }
  };
});
