module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      colors: {
        'primary': {
          '50': '#f4f6f9',
          '100': '#e9ecf3',
          '200': '#c7d1e0',
          '300': '#a5b5ce',
          '400': '#627da9',
          '500': '#1e4584',
          '600': '#1b3e77',
          '700': '#173463',
          '800': '#12294f',
          '900': '#0f2241'
        },
        'secondary': {
          '50': '#f4fbfb',
          '100': '#e9f7f7',
          '200': '#c7eaea',
          '300': '#a5ddde',
          '400': '#62c4c5',
          '500': '#1faaac',
          '600': '#1c999b',
          '700': '#178081',
          '800': '#136667',
          '900': '#0f5354'
        }
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};