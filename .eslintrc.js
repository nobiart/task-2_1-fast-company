module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['plugin:react/recommended', 'standard'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
        indent: [0, 4, { SwitchCase: 1, flatTernaryExpressions: true }],
        semi: [2, 'always'],
        'space-before-function-paren': ['error', { anonymous: 'always', named: 'never' }],
        'multiline-ternary': ['off']
    }
};
