import { SET_SNACKBAR } from "../contextTypes";
import { SAction, SState } from "../../src/types";

const snackbarReducer = ( state: SState, action: SAction ) =>
{
    const { payload, type } = action;
    switch ( type )
    {
        case SET_SNACKBAR:
            return {
                ...state,
                isActive: payload.isActive,
                message: payload.message,
                severity: { ...state.severity, ...payload.severity }
            };
        default:
            return state;
    }
};

export default snackbarReducer;