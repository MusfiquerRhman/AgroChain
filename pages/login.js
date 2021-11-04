import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import Router from 'next/router'
import Link from "next/link"

import useInputState from '../hooks/useInputState';
import style from "../styles/formStyle"

// Material UI components
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function Login() {
    const [password, handleChangePassword] = useInputState("");
    const [email, handleChangeEmail] = useInputState("");
    const [flashMessage, setFlashMEssage] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const classes = style();

    const submitForm = async (e) => {
        const formdata = new FormData();
        formdata.append("email", email);
        formdata.append("password", password);

        axios.post('/api/user/login', formdata).then(res => {
            console.log(res);
            if(res.status === 200){
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userId", res.data.userId);
                localStorage.setItem("userEmail", res.data.userEmail);
                localStorage.setItem("userName", res.data.userName);
                localStorage.setItem("userPhone", res.data.userPhone);
                localStorage.setItem("userType", res.data.userType);
                localStorage.setItem("userJoinDate", res.data.userJoinDate);

                setIsAuthenticated(true);
            }
            else if(res.status === 204){
                setFlashMEssage("No account found with the Email address");
            }
            else if(res.status == 205){
                setFlashMEssage("Incorrect password!");;
            }
        }).catch(err => {
            setFlashMEssage("Server Error! please try again later");
            console.log(err.message);
        });
    }

    useEffect(() => {
        if(isAuthenticated){
            Router.push('/');
        }
    });

    return (
        <div>
            <Paper elevation={6} className={classes.formBox}> 
                <form className={classes.form}>
                    <Typography variant="h3">
                        Login:
                    </Typography>

                    <Typography variant="h6" className={classes.flashMessages}>
                        {flashMessage}
                    </Typography>

                    <Box sx={{ width: '100%' }} >
                        <Grid container item direction="column" spacing={2} xs={12} > 
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
                                <Button fullWidth onClick={submitForm} variant="contained" >Login</Button>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">
                                    Do not have an account?
                                </Typography>
                                <Button fullWidth variant="contained" ><Link href="/registration"><a>new registration</a></Link></Button>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </Paper>
        </div>
    )
}

export default Login;