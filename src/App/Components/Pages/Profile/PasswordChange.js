import React, { useEffect, useContext, useState, useRef } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { UserContext } from "../../../Context/userContext";
import { BrowserRouter as Router, Link, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { changePassword } from "../../Firebase/firebase";
const useStyles = makeStyles((theme) => ({
    cards: {
        maxWidth: '1200px',
        margin: "0 auto"
    },
    clendar: {
        "& .rdrDefinedRangesWrapper": {
            display: 'none'
        }
    },
    paper: {
        height: '100%',
        padding: '16px',
        '.MuiTableRow-root:hover': {
            backgroundColor: 'red'
        }
    },
}));

export default function PasswordChange() {
    const classes = useStyles();

    const [user, setUser] = useContext(UserContext);
    const [oldPassword, setOldPassword] = useState('');
    const [passwordOne, setPasswordOne] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');

    useEffect(() => {
        console.log(user)

    }, [])
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>

                <Typography component="h1" variant="h5">
                    Смяна на паролата
        </Typography>
                <form className={classes.form} noValidate >
                <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Настояща парола"
                        type="password"
                        id="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Нова парола"
                        type="password"
                        id="password"
                        value={passwordOne}
                        onChange={(e) => setPasswordOne(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Повтори нова парола"
                        type="password"
                        id="password2"
                        value={passwordTwo}
                        onChange={(e) => setPasswordTwo(e.target.value)}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={passwordOne.length < 8 || passwordTwo.length < 8 || passwordOne !== passwordTwo}
                        className={classes.submit}
                        onClick={event => {
                            changePassword(oldPassword, passwordOne);
                        }}

                    >
                        Смени парола
          </Button>
                    {/* <Typography component="p" variant="body1" align="center"  >
                        or
                    </Typography>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.google}
                        onClick={() => {
                            try {
                                signInWithGoogle();
                            } catch (error) {
                                console.error("Error signing in with Google", error);
                            }
                        }}

                    >
                        Sign In with Google
                        </Button> */}
                    {/* {error && <p>{error.message}</p>} */}

                </form>
            </div>
        </Container>
    );
}