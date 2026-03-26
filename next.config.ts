import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure better-sqlite3 native bindings are not webpack-bundled
  serverExternalPackages: ["better-sqlite3"],

  // Include the SQLite database file in every serverless function's trace
  outputFileTracingIncludes: {
    "/*": ["./prisma/*.db"],
  },
};

export default nextConfig;
