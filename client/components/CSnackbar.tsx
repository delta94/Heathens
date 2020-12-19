import { FC, useContext, useEffect, useState } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { ISnackbarProps } from '../src/interfaces';
import { snackbarContext as SnackbarContext } from '../context/snackbar/snackbarContext';

const Alert = ( props: any ) =>
{
    return <MuiAlert elevation={ 6 } variant='filled' { ...props } />;
};

const CSnackbar = () =>
{

    const { isActive, message, severity, setSnackbar } = useContext( SnackbarContext );

    const handleClose = () =>
    {
        setSnackbar( {
            isActive: false,
            message: null,
            severity: {
                type: 'error'
            }
        } );
    };

    console.log( 'isActive, message, severity', isActive, message, severity );

    return (
        <div>
            <Snackbar open={ isActive } autoHideDuration={ 6000 } onClose={ handleClose }>
                <Alert onClose={ handleClose } severity={ severity.type }>
                    { message }
                </Alert>
            </Snackbar>
        </div>
    );
};

export default CSnackbar;
