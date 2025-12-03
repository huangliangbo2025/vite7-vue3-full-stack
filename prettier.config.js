/** @type {import("prettier").Config} */
export default {
  semi: false,
  singleQuote: true,
  printWidth: 100,
  trailingComma: 'none',
  tabWidth: 2,
  vueIndentScriptAndStyle: false,

  plugins: [
    'prettier-plugin-tailwindcss',
    'prettier-plugin-astro',
  ],
}
