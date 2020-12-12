import { FormControl, Input, InputLabel, FormHelperText, makeStyles, createStyles, Theme, IconButton, Grid, Button, Typography, Container } from '@material-ui/core';
import CodeIcon from '@material-ui/icons/Code';
import { SyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import { ILogin } from '../src/interfaces';
import { theme } from '../styles/styles';

const useStyles = makeStyles( ( _: Theme ) => createStyles( {
    root: {
        flexGrow: 1,
        marginTop: theme.spacing( 8 ),
    },
    btns: {
        marginTop: theme.spacing( 2 ),
    },
    title: {
        marginBottom: theme.spacing( 2 )
    },
    marginAuto: {
        margin: 'auto'
    },
    submit: {
        marginTop: theme.spacing( 2 )
    }
} ) );

const CLogin = () =>
{
    const classes = useStyles();

    const { register, handleSubmit, errors } = useForm<ILogin>( {
        defaultValues: {
            username: 'inblack67',
            password: '12345678',
        }
    } );

    const handleLogin = ( data: ILogin ) =>
    {
        console.log( 'formData', data );
    };

    return (
        <Layout>
            <div className={ classes.root }>
                <Container>
                    <Grid container spacing={ 2 } alignItems='center' justify='center' >
                        <Grid item lg={ 6 } xs={ 12 }>
                            <Button size='large' startIcon={ <CodeIcon /> }>Log Back In</Button>
                        </Grid>
                        <Grid item lg={ 6 } xs={ 12 }>
                            <form onSubmit={ handleSubmit( handleLogin ) } autoComplete='off'>
                                <FormControl fullWidth error={ errors.username ? true : false }>
                                    <InputLabel htmlFor="username"> Username</InputLabel>
                                    <Input id="username" name='username' inputRef={ register( {
                                        required: 'Username is required',
                                    } ) } />
                                    <FormHelperText id="username-helper-text">What was your poison?</FormHelperText>
                                </FormControl>
                                <FormControl error={ errors.password ? true : false }
                                    fullWidth>
                                    <InputLabel htmlFor="password"> Password</InputLabel>
                                    <Input name='password' id="password" inputRef={ register( {
                                        required: 'Password is required'
                                    } ) } />
                                    <FormHelperText
                                        id="password-helper-text">What was your dirty little secret?</FormHelperText>
                                </FormControl>
                                <Button type='submit' className={ classes.submit } variant='contained' color='primary'>
                                    Login
                                </Button>
                            </form>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </Layout>
    );
};

export default CLogin;
