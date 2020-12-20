import { Grid, Typography, makeStyles, Theme, createStyles } from "@material-ui/core";
import { Container } from "next/app";
import CChannels from "../components/CChannels";
import { withApollo } from "../src/apollo";
import { Fragment, useContext, useEffect, useState } from 'react';
import CChannel from "../components/CChannel";

const useStyles = makeStyles( ( theme: Theme ) => createStyles( {
    singleChannel: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5rem'
    }
} ) );

const dashboard = () =>
{
    const [ currentChannel, setCurrentChannel ] = useState( null );
    const classes = useStyles();

    const handleChannelClick = ( id: number ) => () =>
    {
        setCurrentChannel( id );
    };

    console.log( 'currentChannel = ', currentChannel );

    return (
        <Container>
            <Grid container>
                <Grid item lg={ 4 } xs={ 12 }>
                    <CChannels handleChannelClick={ handleChannelClick } />
                </Grid>
                <Grid item lg={ 8 } xs={ 12 } className={ classes.singleChannel }>
                    { currentChannel ? <CChannel channelId={ currentChannel } /> : <Fragment>
                        <Typography variant='h5' color='secondary'>
                            You must select a channel
                        </Typography>
                    </Fragment> }
                </Grid>
            </Grid>
        </Container>
    );
};

export default withApollo( { ssr: true } )( dashboard );
