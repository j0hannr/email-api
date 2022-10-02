module.exports = {
  swcMinify: true, // error when enabled! Rust compiler enabled (faster)
  reactStrictMode: true, // highlighting potential problems in an application
  images: { // allow external resources for images
    domains: ["api.mapbox.com","www.wuppertal.de"],
  },
  webpack(config) { // webpack config
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};