const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
    spinner: (theme) => ({
      default: {
        color: '#dae1e7', // color you want to make the spinner
        size: '1.25em', // size of the spinner (used for both width and height)
        border: '3px', // border-width of the spinner (shouldn't be bigger than half the spinner's size)
        speed: '1000ms', // the speed at which the spinner should rotate
      },
    }),
  },
  variants: {
    spinner: ['responsive'],
  },
  plugins: [
    require('@tailwindcss/ui'),
    require('tailwindcss-spinner')({ className: 'spinner', themeKey: 'spinner' }),
  ],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
};
