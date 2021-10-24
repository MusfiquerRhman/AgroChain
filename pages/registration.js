import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Router from 'next/router'

// Material UI components
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import useInputState from '../hooks/useInputState';
import style from "../styles/addProductStyle"

function Registration() {
    const [name, handleChangeName, setName] = useInputState("");
    const [businessName, handleChangeBusinessName, setBusnessName] = useInputState("");
    const [password, handleChangePassword, setPassword] = useInputState("");
    const [confrimPassword, handleChangeConfrimPassword, setConfrimPassword] = useInputState("");
    const [address, handleChangeAddress, setAddress] = useInputState("");
    const [phoneNo, handleChangePhoneNo, setPhoneNo] = useInputState("");
    const [email, handleChangeEmail, setEmail] = useInputState("");

    const [flashMessage, setFlashMEssage] = useState("");
    const [isRegistrated, setIsRegistrated] = useState(false);

    const classes = style();

    const submitForm = async (e) => {
        e.preventDefault();
        if(password === confrimPassword){
            const formdata = new FormData();
            formdata.append("name", name);
            formdata.append("businessName", businessName);
            formdata.append("password", password);
            formdata.append("address", address);
            formdata.append("phoneNo", phoneNo);
            formdata.append("email", email);

            axios.post('/api/user/registration', formdata).then(res => {
                if(res.status === 201){
                    setIsRegistrated(true);
                }
                else if(res.status === 205){
                    setFlashMEssage("Phone no or Email already exist! Try new one")
                }
            }).catch(err => {
                setFlashMEssage("Server Error! please try again later")
                console.log(err.message);
            });
        }
        else {
            setFlashMEssage("Passwords not matched")
        }        
    }

    useEffect(() => {
        if(isRegistrated){
            Router.push('/login');
        }
    });

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    return (
        <div>
            <Paper elevation={6} > 
                <form className={classes.form}>

                    <Typography variant="h3">
                        Enter your details:
                    </Typography>

                    <Snackbar open={isRegistrated} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Registration Sucessfull!
                        </Alert>
                    </Snackbar>

                    <Typography variant="h6" className={classes.flashMessages}>
                        {flashMessage}
                    </Typography>

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
                                    required
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
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <Button fullWidth onClick={submitForm} variant="contained" >Sign Up</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </Paper>
        </div>
    )
}

export default Registration;