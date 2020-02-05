import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AttachMoney from '@material-ui/icons/AttachMoney';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Footer from '../components/Footer';
import api from '../services/api';
import { login, isAuthenticated } from '../services/auth';
import { Redirect } from 'react-router-dom';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';


const SingInButton = withStyles(theme => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
}))(Button);

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'green',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'green',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'grey',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'green',
            },
        },
    },
})(TextField);

export default function Login() {
    const classes = useStyles();
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const [open, setOpen] = useState();


    const _singIn = async (e) => {
        e.preventDefault();
        setOpen(true);
        // let response = await api.post('/userLogin.php',{email: email,password: pass});
        await api.post('/userLogin.php', { email: email, password: pass })
            .then((response) => {
                console.log(response);
                login(response.data);
                window.location.href='./';
            });
    }

    return (
        isAuthenticated() ? <Redirect to="/" /> :
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <AttachMoney />
                        {/* <Typography component="h1" variant="h5">
                    SESMER
                </Typography> */}
                        {/* <LockOutlinedIcon /> */}
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        SESMER v2.0
                    </Typography>
                    <form className={classes.form} onSubmit={(e) => _singIn(e)}>
                        <CssTextField
                            variant="outlined"
                            required
                            fullWidth
                            margin="normal"
                            id="email"
                            label="E-mail"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                        <CssTextField
                            variant="outlined"
                            required
                            fullWidth
                            margin="normal"
                            name="password"
                            label="Senha"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => setPass(e.target.value)}
                        />
                        {/* <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => setPass(e.target.value)}
                        /> */}
                        {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}
                        <SingInButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="success"
                            className={classes.submit}
                        >
                            Entrar
                        </SingInButton>
                    </form>
                </div>
                <Box mt={8}>
                    <Footer />
                </Box>
                <Backdrop className={classes.backdrop} open={open}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Container>
    );
}

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(4),
        backgroundColor: theme.palette.success.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
