import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { BrowserRouter as Router, Link, withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { auth, signInWithGoogle } from "../../Firebase/firebase";



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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function LogIn({ history }) {
  const classes = useStyles();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState('')
  const signInWithEmailAndPasswordHandler = (event, email, password, rememberMe) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .then(data => {
        history.push('/profile')
      })
      .catch(error => {
        if (error.code == 'auth/invalid-email') {
          setError('Невалиден имейл');
        }
        else if (error.code == 'auth/user-not-found') {
          setError('Няма регистриран потребител с този имейл');
        }
        else if (error.code == 'auth/wrong-password') {
          setError('Грешна парола');
        }
        console.error("Error signing in with password and email", error.code);

      });
    // setEmail("")
    // setPassword('')
  };


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>

        <Typography component="h1" variant="h5">
          Вход
        </Typography>
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
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" onClick={(e) => setRememberMe(!rememberMe)} />}
            label="Запомни ме"
          /> */}
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
          <Link style={{ textDecoration: 'none', cursor: 'pointer' }} to={'/forgottenPassword'} >
            Забравена парола?
          </Link>
          {/* <Grid container>
            <Grid item xs>
              <Link to={'/forgottenPassword'} variant="body2">
                Забравена парола?
              </Link>
            </Grid>
            <Grid item>
              <Link to={'/signup'} variant="body2">
                {"Нямаш акаунт? Регистрирай се!"}
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
    </Container >
  );
}

export default withRouter(LogIn)