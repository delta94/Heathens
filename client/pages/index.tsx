import { Container, Typography, Button } from '@material-ui/core';
import Layout from '../components/Layout';

const index = () =>
{
  return (
    <Layout>
      <Container>
        <Typography variant='h1'>hello</Typography>
        <Button variant='contained' color='primary'>Hello Friend</Button>
      </Container>
    </Layout>
  );
};

export default index;
