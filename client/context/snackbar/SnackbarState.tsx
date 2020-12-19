import SnackbarReducer from './snackbarReducer';
import { snackbarContext as SnackbarContext } from './snackbarContext';
import { ReactNode, useReducer } from "react";
import { SState } from '../../src/types';
import { SET_SNACKBAR } from '../contextTypes';

interface IProps
{
    children: ReactNode;
}

const SnackbarState = ( props: IProps ) =>
{
    const initialState: SState = {
        isActive: false,
        message: null,
        severity: {
            type: 'error'
        }
    };

    const [ state, dispatch ] = useReducer( SnackbarReducer, initialState );

    const setSnackbar = ( data: SState ) =>
    {
        dispatch( {
            type: SET_SNACKBAR,
            payload: data
        } );
    };

    return (
        <SnackbarContext.Provider value={ {
            isActive: state.isActive,
            message: state.message,
            severity: state.severity,
            setSnackbar
        } }>
            {props.children }
        </SnackbarContext.Provider>
    );
};

export default SnackbarState;
