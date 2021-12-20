import React, {useState} from 'react';

// ** Import Material-Ui Components
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
// ** Import Material-Ui Icons
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
// ** Import Actions
import { API } from "../hooks";
import { History } from "../theme";
import { useDispatch } from "react-redux";
import { session_store } from "../redux/actions/auth/signin";

const Signin = () => {
    // ** Decalre Maintainers 
    const dispatch = useDispatch();
    // ** Declare States
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState("");
    const [visiblePassowrd, setVisiblePassword] = useState(false);

    // ** Declare Actions
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user ={
            email : email,
            password : password
        }
        const result = await API.signin(user);
        if(result.data){
            sessionStorage.setItem("token", result.token);
            sessionStorage.setItem("rememberMe", rememberMe);
            dispatch(session_store(result.data));
            History.push("/dashboard");
        } else {
            alert("We can not find you.")
        }
    }

    // ** Render Components
    return (
        <Container id="app-signin" component="main" maxWidth="xs">
            <div className="paper">
                <Avatar className="avatar">
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className="form" onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        InputProps={{
                            startAdornment : (
                                <InputAdornment position="start">
                                    <IconButton>
                                        <EmailRoundedIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={visiblePassowrd ? "text" : "password"}
                        id="password"
                        autoComplete="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        InputProps={{
                            startAdornment : (
                                <InputAdornment position="start">
                                    <IconButton>
                                        <VpnKeyRoundedIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                            endAdornment : (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setVisiblePassword(!visiblePassowrd)}
                                  >
                                    {!visiblePassowrd ? <Visibility /> : <VisibilityOff />}
                                  </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox 
                                value="remember" 
                                color="primary"
                                onChange={e => setRememberMe(e.target.checked)}
                            />
                        }
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="submit"
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/forgot-password" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Typography variant="body2" color="textSecondary" align="center">
                    {'Copyright © '}
                    <Link color="inherit" href="https://ibluday.com/">
                        Your Website
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Box>
        </Container>
    );
}
export default Signin;