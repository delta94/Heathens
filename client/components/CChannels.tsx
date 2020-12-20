import { FC, useContext, useEffect } from "react";
import Preloader from "./Preloader";
import { snackbarContext } from "../context/snackbar/snackbarContext";
import { useGetChannelsQueryQuery } from "../src/generated/graphql";
import { Divider, Drawer, List, ListItem, Typography, withMobileDialog } from "@material-ui/core";
import { Container } from "next/app";
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import Layout from "./Layout";

const drawerWidth = 200;

const useStyles = makeStyles( ( theme: Theme ) => createStyles( {
    drawer: {
        width: drawerWidth,
        zIndex: -1,
        textAlign: 'center'
    },
    drawerPaper: {
        width: drawerWidth,
        // background: theme.palette.primary.main,
        background: '#2D343D',
    },
    channel: {

    },
    textCenter: {
        textAlign: 'center'
    }
} ) );

interface ICChannels
{
    handleChannelClick: ( id: number ) => () => void;
}

const CChannels: FC<ICChannels> = ( { handleChannelClick } ) =>
{
    const { data, error, loading } = useGetChannelsQueryQuery();
    const { setSnackbar } = useContext( snackbarContext );
    const classes = useStyles();

    useEffect( () =>
    {
        if ( error )
        {
            setSnackbar( {
                isActive: true,
                message: error.message,
                severity: {
                    type: 'error'
                }
            } );
        }
    }, [ error ] );

    if ( loading )
    {
        return <Preloader />;
    }

    console.log( 'getChannels response = ', data );

    return (
        <Layout>
            <Container>
                <Drawer variant='permanent' anchor='left' className={ classes.drawer } classes={ {
                    paper: classes.drawerPaper
                } }>
                    <Divider />
                    <List className={ classes.textCenter }>
                        <ListItem>
                            <Typography variant='h5'>
                                Channels
                            </Typography>
                        </ListItem>
                        { data ? data.getChannels.map( channel => <div key={ channel.id }>
                            <ListItem onClick={ handleChannelClick( channel.id ) } button className={ classes.channel }>
                                { channel.name }
                            </ListItem>
                        </div> )
                            : <Typography color='secondary' variant='h6'>
                                No channels yet
                            </Typography> }
                    </List>
                </Drawer>
            </Container>
        </Layout>
    );
};

export default CChannels;