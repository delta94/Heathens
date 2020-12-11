import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme( {
    overrides: {
        MuiCssBaseline: {
            '@global': {
                a: {
                    textDecoration: 'none',
                    outline: 'none',
                    border: 'none'
                }
            }
        }
    },
    palette: {
        background: {
            default: '#000'
        },
        text: {
            primary: '#fff'
        },
        type: 'dark',
    }
} );