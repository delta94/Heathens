import { Grid } from "@material-ui/core";
import { Container } from "next/app";
import CChannels from "../components/CChannels";
import { withApollo } from "../src/apollo";

const dashboard = () =>
{
    return (
        <Container>
            <Grid container>
                <Grid item xs={ 4 }>
                    <CChannels />
                </Grid>
            </Grid>
        </Container>
    );
};

export default withApollo( { ssr: true } )( dashboard );
