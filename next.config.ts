import type { NextConfig } from "next";

// We use require here because next-pwa might not have perfect TS exports in some environments,
// but with @ducanh2912/next-pwa it provides a default export we can import.
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: false, // Habilitado en desarrollo para que puedas probar la instalación
  register: true,
});

const nextConfig: NextConfig = {
  // Silences the Turbopack/Webpack error caused by the PWA plugin during 'next dev'
  turbopack: {},
};

export default withPWA(nextConfig);
