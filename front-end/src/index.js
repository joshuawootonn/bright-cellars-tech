import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import App from './components/App';
import './index.scss';
import * as colors from './constants/colors';
import { DARK_GRAY, MEDIUM_GRAY } from './constants/colors';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: colors.EDEN,
        },
        secondary: {
            main: colors.GAMBOGE,
        },
    },
    breakpoints: {
        values: {
            md: 768,
        },
    },
    overrides: {
        MuiTypography: {
            subtitle1: {
                color: DARK_GRAY,
                fontWeight: 500,
            },
            body1: {
                color: MEDIUM_GRAY,
            },
            body2: {
                color: MEDIUM_GRAY,
            },
        },
        MuiSelect: {
            select: {
                color: colors.WHITE,
            },
            icon: {
                color: colors.WHITE,
            },
        },
        MuiInput: {
            underline: {
                '&:before': {
                    borderBottomColor: colors.WHITE,
                },
                '&:after': {
                    borderBottomColor: colors.WHITE,
                },
            },
        },
    },
});

const renderApp = () => {
    ReactDOM.render(
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>,
        document.getElementById('app')
    );
};

if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./components/App', renderApp);
}

renderApp();
