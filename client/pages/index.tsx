import { Container, Typography, Button, makeStyles, createStyles, Theme, Grid } from '@material-ui/core';
import Layout from '../components/Layout';
import { withApollo } from '../src/apollo';
import NextLink from 'next/link';

const useStyles = makeStyles( ( _: Theme ) => createStyles( {
  root: {
    textAlign: 'center',
  },
  content: {
    marginTop: '6rem'
  }
} ) );

const CHome = () =>
{
  const classes = useStyles();

  return (
    <Layout>
      <div className={ classes.root }>
        <Container className={ classes.content }>
          <Grid container spacing={ 2 } justify='center'>
            <Grid item>
              <Typography variant='h6'>We don't deal with outsiders very well.</Typography>
            </Grid>
            <Grid item>
              <NextLink href='/login' passHref>
                <Button color='primary' variant='contained'>Login</Button>
              </NextLink>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Layout>
  );
};


export default withApollo( { ssr: true } )( CHome );


