import { useContext, useEffect } from "react";
import Preloader from "../components/Preloader";
import { snackbarContext } from "../context/snackbar/snackbarContext";
import { withApollo } from "../src/apollo";
import { useGetChannelsQueryQuery } from "../src/generated/graphql";

const dashboard = () =>
{
    const { data, error, loading } = useGetChannelsQueryQuery();
    const { setSnackbar } = useContext( snackbarContext );

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
            dashing dash
        </div>
    );
};

export default withApollo( { ssr: true } )( dashboard );
