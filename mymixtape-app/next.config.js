/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  devIndicators: {
    buildActivityPosition: "bottom-right",
  },
  env: {
    API_SERVER_URL: "http://mymixtape-api:8080",
    API_CLIENT_URL: "http://localhost:8080",
    API_SESSION_VAR: "MyMixtape_Session",
  },
};

module.exports = nextConfig;
