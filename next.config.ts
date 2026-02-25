import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/results",
        destination: "/success-stories",
        permanent: true,
      },
      {
        source: "/successstories",
        destination: "/success-stories",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
