// color design tokens export
export const colorTokens = {
    white: '#FFFFFF',
    black: '000000',
    grey: {
        50: '#ffffff',
        100: '#fafafa',
        200: '#f5f5f5',
        300: '#f0f0f0',
        400: '#dedede',
        500: '#c2c2c2',
        600: '#979797',
        700: '#818181',
        800: '#606060',
        900: '#3c3c3c'
    },
    primary: {
        50: '#e8ebf6',
        100: '#c3cde8',
        200: '#9cadd9',
        300: '#758dc9',
        400: '#5573be',
        450: '#d4e8fc',
        // 500: "#315bb4",
        500: '#0c70df',
        600: '#2a53aa',
        700: '#1f489e',
        800: '#163f92',
        900: '#032d7c'
    }
};

// mui theme settings
export const themeSettings = (mode) => {
    return {
        components: {
            MuiInputBase: {
                styleOverrides: {
                    input: {}
                }
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        borderRadius: '10px'
                    }
                }
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        fontWeight: '700',
                        fontSize: '15px',
                        textTransform: 'capitalize',
                        borderRadius: '10px'
                    },
                    contained: {
                        // background:
                        // 	"linear-gradient(to right, #74d9eb, #8fb0c7)",
                        // "&:hover": {
                        // 	background: "linear-gradient(to right, red, blue)",
                        // },
                    }
                },
                variants: [
                    {
                        props: { variant: 'light' },
                        style: {
                            textTransform: 'none',
                            fontSize: 14,
                            color:
                                mode !== 'dark'
                                    ? colorTokens.grey[800]
                                    : colorTokens.grey[400], // dark mode color
                            borderRadius: '9px',
                            border: `2px solid ${
                                mode !== 'dark'
                                    ? colorTokens.grey[400]
                                    : colorTokens.grey[800] // dark mode color
                            }`
                        }
                    }
                ]
            }
        },
        palette: {
            mode: mode,
            ...(mode === 'dark'
                ? {
                      // palette values for dark mode
                      primary: {
                          dark: colorTokens.primary[200],
                          main: colorTokens.primary[500],
                          light: colorTokens.primary[800]
                      },
                      neutral: {
                          dark: colorTokens.grey[100],
                          main: colorTokens.grey[200],
                          mediumMain: colorTokens.grey[300],
                          medium: colorTokens.grey[400],
                          light: colorTokens.grey[700]
                      },
                      background: {
                          default: colorTokens.grey[900],
                          alt: colorTokens.grey[800]
                      },
                      error: {
                          custom: '#ed4337',
                          light: '#ef5350',
                          main: '#e74c3c',
                          dark: '#c62828'
                      },
                      warning: {
                          custom: '#ffb13b',
                          light: '#ff9800',
                          main: '#f1c40f',
                          dark: '#e65100'
                      },
                      info: {
                          light: '#03a9f4',
                          main: '#3498db',
                          dark: '#01579b'
                      },
                      success: {
                          custom: '#55cb8a',
                          light: '#4caf50',
                          main: '#07bc0c',
                          dark: '#1b5e20'
                      }
                  }
                : {
                      // palette values for light mode
                      primary: {
                          dark: colorTokens.primary[700],
                          main: colorTokens.primary[500],
                          mainLight: colorTokens.primary[450],
                          light: colorTokens.primary[50]
                      },
                      neutral: {
                          dark: colorTokens.grey[900],
                          main: colorTokens.grey[700],
                          mediumMain: colorTokens.grey[500],
                          medium: colorTokens.grey[400],
                          light: colorTokens.grey[300],
                          default: '#f6f6f6'
                      },
                      background: {
                          default: colorTokens.grey[50],
                          default1: '#f9f9fb',
                          alt: colorTokens.grey[0]
                      },
                      error: {
                          custom: '#ed4337',
                          light: '#ef5350',
                          main: '#d32f2f',
                          dark: '#c62828'
                      },
                      warning: {
                          custom: '#ffb13b',
                          light: '#ff9800',
                          main: '#ed6c02',
                          dark: '#e65100'
                      },
                      info: {
                          light: '#03a9f4',
                          main: '#0288d1',
                          dark: '#01579b'
                      },
                      success: {
                          custom: '#55cb8a',
                          light: '#4caf50',
                          main: '#2e7d32',
                          dark: '#1b5e20'
                      }
                  })
        },
        typography: {
            fontFamily: ['Nunito', 'sans-serif'].join(','),
            fontSize: 12,
            h1: {
                fontFamily: ['Nunito', 'sans-serif'].join(','),
                fontSize: 40,
                margin: 0,
                padding: 0
            },
            h2: {
                fontFamily: ['Nunito', 'sans-serif'].join(','),
                fontSize: 32,
                margin: 0,
                padding: 0
            },
            h3: {
                fontFamily: ['Nunito', 'sans-serif'].join(','),
                fontSize: 24,
                margin: 0,
                padding: 0
            },
            h4: {
                fontFamily: ['Nunito', 'sans-serif'].join(','),
                fontSize: 20,
                margin: 0,
                padding: 0
            },
            h5: {
                fontFamily: ['Nunito', 'sans-serif'].join(','),
                fontSize: 16,
                margin: 0,
                padding: 0
            },
            h6: {
                fontFamily: ['Nunito', 'sans-serif'].join(','),
                fontSize: 14,
                margin: 0,
                padding: 0
            }
        }
    };
};
