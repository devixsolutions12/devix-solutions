import type { NextConfig } from "next";

// Trigger rebuild for tailwind config (attempt 3)
const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
