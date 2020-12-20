import { useContext, useEffect } from "react";
import Preloader from "./Preloader";
import { snackbarContext } from "../context/snackbar/snackbarContext";
import { useGetChannelsQueryQuery } from "../src/generated/graphql";
import { Divider, Drawer, List, ListItem, Typography, withMobileDialog } from "@material-ui/core";
import { Container } from "next/app";
import { makeStyles, createStyles, Theme } from '@material-ui/core';

const drawerWidth = 165;

const useStyles = makeStyles( ( theme: Theme ) => createStyles( {
    drawer: {
        width: drawerWidth
    },
    drawerPaper: {
        width: drawerWidth,
        // background: theme.palette.primary.main,
        background: '#3F4D5E'
    },
    channel: {

    }
} ) );

const CChannels = () =>
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

    console.log( data );

    return (
        <div>
            <Container>
                <Drawer variant='permanent' anchor='left' className={ classes.drawer } classes={ {
                    paper: classes.drawerPaper
                } }>
                    <Divider />
                    <List>
                        <ListItem>
                            <Typography variant='h5'>
                                Channels
                            </Typography>
                        </ListItem>
                        { data ? data.getChannels.map( channel => <div key={ channel.id }>
                            <ListItem button className={ classes.channel }>
                                { channel.name }
                            </ListItem>
                            {/* <Divider /> */ }
                        </div> )
                            : <Typography color='primary' variant='h6'>
                                No channels yet
                            </Typography> }
                    </List>
                </Drawer>
            </Container>
        </div>
    );
};

export default CChannels;