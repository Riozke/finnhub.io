import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from "vite-plugin-pwa";


export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Real-Time Stock Tracker",
        short_name: "StockTracker",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#1E40AF",
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/ws\.finnhub\.io/,
            handler: "NetworkFirst",
            options: {
              cacheName: "stock-data",
              expiration: { maxEntries: 50, maxAgeSeconds: 3600 },
            },
          },
        ],
      },
    }),
  ],
});
