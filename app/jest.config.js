const path = require('path');

module.exports = {
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  testMatch: ['**/__tests__/**/*.test.tsx', '**/__tests__/**/*.test.ts'],
  coveragePathIgnorePatterns: [
    'node_modules',
    'coverage',
    '/__.*__/',
    'jest.config.js',
  ],
  setupFilesAfterEnv: ['./src/testing/setup.ts'],
  rootDir: path.resolve(__dirname),
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/src/testing/svgr-mocks.ts',
    '^testing-library': '<rootDir>/src/testing/utils/testing-library.tsx',
    '^@swell-public/shared/(.*)': '<rootDir>/../shared/src/$1',
  },
  testEnvironment: 'jsdom',
  collectCoverageFrom: ['**/**/*.tsx?'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.test.json',
    },
  },
};
