import { FormControl, FormHelperText, Input, InputLabel, Button } from "@material-ui/core";
import { FC, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { snackbarContext } from "../context/snackbar/snackbarContext";
import { usePostMessageMutationMutation } from "../src/generated/graphql";
import { IPostMessage } from "../src/interfaces";
import Preloader from "./Preloader";

interface IPostMessageProps
{
    channelId: number;
}

const PostMessage: FC<IPostMessageProps> = ( { channelId } ) =>
{
    const [ postMessageMutation, { loading, error, data } ] = usePostMessageMutationMutation();
    const { setSnackbar } = useContext( snackbarContext );
    const { handleSubmit, errors, register } = useForm<IPostMessage>( {
        defaultValues: {
            content: 'oh shit'
        }
    } );

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

    const postMessage = ( { content }: IPostMessage ) =>
    {
        postMessageMutation( {
            variables: {
                channelId,
                content
            }
        } ).then( () =>
        {
            setSnackbar( {
                isActive: true,
                severity: {
                    type: 'success'
                },
                message: 'Message Posted!'
            } );
        } ).catch( err => console.error( err ) );
    };

    if ( loading )
    {
        return <Preloader />;
    }

    console.log( 'postMessage response = ', data );

    return (
        <div>
            <form onSubmit={ handleSubmit( postMessage ) } autoComplete='off'>
                <FormControl fullWidth error={ errors.content ? true : false }>
                    <InputLabel htmlFor="content">Content</InputLabel>
                    <Input id="content" name='content' inputRef={ register( {
                        required: 'Content is required',
                    } ) } />

                    { errors.content ? <FormHelperText
                        error
                        id="content-helper-text">{ errors.content.message }
                    </FormHelperText> : <FormHelperText id="content-helper-text">Type Message</FormHelperText> }
                </FormControl>
                <Button type='submit' variant='contained' color='primary'>
                    Post
                </Button>
            </form>
        </div>
    );
};

export default PostMessage;
