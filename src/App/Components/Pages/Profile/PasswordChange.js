import React, { useEffect, useContext, useState } from "react";
import { Button, TextField, Typography, Container, CssBaseline } from '@material-ui/core';
import { UserContext } from "../../../Context/userContext";
import { makeStyles } from '@material-ui/core/styles';

import { changePassword } from "../../Firebase/firebase";

const useStyles = makeStyles({
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
});

const PasswordChange = () => {
    const classes = useStyles();

    const [oldPassword, setOldPassword] = useState('');
    const [passwordOne, setPasswordOne] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />

            <div className={classes.paper}>
                <Typography component="h1" variant="h5"> Смяна на паролата </Typography>

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
                </form>
            </div>
        </Container>
    );
}

export default PasswordChange