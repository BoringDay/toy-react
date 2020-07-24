module.exports = {
    rules: {
      'no-console': 0,
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    },
    root: true,
    env: {
      "browser": true,
      "node": true,
      "jasmine": true
    },
    extends: 'eslint:recommended',
    parser: "babel-eslint",
    parserOptions: {
      "ecmaVersion": 7,
      "sourceType": "module"
    }
  }
  