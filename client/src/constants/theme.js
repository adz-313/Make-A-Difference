import {createMuiTheme} from '@material-ui/core/styles'

export const dark = createMuiTheme({
    palette: {
    type: 'dark',
        secondary: {
            main: '#BB86FC'
        },
        primary: {
            main: '#81E6D9'
        }
    },
});

export const light = createMuiTheme({
    palette: {
    type: 'light',
        secondary: {
            main: '#BB86FC'
        },
        primary: {
            main: '#1e88e5'
        }
    },
});