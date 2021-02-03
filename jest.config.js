const path = require("path");
module.exports = {
    testTimeout: 30000,
    bail: 5,
    "moduleDirectories": [
        "node_modules"
    ],
    "moduleFileExtensions": [
        "js",
        "jsx"
    ],
    setupFiles: ["./setupTests.js"],
    transform: {
        "^.+\\.(js|jsx|mjs)$": "./jest-transformer.js"
    },
    verbose: true
}