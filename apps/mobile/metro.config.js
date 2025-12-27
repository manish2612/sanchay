const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(workspaceRoot, 'node_modules'),
];

// Force Metro to resolve react-native to the workspace root to prevent duplicate instances
config.resolver.extraNodeModules = {
    'react-native': path.resolve(workspaceRoot, 'node_modules/react-native'),
    'react': path.resolve(workspaceRoot, 'node_modules/react'),
};
// fixes "Unable to resolve module expo-router/entry-classic" error that was preventing the mobile app from running.
// config.resolver.disableHierarchicalLookup = true;

module.exports = config;
