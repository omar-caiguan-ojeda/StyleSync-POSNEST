module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    //'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: { 
    'no-multi-spaces': 'off',           // Desactiva la advertencia de múltiples espacios
    'indent': 'off',                    // Desactiva la advertencia de indentación
    'space-before-blocks': 'off',       // Desactiva la advertencia sobre los espacios antes de las llaves en bloques
    'space-in-parens': 'off',           // Desactiva la advertencia de espacios dentro de paréntesis
    'keyword-spacing': 'off',           // Desactiva la advertencia de espacios alrededor de las palabras clave
    'computed-property-spacing': 'off', // Desactiva la advertencia de espacios alrededor de propiedades computadas
    'no-whitespace-before-property': 'off', // Desactiva las advertencias de espacio antes de las propiedades
    'no-trailing-spaces': 'off',        // Desactiva la advertencia de espacios al final de las líneas
    'linebreak-style': 'off',           // Desactiva la advertencia sobre el estilo de salto de línea
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
