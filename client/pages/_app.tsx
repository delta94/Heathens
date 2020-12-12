import { useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import '../styles/globals.css';
import { theme } from '../styles/styles';

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
    <ThemeProvider theme={ theme }>
      <CssBaseline />
      <Component { ...pageProps } />;
    </ThemeProvider>
  );
}

export default MyApp;
