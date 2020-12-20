import { Fragment, useEffect, useContext, SyntheticEvent, useState } from 'react';
import { createStyles, makeStyles, Theme, Grid, AppBar, Toolbar, Button, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import DarkModeIcon from '@material-ui/icons/Brightness4';
import NextLink from 'next/link';
import { useGetMeQueryQuery, useLogoutUserMutationMutation } from '../src/generated/graphql';
import Preloader from './Preloader';
import { snackbarContext } from '../context/snackbar/snackbarContext';
import { useRouter } from 'next/router';
import { UNAUTH_HOMEPAGE } from '../src/constants';
import { useApolloClient } from '@apollo/client';
import CDrawer from './CDrawer';

const useStyles = makeStyles( ( theme: Theme ) =>
    createStyles( {
        root: {
            flexGrow: 1,
            marginLeft: 200
        },
        menuButton: {
            marginRight: theme.spacing( 2 ),
        },
        tootlbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        menu: {
            display: 'flex',
            alignItems: 'center'
        }
    } ),
);

const Navbar = () =>
{
    const router = useRouter();
    const apollo = useApolloClient();
    const classes = useStyles();
    const { data, error, loading } = useGetMeQueryQuery();
    const [ logoutMutation, logoutMutationResponse ] = useLogoutUserMutationMutation();
    const { setSnackbar } = useContext( snackbarContext );

    const [ isDrawerOpen, setIsDrawerOpen ] = useState( false );

    useEffect( () =>
    {
        if ( error )
        {
            console.log( 'error = ', error );
            // setSnackbar( {
            //     isActive: true,
            //     message: error.message,
            //     severity: {
            //         type: 'error',
            //     }
            // } );

            // if ( error.message.toLowerCase().includes( 'not authenticated' ) && router.pathname !== '/register' )
            // {
            //     router.replace( UNAUTH_HOMEPAGE );
            // }
        }
    }, [ error ] );

    const handleLogout = ( _: SyntheticEvent ) =>
    {
        logoutMutation( {
            update: ( cache ) =>
            {
                cache.evict( { fieldName: 'getMe' } );
            }
        } ).then( () =>
        {
            setSnackbar( {
                isActive: true,
                message: 'Logged Out!',
                severity: {
                    type: 'success'
                }
            } );
            // apollo.resetStore();
            router.push( UNAUTH_HOMEPAGE );
        } ).catch( err => console.error( err ) );
    };

    if ( loading || logoutMutationResponse.loading )
    {
        return <Preloader />;
    }

    let smartLinks = null;

    smartLinks = data && data.getMe ? <Fragment>
        <Button color='inherit'>Welcome { data.getMe.name }</Button>
        <Button color='inherit' onClick={ handleLogout }>Logout</Button>
    </Fragment> : <Fragment>
            <NextLink href='/login' passHref>
                <Button color='inherit'>Login</Button>
            </NextLink>
            <NextLink href='/register' passHref>
                <Button color='inherit'>Register</Button>
            </NextLink>
        </Fragment>;

    const toggleDrawer = ( _: SyntheticEvent<{}, Event> ) =>
    {
        setIsDrawerOpen( !isDrawerOpen );
    };

    return (
        <Fragment>
            <AppBar position="static" color='transparent' className={ classes.root }>
                <Toolbar className={ classes.tootlbar }>
                    <div className={ classes.menu }>
                        <IconButton onClick={ toggleDrawer } edge="start" className={ classes.menuButton } color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <NextLink href='/' passHref>
                            <Button size='large'>
                                Heathens
                            </Button>
                        </NextLink>
                    </div>
                    <div>
                        <IconButton>
                            <DarkModeIcon />
                        </IconButton>
                        { smartLinks }
                    </div>
                </Toolbar>
            </AppBar>
        </Fragment>
    );
};;

export default Navbar;

