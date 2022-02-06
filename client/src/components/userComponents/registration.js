import React, {useState, useEffect} from 'react';
import {Link, useNavigate } from "react-router-dom"
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
import style from "../../styles/formStyle";
import * as userApi from '../../api/users';

function Registration(){
    const navigate = useNavigate();
    const classes = style();

    const [name, handleChangeName] = useInputState("");
    const [businessName, handleChangeBusinessName] = useInputState("");
    const [password, handleChangePassword] = useInputState("");
    const [confrimPassword, handleChangeConfrimPassword] = useInputState("");
    const [address, handleChangeAddress] = useInputState("");
    const [phoneNo, handleChangePhoneNo] = useInputState("");
    const [email, handleChangeEmail] = useInputState("");
    const [flashMessage, setFlashMEssage] = useState("");
    const [isRegistrated, setIsRegistrated] = useState(false);

    const submitForm = async (e) => {
        e.preventDefault();
        if(password === confrimPassword){
            const res = await userApi.register(name, businessName, password, address, phoneNo, email);
            if(res === -1){
                setFlashMEssage("Server Error! please try again later")
            }
            else if(res.status === 201){
                setIsRegistrated(true);
            }
            else if(res.status === 205){
                setFlashMEssage("Phone no or Email already exist!")
            }
        }
        else {
            setFlashMEssage("Passwords not matched")
        }        
    }

    useEffect(() => {
        if(isRegistrated){
            navigate('/login');
        }
    });

    return (
        <div>
            <Paper elevation={6} className={classes.formBox} > 
                <form className={classes.form}>

                    <Typography variant="h3">
                        New Registration:
                    </Typography>

                    {(flashMessage !== "") &&
                        <Alert severity="error"
                            sx ={{marginTop: "0.5rem", marginBottom: "0.5rem"}}>
                            <AlertTitle>Error</AlertTitle>
                            {flashMessage}
                        </Alert>
                    }

                    <Box sx={{ width: '100%' }}>
                        <Grid container item direction="column" spacing={2} xs={12}>
                            <Grid item>
                                <TextField id="registration-name" 
                                    label="Name" 
                                    variant="standard" 
                                    value={name} 
                                    onChange={handleChangeName}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <TextField id="registration-company" 
                                    label="Company/Business Name" 
                                    variant="standard" 
                                    value={businessName} 
                                    onChange={handleChangeBusinessName}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <TextField id="registration-pass" 
                                    label="Password" 
                                    variant="standard" 
                                    type="password"
                                    value={password}
                                    onChange={handleChangePassword}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <TextField id="registration-confrimPass" 
                                    label="Confrim Password" 
                                    variant="standard" 
                                    value={confrimPassword}
                                    onChange={handleChangeConfrimPassword}
                                    type="password"
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <TextField id="registration-phoneNo" 
                                    label="Phone NO" 
                                    variant="standard" 
                                    type="tel"
                                    value={phoneNo}
                                    onChange={handleChangePhoneNo}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>                   
                                <TextField id="registration-email" 
                                    label="Email" 
                                    type="email"
                                    variant="standard" 
                                    value={email}
                                    onChange={handleChangeEmail}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>                   
                                <TextField id="registration-address" 
                                    label="Address" 
                                    type="text"
                                    variant="standard" 
                                    value={address}
                                    onChange={handleChangeAddress}
                                    multiline = {true}
                                    rows={4}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <Button fullWidth onClick={submitForm} variant="contained" >Registration</Button>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">
                                    Already have an account?
                                </Typography>
                                <Button fullWidth variant="contained" ><Link to="/login">Login</Link></Button>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </Paper>
        </div>
    )
}

export default Registration;