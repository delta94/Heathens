import { SET_SNACKBAR } from "../contextTypes";
import { SAction, SState } from "../../src/types";

const snackbarReducer = ( state: SState, action: SAction ) =>
{
    const { payload, type } = action;
    // console.log( payload, type );
    switch ( type )
    {
        case SET_SNACKBAR:
            return {
                ...state,
                payload
            };
        default:
            return state;
    }
};

export default snackbarReducer;