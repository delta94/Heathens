import { FC, useEffect, useState } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const severities = [ 'error', 'warning', 'info', 'success' ] as const;
interface IProps
{
    severity: typeof severities[ number ];
    message: string;
    isActive: boolean;
}

const Alert = ( props: any ) =>
{
    return <MuiAlert elevation={ 6 } variant='filled' { ...props } />;
};

const CSnackbar: FC<IProps> = ( { severity, message, isActive } ) =>
{

    const [ isOpen, setIsOpen ] = useState<boolean>( false );

    useEffect( () =>
    {
        setIsOpen( isActive );
    }, [ isActive ] );

    const handleClose = () =>
    {
        setIsOpen( false );
    };

    return (
        <div>
            <Snackbar open={ isOpen } autoHideDuration={ 6000 } onClose={ handleClose }>
                <Alert onClose={ handleClose } severity={ severity }>
                    { message }
                </Alert>
            </Snackbar>
        </div>
    );
};

export default CSnackbar;
