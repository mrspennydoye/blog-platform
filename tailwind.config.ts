const config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
    },
    extend: {
      colors: {
        primary: {
          '50': '#FDF0F7',
          '100': '#F3B5D5',
          '200': '#EC92BF',
          '300': '#E86FAA',
          '400': '#E24D98',
          '500': '#B33877',
          '600': '#882A59',
          '700': '#5A1C3C',
          '800': '#2D0E1E',
          '900': '#0C0C0C',
        },
      }
    },
  },
  plugins: [],
};

export default config;