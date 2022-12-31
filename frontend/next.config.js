/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        API_URL: "http://127.0.0.1:8000",
        MAPBOX_ACCESS_TOKEN: "pk.eyJ1IjoiYXJ1bmVzaGd1cHRhIiwiYSI6ImNsY2J6dDRpZTAzZm0zb24xcDlnY3RhNHcifQ.be6s7aPhZjZiJvZod_XZfw",
    },
};

module.exports = nextConfig;
