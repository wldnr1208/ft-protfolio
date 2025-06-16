import type { NextConfig } from "next";
import type { Configuration } from "webpack";

const nextConfig: NextConfig = {
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  webpack: (config: Configuration, context: { isServer: boolean }) => {
    if (!context.isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve?.fallback,
          fs: false,
          path: false,
        },
      };
    }
    return config;
  },
};

export default nextConfig;
