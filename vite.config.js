import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";
import * as fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // inject({ Buffer: ['buffer', 'Buffer'] }),
    {
      name: "configure-response-headers",
      configureServer: (server) => {
        server.middlewares.use((_req, res, next) => {
          // res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
          // res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
          next();
        });
      },
    },
  ],
  server: {
    port: 3000,
    host: "0.0.0.0",
    // host: '192.168.0.63'
    // https: true,
    hmr: {
      clientPort: 3005,
    },
    https: {
      key: fs.readFileSync("/Volumes/nas.vers.kr/VERS/etc/SSL/privkey.pem"),
      cert: fs.readFileSync("/Volumes/nas.vers.kr/VERS/etc/SSL/cert.pem"),
      ca: fs.readFileSync("/Volumes/nas.vers.kr/VERS/etc/SSL/chain.pem"),
    },
    cors: true,
    /** 테스트 서버와의 CORS 이슈 해결을 위한 vite 설정입니다. */

    proxy: {
      "/api": {
        target: "https://office.vers.kr:3000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
