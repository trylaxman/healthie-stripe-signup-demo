import path from "path";

const nextConfig = {
  outputFileTracingRoot: path.join(process.cwd()),
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true }
};

export default nextConfig;
