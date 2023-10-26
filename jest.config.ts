import type { Config } from "jest";

const config: Config = {
  verbose: true,
  roots: ["<rootDir>/src"],
  testMatch: ["**/tests/*.test.ts"],
  testPathIgnorePatterns: [".build", "node_modules"],
  moduleFileExtensions: ["ts", "js"],
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^config(.*)$": "<rootDir>/src/config/$1",
    "^http(.*)$": "<rootDir>/src/http/$1",
    "^models(.*)$": "<rootDir>/src/models/$1",
  },
};

export default config;
