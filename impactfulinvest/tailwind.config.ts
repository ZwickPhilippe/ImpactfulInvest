/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/utils/const.ts',
  ],
  theme: {
    colors: {
      'text-hover-primary': '#000000',
      'text-secondary': '#000000',
      'text-tertiary': '#ffffff',
      'text-quaternary': '#ffffff',
      'text-quinary': '#000000',
      'text-secondary-200': '#000000',
      'text-tertiary-200': '#000000',
      'text-quaternary-200': '#000000',
      'text-quinary-200': '#000000',
      'text-emerald-200': '#000000',
      'text-indigo-200': '#000000',
      'text-yellow-200': '#000000',
      'text-red-200': '#000000',
      'text-orange-200': '#000000',
      'text-green-200': '#000000',
      'text-cyan-200': '#000000',
      'text-amber-200': '#000000',
      'text-teal-200': '#000000',
      'text-sky-200': '#000000',
      'text-rose-200': '#000000',
      'text-pink-200': '#000000',
      'primary': {
        100: '#f3eee5',
        200: '#f1ece0',
        300: '#efe9dc',
        400: '#ede6d8',
        500: '#ece4d4',
        600: '#d4cdbe',
        700: '#bcb6a9',
        800: '#a59f94',
        900: '#8d887f',
      }, 
      'text-primary': {
        100: '#000000',
        200: '#000000',
        300: '#000000',
        400: '#000000',
        500: '#000000',
        600: '#000000',
        700: '#000000',
        800: '#000000',
        900: '#000000',
      },
      'secondary': {
        100: '#e5f3ee',
        200: '#e0f1ec',
        300: '#dcefe9',
        400: '#d8ede6',
        500: '#d4ece4',
        600: '#bed4cd',
        700: '#a9bcb6',
        800: '#94a59f',
        900: '#7f8d88',
      },
      'tertiary': {
        100: '#b5a7f3',
        200: '#a392f0',
        300: '#917cec',
        400: '#6c50e6',
        500: '#4724e0',
        600: '#4020ca',
        700: '#391db3',
        800: '#32199d',
        900: '#2b1686',
      },
      'quaternary': {
        100: '#d7ceff',
        200: '#d0c6ff',
        300: '#c9bdff',
        400: '#c3b5ff',
        500: '#bcadff',
        600: '#a99ce6',
        700: '#968acc',
        800: '#8479b3',
        900: '#716899',
      },
      'quinary': {
        100: '#dcef8c',
        200: '#d6ec79',
        300: '#d1e965',
        400: '#cbe752',
        500: '#c5e43f',
        600: '#b1cd39',
        700: '#9eb632',
        800: '#8aa02c',
        900: '#768926',
      },
      'success': '#15803d', 
      'warning': '#b45309', 
      'error': '#b91c1c', 
      gray: colors.zinc,
      transparent: 'transparent',
      current: 'currentColor',
      'black': '#000000',
      'white': '#ffffff',
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      red: colors.red,
      orange: colors.orange,
      green: colors.green,
      cyan: colors.cyan,
      amber: colors.amber,
      teal: colors.teal,
      sky: colors.sky,
      rose: colors.rose,
      pink: colors.pink,
      lime: colors.lime,
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'black': '8px 8px 0px 0px rgba(0, 0, 0, 1)',
        'black-left': '-8px 8px 0px 0px rgba(0, 0, 0, 1)',
        'inset': 'inset 0px 2px 8px 4px rgb(0 0 0 / 0.15)',
        'floating': [
          '6px 6px 6px rgb(0 0 0 / 0.1)',
          '-6px 6px 6px rgb(0 0 0 / 0.1)'
        ],
        'active': [
          '2px 2px 2px rgb(0 0 0 / 0.3)',
          '-2px 2px 2px rgb(0 0 0 / 0.3)',
        ],
        'active-left': [
          '-2px 2px 2px rgb(0 0 0 / 0.3)',
        ],
        'active-right': [
          '2px 2px 2px rgb(0 0 0 / 0.3)',
        ]
      },
      dropShadow: {
        'floating': [
          '6px 6px 6px rgb(0 0 0 / 0.1)',
          '-6px 6px 6px rgb(0 0 0 / 0.1)'
        ],
        'active': [
          '2px 2px 2px rgb(0 0 0 / 0.3)',
          '-2px 2px 2px rgb(0 0 0 / 0.3)',
        ],
        'active-left': [
          '-2px 2px 2px rgb(0 0 0 / 0.3)',
        ],
        'active-right': [
          '2px 2px 2px rgb(0 0 0 / 0.3)',
        ],
        'glow': [
          "0 0px 8px rgba(222, 57, 25, 0.35)",
          "0 0px 8px rgba(222, 57, 25, 0.35)"
        ]
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
        'oswald': ['Oswald', 'sans-serif'],
        'source-sans-pro': ['Source Sans Pro', 'sans-serif'],
      }
    },
  },
  plugins: [
  ],
}