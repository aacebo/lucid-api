module.exports = {
  roots: [
    "<rootDir>/src"
  ],
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "**/*.ts",
    "!**/node_modules/**",
    "!**/fixtures/**",
    "!**/index.ts",
    "!**/*.controller.ts",
    "!**/*.entity.ts",
    "!**/*.mock.ts",
    "!**/*.enum.ts",
    "!**/*.interface.ts",
    "!**/*.dto.ts"
  ],
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95
    }
  },
  testEnvironment: 'node'
}
