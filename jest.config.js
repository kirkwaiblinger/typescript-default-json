module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': ['@swc/jest' ],
  },
  setupFilesAfterEnv: ['./test/setup-after-env.ts'],
};
