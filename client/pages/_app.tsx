import { ThemeProvider, CssBaseline } from '@material-ui/core';
import '../styles/globals.css';
import { theme } from '../styles/styles';

function MyApp ( { Component, pageProps } )
{
  return (
    <ThemeProvider theme={ theme }>
      <CssBaseline />
      <Component { ...pageProps } />;
    </ThemeProvider>
  );
}

export default MyApp;
