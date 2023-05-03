// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(fireBase);
defaultConfig.resolver.assetExts.push('cjs');

module.exports = defaultConfig;
