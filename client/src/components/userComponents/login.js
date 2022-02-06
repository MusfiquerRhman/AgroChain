import {useDispatch} from 'react-redux'
import React, {useState} from 'react';
import {Link, useNavigate } from 'react-router-dom'
// MaterialUI Elements
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import useInputState from '../../hooks/useInputState';
import style from "../../styles/formStyle"
import * as userApi from '../../api/users'

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const classes = style();

    const [password, handleChangePassword] = useInputState("");
    const [email, handleChangeEmail] = useInputState("");
    const [flashMessage, setFlashMEssage] = useState("");

    const submitForm = async (e) => {
        const res = await userApi.login(email, password);
        if (res === -1){
            setFlashMEssage("Server error, please try again later");
        }
        else if(res.status === 200){
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.userId);
            localStorage.setItem("userEmail", res.data.userEmail);
            localStorage.setItem("userName", res.data.userName);
            localStorage.setItem("userPhone", res.data.userPhone);
            localStorage.setItem("keyboardCat", res.data.userType);
            localStorage.setItem("userJoinDate", res.data.userJoinDate);

            dispatch({
                type: "USER_DETAILS",
                payload: {
                    userEmail: res.data.userEmail,	
                    userPhone: res.data.userPhone,	
                    userId: res.data.userId,	
                    userName: res.data.userName,	
                    userJoinDate: res.data.userJoinDate,	
                    token:  res.data.token,	
                    userType: res.data.userType
                }
            })

            navigate('/');
        }
        else if(res.status === 204){
            setFlashMEssage("No account found with the Email address");
        }
        else if(res.status === 205){
            setFlashMEssage("Incorrect password!");
        }
    }

    return (
        <div>
            <Paper elevation={6} className={classes.formBox}> 
                <form className={classes.form}>
                    <Typography variant="h3">
                        Login:
                    </Typography>

                    {(flashMessage !== "") &&
                        <Alert severity="error"
                            sx ={{marginTop: "0.5rem", marginBottom: "0.5rem"}}>
                            <AlertTitle>Error</AlertTitle>
                            {flashMessage}
                        </Alert>
                    }

                    <Box sx={{ width: '100%' }} >
                        <Grid 
                            container 
                            item 
                            direction="column" 
                            spacing={2} 
                            xs={12} 
                        > 
                            <Grid item>
                                <TextField id="login-name" 
                                    label="Email" 
                                    variant="standard" 
                                    value={email} 
                                    onChange={handleChangeEmail}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <TextField id="login-company" 
                                    label="Password" 
                                    variant="standard" 
                                    value={password} 
                                    type = "password"
                                    onChange={handleChangePassword}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <Button 
                                    fullWidth 
                                    onClick={submitForm} 
                                    variant="contained" 
                                >
                                    Login
                                </Button>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">
                                    Do not have an account?
                                </Typography>
                                <Button fullWidth variant="contained" >
                                    <Link to="/registration">new registration</Link>
                                </Button>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">
                                    Forgot password?
                                </Typography>
                                <Button fullWidth variant="outlined" >
                                    <Link to="/">Reset Password</Link>
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </Paper>
        </div>
    )
}

export default Login;