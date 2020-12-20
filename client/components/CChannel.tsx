import { Typography } from "@material-ui/core";
import { Container } from "next/app";
import { FC, Fragment, useContext, useEffect } from "react";
import { snackbarContext } from "../context/snackbar/snackbarContext";
import { useGetSingleChannelQueryQuery, useJoinChannelMutationMutation, useLeaveChannelMutationMutation } from "../src/generated/graphql";
import CChatBox from "./CChatBox";
import PostMessage from "./PostMessage";
import Preloader from "./Preloader";

interface ICChannel
{
    channelId: number;
}

const CChannel: FC<ICChannel> = ( { channelId } ) =>
{
    const { loading, error, data } = useGetSingleChannelQueryQuery( {
        variables: {
            id: channelId
        }
    } );


    const [ joinChannel ] = useJoinChannelMutationMutation( {
    } );

    const [ leaveChannel ] = useLeaveChannelMutationMutation();

    const { setSnackbar } = useContext( snackbarContext );

    useEffect( () =>
    {
        joinChannel( {
            variables: {
                id: channelId
            }
        } ).then( () =>
        {
            setSnackbar( {
                isActive: true,
                message: 'Channel Joined!',
                severity: {
                    type: 'success'
                }
            } );

        } ).catch( err => console.error( err ) );


        return () =>
        {
            leaveChannel( {
                variables: {
                    id: channelId
                }
            } ).then( () =>
            {
                // setSnackbar( {
                //     severity: {
                //         type: 'info'
                //     },
                //     message: 'You left the channel',
                //     isActive: true
                // } );
            } ).catch( ( err: any ) => console.error( err ) );

        };
    }, [] );

    useEffect( () =>
    {
        if ( error )
        {
            setSnackbar( {
                isActive: true,
                severity: {
                    type: 'error'
                },
                message: error.message
            } );
        }
    }, [ error ] );

    if ( loading )
    {
        return <Preloader />;
    }

    console.log( 'get single channel response = ', data );

    return (
        <div>
            {data ? <Fragment>
                <Typography variant='h6' color='secondary'>
                    { data.getSingleChannel.name }
                </Typography>
                <Typography variant='subtitle1'>
                    { data.getSingleChannel.desc }
                </Typography>
                <PostMessage channelId={ channelId } />
                <CChatBox messages={ data.getSingleChannel.messages } />
            </Fragment> : null }
        </div>
    );
};

export default CChannel;
