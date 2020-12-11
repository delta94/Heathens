import { AppBar, Button, IconButton, Toolbar, Typography, makeStyles, Theme, createStyles, List, ListItem, Grid, Box } from "@material-ui/core";
import { Menu as MenuIcon } from '@material-ui/icons';
import NextLink from 'next/link';

const useStyles = makeStyles( ( _: Theme ) => createStyles( {
    root: {
        flexGrow: 1
    },
    title: {
        flexGrow: 1
    },
    clicheFlex: {
        display: 'flex'
    }
} ) );

const Navbar = () =>
{
    const classes = useStyles();

    return (
        <div className={ classes.root }>
            <AppBar position='static' color='transparent'>
                <Toolbar>
                    <Grid container justify='space-between'>
                        <Grid item>
                            <Grid container>
                                <Grid item xs={ 6 }>
                                    <IconButton edge='start'>
                                        <MenuIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={ 6 }>
                                    <Typography className={ classes.title } variant='h5'>
                                        Amoeba
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <List>
                                <ListItem>
                                    <NextLink href='/login'>
                                        <a>
                                            <Button variant='contained'>
                                                Login
                                    </Button>
                                        </a>
                                    </NextLink>
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;
