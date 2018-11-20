import grey from '@material-ui/core/colors/grey'
import cyan from '@material-ui/core/colors/cyan'

const rootTheme = ({
    fontFamily: 'Roboto, sans-serif',
    display: 'flex',
    palette: {
        primary: {
            light: cyan[700],
            main: cyan[800],
            dark: cyan[900],
            contrastText: '#fff'
        },
        secondary: {
            light: grey[300],
            main: grey[800],
            dark: grey[900],
            contrastText: '#E0E0E0'
        }
    },
    appBar: {
        height: 50
    },
    toolbar: {
        titleFontSize: 'small',
        height: 40
    },
    typography: {
        useNextVariants: true
    }
})

export default rootTheme;