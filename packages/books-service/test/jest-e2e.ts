const config = {
  "moduleFileExtensions": [
    "js",
    "json",
    "ts"
  ],
  "rootDir": "..",
  "testEnvironment": "node",
  "testRegex": ".e2e-spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  // "setupFiles": [ "<rootDir>/setup.ts" ],
  "globalSetup": "<rootDir>/test/setup.ts",
  "globalTeardown": "<rootDir>/test/teardown.ts",
};

export default config;
