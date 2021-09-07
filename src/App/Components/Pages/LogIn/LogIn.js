import React, { useState } from 'react';

import { Link, withRouter } from 'react-router-dom';
import { Grid, Container, Typography, CssBaseline, TextField, Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import { auth } from "../../Firebase/firebase";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const LogIn = ({ history }) => {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('')

    const signInWithEmailAndPasswordHandler = (event, email, password, rememberMe) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then(data => {
            history.push('/profile')
        }).catch(error => {
            if (error.code == 'auth/invalid-email') {
                setError('Невалиден имейл');
            } else if (error.code == 'auth/user-not-found') {
                setError('Няма регистриран потребител с този имейл');
            } else if (error.code == 'auth/wrong-password') {
                setError('Грешна парола');
            }
            console.error("Error signing in with password and email", error.code);
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />

            <div className={classes.paper}>
                <Typography component="h1" variant="h5"> Вход </Typography>

                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Имейл"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Парола"
                        type="password"
                        id="password"
                        value={password}
                        autoComplete="current-password"
                        onChange={(event) => setPassword(event.target.value)}
                    />

                    <p style={{ 'color': 'red', 'margin': '0' }}>{error}</p>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={email === '' || password.length < 5}
                        className={classes.submit}
                        onClick={(event) => { signInWithEmailAndPasswordHandler(event, email, password, rememberMe) }}
                    >
                        Влез
                    </Button>

                    <Grid container>
                        <Grid item xs>
                            <Link to={'/forgottenPassword'} variant="body2"> Забравена парола? </Link>
                        </Grid>

                        <Grid item>
                            <Link to={'/signup'} variant="body2"> {"Нямаш акаунт? Регистрирай се!"} </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container >
    );
}

export default withRouter(LogIn)