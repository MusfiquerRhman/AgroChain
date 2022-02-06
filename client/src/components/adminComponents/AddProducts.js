import React, {useState, useEffect} from 'react';
import axios from 'axios';
// MaterialUI Elements
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import BorderLinearProgress from '../../styles/BorderLinearProgress';
import style from "../../styles/formStyle"
import useInputState from '../../hooks/useInputState';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
  
function AddProducts() {
    const [nameEN, handleChangeNameEn, setNameEn] = useInputState("");
    const [nameBN, handleChangeNameBn, setNameBN] = useInputState("");
    const [inStockQuantity, handleChangeInStockQuantity, setInStockQuantity] = useInputState("");
    const [measurementUnit, handleChangeMeasurementUnit, setMeasurementUnit] = useInputState("");
    const [details, handleChangeDetails, setdetails] = useInputState("");
    const [price, handleChangePrice, setPrice] = useInputState("");
    const [discount, handleChangeDicount, setDiscout] = useInputState(0);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAvailable, setIsAvailable] = useState(true);

    const [image, setImage] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    const [displayImage, setDisplayImage] = useState("");

    const [snakeBarOpen, setSnakeBarOpen] = useState(false);
    const [snakeBarType, setSnakeBarType] = useState("success");
    const [snakeMessage, setSnakeMessage] = useState("");

    
    const submitForm = async (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("nameEN", nameEN);
        formdata.append("nameBN", nameBN);
        formdata.append("inStockQuantity", inStockQuantity);
        formdata.append("measurementUnit", measurementUnit);
        formdata.append("price", price);
        formdata.append("discount", discount);
        formdata.append("addedBy", localStorage.getItem("userId"))
        formdata.append("image", image);
        formdata.append("details", details);
        formdata.append("isAvailable", isAvailable);

        const progress = {
            onUploadProgress: (ProgressEvent) => {
                const {loaded, total} = ProgressEvent;
                let percent = Math.floor((loaded * 100) / total);
                if(percent < 100){
                    setUploadProgress(percent);
                }
            }
        }
    
        axios.post('http://localhost:5000/api/avater/add', formdata , {
            headers: {
                "x-access-token": localStorage.getItem('token')
            }
        }, progress).then(res => {
            if(res.status === 201){
                setUploadProgress(100);
                resetFields();
                setSnakeBarOpen(true);
                setSnakeMessage("Product added succesfuly")
                setSnakeBarType('success')
            }
        }).catch(err => {
            setUploadProgress(0);
            setSnakeBarOpen(true);
            setSnakeMessage('Failed to add product, please try a agian')
            setSnakeBarType('error')
        });
    }


    const handleCloseSnakeBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnakeBarOpen(false);
    };

    useEffect(() => {
        const type = localStorage.getItem("keyboardCat");
        if(type === "AVATER"){
            setIsAdmin(true);
        }
    }, [isAdmin])

    const handleChangeIsAvailable = (event) => {
        setIsAvailable(event.target.checked);
    }


    const classes = style()

    useEffect(() => {
        setTimeout(() => {
            setUploadProgress(0);
        }, 1000)
    }, [uploadProgress])

    const imageSelectHandeler = files => {
        setImage(files[0]);
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2){
                setDisplayImage(reader.result)
            }
        }
        if (files[0] && files[0].type.match('image.*')) {
            reader.readAsDataURL(files[0]);
        }
    }

    const resetFields = () => {
        setNameEn("");
        setNameBN("");
        setInStockQuantity("");
        setMeasurementUnit("");
        setPrice("");
        setDiscout(0);
        setImage("");      
        setdetails("");
    }

    let imageSelectedMsg = <Typography variant="h4" className = {classes.imagetext}>Select an Image</Typography>
    if(displayImage !== ""){
        imageSelectedMsg = <img src= {displayImage} className={classes.image}/>
    }

    return (
        <div>
            <Snackbar 
                open={snakeBarOpen} 
                autoHideDuration={6000} 
                onClose={handleCloseSnakeBar}
            >
                <Alert 
                    onClose={handleCloseSnakeBar} 
                    severity={snakeBarType} 
                    sx={{ width: '100%' }}
                >
                    {snakeMessage}
                </Alert>
            </Snackbar>

            {isAdmin && 
                (<Paper elevation={6} > 
                    <form className={classes.form}>
                        <Typography variant="h3">
                            Enter product details
                        </Typography>

                        <BorderLinearProgress 
                            value={uploadProgress} 
                            variant="determinate"
                        />
                        <Box sx={{ width: '100%' }}>
                            <Grid container 
                                spacing={2} 
                                direction="row" 
                                justifyContent="space-between"
                            >
                                <Grid container item 
                                    direction="column" 
                                    spacing={2} 
                                    xs={12} lg={6}
                                >
                                    <Grid item>
                                        <TextField id="standard-basic" 
                                            label="Name (English)" 
                                            variant="standard" 
                                            value={nameEN} 
                                            onChange={handleChangeNameEn}
                                            required
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField id="standard-basic" 
                                            label="Name (bn)" 
                                            variant="standard" 
                                            value={nameBN} 
                                            onChange={handleChangeNameBn}
                                            required
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField id="standard-basic" 
                                            label="In stock" 
                                            variant="standard" 
                                            type="number"
                                            value={inStockQuantity}
                                            onChange={handleChangeInStockQuantity}
                                            required
                                            fullWidth
                                            InputProps={{ inputProps: { min: 0 }}}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField id="standard-basic" 
                                            label="mesurement unit" 
                                            variant="standard" 
                                            value={measurementUnit}
                                            onChange={handleChangeMeasurementUnit}
                                            required
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField id="standard-basic" 
                                            label="price" 
                                            variant="standard" 
                                            type="number"
                                            value={price}
                                            onChange={handleChangePrice}
                                            required
                                            fullWidth
                                            InputProps={{ inputProps: { min: 0 }}}
                                        />
                                    </Grid>
                                    <Grid item>                   
                                        <TextField id="standard-basic" 
                                            label="Discount" 
                                            type="number"
                                            variant="standard" 
                                            value={discount}
                                            onChange={handleChangeDicount}
                                            required
                                            fullWidth
                                            InputProps={{ inputProps: { min: 0, max: 100 }}}
                                        />
                                    </Grid>                            
                                        <Grid item>                   
                                            <TextField id="product_details" 
                                                label="Description" 
                                                type="text"
                                                variant="standard" 
                                                value={details}
                                                onChange={handleChangeDetails}
                                                multiline = {true}
                                                rows={4}
                                                fullWidth
                                                required
                                            />
                                        </Grid>
                                        <Grid item>
                                        <FormControlLabel
                                                label="Make available in products page and search results"
                                                control={
                                                    <Checkbox 
                                                        checked={isAvailable} 
                                                        onChange={handleChangeIsAvailable} 
                                                    />
                                                }
                                            />
                                        </Grid>
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    {imageSelectedMsg}
                                    <Grid item>
                                        <Button 
                                            variant="contained" 
                                            component="label" 
                                            fullWidth 
                                            sx={{marginTop: "1rem"}}
                                        >
                                            Select a product image
                                            <input name="image" 
                                                type="file" 
                                                onChange={(e) => {imageSelectHandeler(e.target.files)}}
                                                hidden
                                                required
                                            />
                                        </Button>
                                    </Grid >
                                    <Grid item sx={{marginTop: "1rem"}}>
                                        <Button fullWidth 
                                            onClick={submitForm} 
                                            variant="outlined" 
                                        >
                                            Add product
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </form>
                </Paper>)
            }
            {!isAdmin && 
                <h1 style={{textAlign: "center"}}>404 | This page could not be found.</h1>
            }
        </div>
    )
}

export default AddProducts;
