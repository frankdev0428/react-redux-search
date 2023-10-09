module.exports = {
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
    collectCoverageFrom: ['<rootDir>/**/*.{ts, tsx}'],
    roots: ['<rootDir>'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx)$',
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: [
        "<rootDir>/src/setupTests.ts"
    ]
};
  