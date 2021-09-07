import React, { useState } from 'react';
import { Button, TextField, CssBaseline, Typography, Container } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { forgotPassword } from "../../Firebase/firebase";

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

const ForgottenPassword = () => {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [error, setError] = useState('')

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />

            <div className={classes.paper}>
                <Typography component="h1" variant="h5"> Забравена парола </Typography>

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

                    <p style={{ 'color': 'red', 'margin': '0' }}>{error}</p>
                    
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={email === ''}
                        className={classes.submit}
                        onClick={forgotPassword(email)}
                    >
                        Изпрати имейл
                    </Button>
                </form>
            </div>
        </Container >
    );
}

export default withRouter(ForgottenPassword)