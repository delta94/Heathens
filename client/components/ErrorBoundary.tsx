import { Component, ReactNode, ErrorInfo } from 'react';
import CSnackbar from './CSnackbar';

interface IProps
{
    children: ReactNode;
}

interface IState
{
    hasError: boolean;
    errorInfo: ErrorInfo;
}

class ErrorBoundary extends Component<IProps, IState>
{
    public state: IState = {
        hasError: false,
        errorInfo: null
    };

    public componentDidCatch ( error: Error, errorInfo: ErrorInfo )
    {
        console.error( `Uncaught Error = `, error );
        console.log( `ErrorInfo = `, errorInfo );
        this.setState( { ...this.state, errorInfo } );
    }

    render ()
    {
        if ( this.state.hasError )
        {
            return <CSnackbar isActive={ true } message={ 'Something went wrong' } severity='error' />;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
