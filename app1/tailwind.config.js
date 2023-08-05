module.exports = {
  content: [  './public/index.html',
  './src/**/*.{vue,js,ts}',
  './src/views/**/*.{vue,js,ts}',
  './src/components/**/*.{vue,js,ts}',],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
