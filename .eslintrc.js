module.exports = {
    env: {
        browser: true,
        es6: true,
        es2017: true,
        node: true,
    },
    extends: [
        'eslint:recommended', // Uses the recommended rules from @eslint
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array
        'prettier',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: '.',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['react', 'eslint-plugin-deprecate', '@typescript-eslint', 'prettier', 'eslint-plugin-import-helpers', 'jsdoc'],
    rules: {
        'react/prop-types': 0,
        'react/jsx-uses-react': 1,
        'react/jsx-uses-vars': 1,
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'import-helpers/order-imports': [
            'warn',
            {
                newlinesBetween: 'never',
                groups: ['/^[a-z].*$/', '/^@.*$/', 'module', ['parent', 'sibling', 'index']],
                alphabetize: {order: 'asc'},
            },
        ],
        'jsdoc/require-jsdoc': 1,
        'jsdoc/check-alignment': 1,
        'jsdoc/require-description': 1,
        'jsdoc/require-description-complete-sentence': 0,
        'jsdoc/check-param-names': 1,
        'jsdoc/require-param': 0,
        'jsdoc/require-param-description': 1,
        'jsdoc/require-param-name': 1,
        'jsdoc/require-param-type': 0,
        'jsdoc/check-property-names': 1,
        'jsdoc/require-property': 1,
        'jsdoc/require-property-description': 1,
        'jsdoc/require-property-name': 1,
        'jsdoc/require-property-type': 0,
        'jsdoc/require-returns-check': 0,
        'jsdoc/require-returns-type': 0,
        'jsdoc/valid-types': 1,
        'react/display-name': 0,
        'react/no-render-return-value': 1,
        '@typescript-eslint/restrict-template-expressions': [1, {allowNumber: true}],
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/unbound-method': 1,
        '@typescript-eslint/no-unsafe-return': 1,
        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/no-empty-interface': 1,
        '@typescript-eslint/ban-types': 1,
        '@typescript-eslint/no-unsafe-member-access': 0,
        '@typescript-eslint/no-unsafe-call': 0,
        '@typescript-eslint/no-unsafe-assignment': 0,
        '@typescript-eslint/no-unused-vars': ['warn', {argsIgnorePattern: '^_'}],
        '@typescript-eslint/explicit-module-boundary-types': [
            'warn',
            {
                allowedNames: [
                    'render',
                    'constructor',
                    'componentDidMount',
                    'componentDidUpdate',
                    'componentWillUnmount',
                    'componentDidCatch',
                    'getDerivedStateFromError',
                    'getDerivedStateFromProps',
                ],
            },
        ],
        '@typescript-eslint/no-floating-promises': 0,
    },
    ignorePatterns: ['webpack', 'webpack.config.ts', '.eslintrc.js'],
    settings: {
        react: {
            version: '17.0.1',
        },
    },
};
