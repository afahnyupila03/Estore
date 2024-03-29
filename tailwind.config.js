module.exports = {
  content: [
    './public/index.html',
    './src/Components/{html,js}',
    './index.html',
  ],
  purge: ["./src/**/*.html", "./src/**/*.jsx", "./src/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      gridTemplateRows: {
        '[auto, auto, 1fr]': 'auto auto 1fr'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
