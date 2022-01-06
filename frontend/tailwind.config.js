module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily:{
      'roboto': 'Roboto, sans-serif'
    }, 
    extend: {
      minWidth: {
        '1/2': '50%',
        '5%': '5%'
      },
      screens: {
        "ssm": "550px",
        'l': "1000px",
        'll': "1300px",
        'lsl': "1100px",
        'lxl': "1400px",
        '3xl': "1600px",
        '4xl': "1700px",
        '5xl': "1800px",
        '6xl': "1900px",
        '7xl': "2000px"
      },
      width: {
        '96%': '96%',
        '80%': '80%',
        '35%': '35%',
      },
      height: {
        '80vh': '80vh',
        '88vh': '84.5vh',
        '10vh': '10vh',
        '5vh': '5vh',
        '7vh': '7vh',
        '80%': '80%',
        'full-minus': 'calc(100% - 4rem);'
      },
      colors: {
        "gray-120": "#F1F3F6",
        "gray-border": "#ECEEF3",
        "indigo-next" : "#0082DA",
        "blue-plus" : "#2B6DE6",
        "green-valid" : "#00D7A7",
        "green-invalid" : "#E3FCF6",
        "red-999": "#a84e32"
        
        
      }
    },
  },
  plugins: [],
}
