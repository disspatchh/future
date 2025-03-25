// vite.config.ts
import { defineConfig } from "file:///Users/andrei/future/app/main/node_modules/.pnpm/vite@5.2.11/node_modules/vite/dist/node/index.js";
import react from "file:///Users/andrei/future/app/main/node_modules/.pnpm/@vitejs+plugin-react@4.2.1_vite@5.2.11/node_modules/@vitejs/plugin-react/dist/index.mjs";
import wyw from "file:///Users/andrei/future/app/main/node_modules/.pnpm/@wyw-in-js+vite@0.5.3_typescript@5.4.5_vite@5.2.11/node_modules/@wyw-in-js/vite/esm/index.mjs";
import svgr from "file:///Users/andrei/future/app/main/node_modules/.pnpm/vite-plugin-svgr@4.2.0_rollup@4.17.2_typescript@5.4.5_vite@5.2.11/node_modules/vite-plugin-svgr/dist/index.js";
import federation from "file:///Users/andrei/future/app/main/node_modules/.pnpm/@originjs+vite-plugin-federation@1.3.5/node_modules/@originjs/vite-plugin-federation/dist/index.mjs";
var vite_config_default = defineConfig({
  server: {
    port: 3e3,
    open: true
  },
  plugins: [
    react(),
    wyw({
      include: ["**/*.{ts,tsx}"],
      babelOptions: {
        presets: ["@babel/preset-typescript", "@babel/preset-react"]
      }
    }),
    svgr({
      svgrOptions: {}
    }),
    federation({
      name: "main",
      remotes: {
        remoteDashboard: "http://localhost:5001/assets/remoteEntry.js"
      },
      shared: ["react", "react-dom"]
    })
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYW5kcmVpL2Z1dHVyZS9hcHAvbWFpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2FuZHJlaS9mdXR1cmUvYXBwL21haW4vdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2FuZHJlaS9mdXR1cmUvYXBwL21haW4vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgd3l3IGZyb20gJ0B3eXctaW4tanMvdml0ZSc7XG5pbXBvcnQgc3ZnciBmcm9tICd2aXRlLXBsdWdpbi1zdmdyJztcbmltcG9ydCBmZWRlcmF0aW9uIGZyb20gJ0BvcmlnaW5qcy92aXRlLXBsdWdpbi1mZWRlcmF0aW9uJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDMwMDAsXG4gICAgb3BlbjogdHJ1ZSxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgd3l3KHtcbiAgICAgIGluY2x1ZGU6IFsnKiovKi57dHMsdHN4fSddLFxuICAgICAgYmFiZWxPcHRpb25zOiB7XG4gICAgICAgIHByZXNldHM6IFsnQGJhYmVsL3ByZXNldC10eXBlc2NyaXB0JywgJ0BiYWJlbC9wcmVzZXQtcmVhY3QnXSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgc3Zncih7XG4gICAgICBzdmdyT3B0aW9uczoge30sXG4gICAgfSksXG4gICAgZmVkZXJhdGlvbih7XG4gICAgICBuYW1lOiAnbWFpbicsXG4gICAgICByZW1vdGVzOiB7XG4gICAgICAgIHJlbW90ZURhc2hib2FyZDogJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMS9hc3NldHMvcmVtb3RlRW50cnkuanMnLFxuICAgICAgfSxcbiAgICAgIHNoYXJlZDogWydyZWFjdCcsICdyZWFjdC1kb20nXSxcbiAgICB9KSxcbiAgXSxcbiAgYnVpbGQ6IHtcbiAgICBtb2R1bGVQcmVsb2FkOiBmYWxzZSxcbiAgICB0YXJnZXQ6ICdlc25leHQnLFxuICAgIG1pbmlmeTogZmFsc2UsXG4gICAgY3NzQ29kZVNwbGl0OiBmYWxzZSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5USxTQUFTLG9CQUFvQjtBQUN0UyxPQUFPLFdBQVc7QUFDbEIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sVUFBVTtBQUNqQixPQUFPLGdCQUFnQjtBQUd2QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sSUFBSTtBQUFBLE1BQ0YsU0FBUyxDQUFDLGVBQWU7QUFBQSxNQUN6QixjQUFjO0FBQUEsUUFDWixTQUFTLENBQUMsNEJBQTRCLHFCQUFxQjtBQUFBLE1BQzdEO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxLQUFLO0FBQUEsTUFDSCxhQUFhLENBQUM7QUFBQSxJQUNoQixDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDVCxNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsUUFDUCxpQkFBaUI7QUFBQSxNQUNuQjtBQUFBLE1BQ0EsUUFBUSxDQUFDLFNBQVMsV0FBVztBQUFBLElBQy9CLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsSUFDZixRQUFRO0FBQUEsSUFDUixRQUFRO0FBQUEsSUFDUixjQUFjO0FBQUEsRUFDaEI7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
