import { extendTheme } from 'native-base';

const nativeBaseTheme = extendTheme({
  fontConfig: {
    NotoSansThaiRegular: {
      400: {
        normal: 'NotoSansThaiRegular',
        italic: 'NotoSansThaiRegular',
      },
    },
    NotoSansThaiMedium: {
      500: {
        normal: 'NotoSansThaiMedium',
        italic: 'NotoSansThaiMedium',
      },
    },
    NotoSansThaiSemiBold: {
      600: {
        normal: 'NotoSansThaiSemiBold',
        italic: 'NotoSansThaiSemiBold',
      },
    },
  },
  fonts: {
    heading: 'NotoSansThaiSemiBold',
    body: 'NotoSansThaiRegular',
  },
  colors: {
    gray: {
      50: '#e6e7e8',
      100: '#cdcfd0',
      200: '#b4b7b9',
      300: '#9b9fa1',
      400: '#83878a',
      500: '#6a6e72',
      600: '#51565b',
      700: '#383e43',
      800: '#1f262c',
      900: '#060e14',
    },
    primary: {
      50: '#e6effc', // Background
      100: '#cddffa', // Background
      200: '#82aff2',
      300: '#689eef',
      400: '#367ee9',
      500: '#045EE4', // Primary
      600: '#0455cd',
      700: '#034bb6',
      800: '#0342a0',
      900: '#023889',
    },
    green: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    orange: {
      50: '#fef6e6',
      100: '#feedcc',
      200: '#fddb99',
      300: '#fbc866',
      400: '#fab633',
      500: '#F9A400',
      600: '#e09400',
      700: '#c78300',
      800: '#ae7300',
      900: '#956200',
    },
    background: {
      50: '#E9F2FF',
    },
  },
  components: {
    Button: {
      baseStyle: ({ colorScheme }) => {
        return {
          _text: {
            color: 'white',
          },
        };
      },
      defaultProps: {
        colorScheme: 'orange',
        size: 'lg',
        _text: {
          fontWeight: 500,
          fontFamily: 'NotoSansThaiSemiBold',
        },
      },
    },
    Text: {
      defaultProps: {
        fontSize: 'lg',
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: 600,
      },
      defaultProps: {
        fontFamily: 'NotoSansThaiSemiBold',
      },
    },
    FormControlLabel: {
      baseStyle: {
        fontSize: 'md',
      },
      defaultProps: {
        marginBottom: 2,
        _text: {
          fontSize: 'md',
        },
      },
    },
    FormControlHelperText: {
      baseStyle: {
        _text: {
          color: 'gray.500',
          fontSize: 'md',
        },
      },
    },
    FormControlErrorMessage: {
      baseStyle: {
        marginTop: 2,
        _text: {
          color: 'red.500',
          fontSize: 'md',
        },
      },
    },
    TextArea: {
      baseStyle: {
        rounded: 'xl',
        fontFamily: 'NotoSansThaiRegular',
        backgroundColor: 'white',
        borderColor: '#ccd1db',
      },
    },
    Input: {
      baseStyle: {
        height: '55px',
      },
      defaultProps: {
        fontSize: 'xl',
        size: 'lg',
      },
    },
    AlertTitle: {
      baseStyle: {
        _text: {
          fontSize: 'lg',
          fontFamily: 'NotoSansThaiRegular',
        },
      },
    },
  },
  config: {},
});

type nativeBaseThemeType = typeof nativeBaseTheme;
declare module 'native-base' {
  interface INativeBaseTheme extends nativeBaseThemeType {}
}

export default nativeBaseTheme;
