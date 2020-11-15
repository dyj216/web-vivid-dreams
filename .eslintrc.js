module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        'plugin:@angular-eslint/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier',
        'prettier/@typescript-eslint'
    ],
    "parser": '@typescript-eslint/parser',
    "parserOptions": {
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "@angular-eslint"
    ]
};
