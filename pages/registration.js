import React, {useState, useEffect} from 'react';
import useInputState from '../hooks/useInputState';
import axios from 'axios';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Index from "../pages/index"

import BorderLinearProgress from '../styles/BorderLinearProgress';
import style from "../styles/addProductStyle"

function AddProducts() {
    const [name, handleChangeName, setName] = useInputState("");
    const [businessName, handleChangeBusinessName, setBusinessName] = useInputState("");
    const [password, handleChangePassword, setPassword] = useInputState("");
    const [confrimPassword, handleChangeConfrimPassword, setConfrimPassword] = useInputState("");
    const [address, handleChangeAddress, setAddress] = useInputState("");
    const [phoneNo, handleChangePhoneNo, setPhoneNo] = useInputState("");
    const [email, handleChangeEmail, setEmail] = useInputState("");

    const [flashMessage, setFlashMEssage] = useState("");

    const classes = style()

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
                    setFlashMEssage("Account Successfully created");
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
            setFlashMEssage("Password not matched")
        }        
    }

    return (
        <div>
            <Paper elevation={6} > 
                <form className={classes.form}>
                    <Typography variant="h3">
                        Enter your details:
                    </Typography>
                    <Typography variant="h6">
                        {flashMessage}
                    </Typography>
                    <Box sx={{ width: '100%' }}>
                        <Grid container item direction="column" spacing={2} xs={12}>
                            <Grid item>
                                <TextField id="registration-name" 
                                    label="Manager Name" 
                                    variant="standard" 
                                    value={name} 
                                    onChange={handleChangeName}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <TextField id="registration-company" 
                                    label="Company Name" 
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

export default AddProducts;