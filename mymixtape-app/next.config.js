/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  devIndicators: {
    buildActivityPosition: "bottom-right",
  },
};

module.exports = nextConfig;
