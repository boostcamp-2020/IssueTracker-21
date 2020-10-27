module.exports = {
    "plugins": [
        "prettier"
    ],
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "ignorePatterns": [
        "node_modules/"
    ],
    "extends": ['airbnb', 'plugin:prettier/recommended'],
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "rules": {
        "prettier/prettier": "error",
        "no-unexpected-multiline": "error",
    }
};
