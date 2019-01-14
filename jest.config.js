module.exports = {
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  "globals": {
    "ts-jest": {
      "tsConfig": "tsconfig.json",
      "diagnostics": false
    }
  },
  "testMatch": [
    "**/__tests__/*.+(ts|tsx|js)"
  ],
  "collectCoverage": true,
  collectCoverageFrom: ['src/**/*.{ts}'],
};
