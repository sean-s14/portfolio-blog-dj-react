import {
    createTheme,
    // responsiveFontSizes
} from '@mui/material/styles';
import { 
    // red,
    // green, 
    // blue, 
    // lightBlue, 
    // blueGrey, 
    // grey, 
    // orange, 
    indigo
} from '@mui/material/colors';


const baseTheme = createTheme({
    shape: {
        borderRadius: 0
    },
    typography: {
        body1: {
            fontSize: '1.35rem',
            fontWeight: 400
        },
        body2: {
            fontSize: '1rem',
            fontWeight: 300
        }
    },
    components: {
        MuiInput: {
            styleOverrides: {
                root: {
                    '&::after': {
                        display: 'none'
                    },
                    '&::before': {
                        display: 'none'
                    }
                }
            }
        }
    }
})


declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
      dashed: true;
    }
}

let lightTheme = createTheme({
    ...baseTheme,
    palette: {
        ...baseTheme.palette,
        mode: 'light',
        primary: {
            light: indigo[50],
            main: indigo[100],
            dark: indigo[200],
            contrastText: '#111'
        },
        text: {
            primary: indigo[400],
            secondary: indigo[50],
            disabled: 'rgba(0,0,0, 0.4)'
        }
    },
    typography: {
        ...baseTheme.typography,
        fontWeightLight: 400,
        fontWeightRegular: 600,
        fontWeightMedium: 800
    },
    components: {
        ...baseTheme.components,
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    '&.Mui-checked': {
                        color: indigo[400],
                    },
                    color: indigo[400],

                },
            }
        },
    }
})


let darkTheme = createTheme({
    ...baseTheme,
    palette: {
        ...baseTheme.palette,
        mode: 'dark',
        primary: {
            light: indigo[700],
            main: indigo[800],
            dark: indigo[900],
            contrastText: '#FFF'
        },
        text: {
            primary: indigo[50],
            secondary: indigo[800],
            disabled: 'rgba(0,0,0, 0.4)'
        }
    },
    components: {
        ...baseTheme.components,
        MuiInput: {
            styleOverrides: {
                root: {
                    color: indigo[50],
                    bgcolor: indigo[700],
                    borderColor: indigo[900],
                    '&::after': {
                        display: 'none'
                    },
                    '&::before': {
                        display: 'none'
                    }
                }
            }
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    '&.Mui-checked': {
                        color: indigo[200],
                    },
                    color: indigo[200],
                },
            }
        },
    }
})

// darkTheme = responsiveFontSizes(darkTheme, { breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'], factor: 3 })
// lightTheme = responsiveFontSizes(lightTheme, { breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'], factor: 3 })

export { darkTheme, lightTheme }

