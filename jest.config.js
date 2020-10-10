module.exports = {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/setup-tests.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  coverageReporters: ['lcov', 'text', 'cobertura'],
  reporters: ['default', 'jest-junit'],
  testRegex: 'tests/.*\\.(spec|e2e)\\.tsx?$',
  collectCoverageFrom: ['lib/**/*', 'pages/**/*', 'components/**/*']
};
