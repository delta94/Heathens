import { Container, Typography, Button, makeStyles, createStyles, Theme } from '@material-ui/core';
import Layout from '../components/Layout';

const useStyles = makeStyles( ( _: Theme ) => createStyles( {
  root: {

  }
} ) );

const CHome = () =>
{
  const classes = useStyles();

  return (
    <Layout>
      <div className={ classes.root }>
        <Container>
          <Typography variant='h1'>hello</Typography>
          <Button variant='contained' color='primary'>Hello Friend</Button>
        </Container>
      </div>
    </Layout>
  );
};

export default CHome;
