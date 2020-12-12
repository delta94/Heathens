import { Fragment } from 'react';
import { createStyles, makeStyles, Theme, Grid, AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NextLink from 'next/link';

const useStyles = makeStyles( ( theme: Theme ) =>
    createStyles( {
        root: {
            flexGrow: 1,
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
    const classes = useStyles();

    return (
        <Fragment>
            <AppBar position="static" color='transparent'>
                <Toolbar className={ classes.tootlbar }>
                    <Grid className={ classes.menu }>
                        <IconButton edge="start" className={ classes.menuButton } color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6">
                            Heathens
                    </Typography>
                    </Grid>
                    <Grid>
                        <NextLink href='/login' passHref>
                            <Button color='inherit'>Login</Button>
                        </NextLink>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Fragment>
    );
};;

export default Navbar;

