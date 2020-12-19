import { useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import '../styles/globals.css';
import { theme } from '../styles/styles';
import SnackbarState from '../context/snackbar/SnackbarState';
import CSnackbar from '../components/CSnackbar';

function MyApp ( { Component, pageProps } )
{
  useEffect( () =>
  {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector( '#jss-server-side' );
    if ( jssStyles )
    {
      jssStyles.parentElement.removeChild( jssStyles );
    }
  }, [] );

  return (
    <SnackbarState>
      <ThemeProvider theme={ theme }>
        <CssBaseline />
        <CSnackbar />
        <Component { ...pageProps } />;
    </ThemeProvider>
    </SnackbarState>
  );
}

export default MyApp;
