export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-vue',
  ],
  rules: {
    'no-empty-source': null,
    'color-no-invalid-hex': true,
  },
  overrides: [
    {
      files: ['**/*.vue', '**/*.css', '**/*.scss'],
      customSyntax: 'postcss-html',
    },
  ],
  ignoreFiles: ['dist/**', 'public/**', 'build/**', 'node_modules/**'],
}
