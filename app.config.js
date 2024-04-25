module.exports = {
  name: process.env.APP_NAME,
  slug: 'Launch4Fun',
  scheme: 'Launch4Fun',
  version: '0.0.0',
  orientation: 'portrait',
  icon: process.env.ICON_PATH,
  userInterfaceStyle: 'automatic',
  splash: {
    image: process.env.SPLASH_IMAGE_PATH,
    resizeMode: 'contain',
    backgroundColor: '#242424'
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: process.env.ADAPTIVE_ICON,
      backgroundColor: '#242424'
    },
    package: 'launch4fun.com'
  },
  web: {
    favicon: process.env.FAV_ICON,
    bundler: "metro"
  },
  extra: {
    eas: {
      projectId: '8c84f868-f7f4-4d64-b238-9c1d04c436da'
    },
    API_URL: process.env.API_URL,
    API_URL_ANALYTICS: process.env.API_URL_ANALYTICS,
    APP_NAME: process.env.APP_NAME,
    APP_DOMAIN: process.env.APP_DOMAIN
  },
  plugins: [
    "expo-router",
    "expo-localization"
  ],
  experiments: {
    tsconfigPaths: true
  }
}
