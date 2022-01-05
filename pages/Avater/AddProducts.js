import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
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
    const [price, handleChangePrice, setPrice] = useInputState("");
    const [discount, handleChangeDicount, setDiscout] = useInputState(0);
    const [isAdmin, setIsAdmin] = useState(false);

    const [image, setImage] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    const [displayImage, setDisplayImage] = useState("");

    const [snakeBarOpen, setSnakeBarOpen] = useState(false);
    const [snakeBarType, setSnakeBarType] = useState("success");
    const [snakeMessage, setSnakeMessage] = useState("");

    const handleCloseSnakeBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnakeBarOpen(false);
    };

    useEffect(() => {
        const type = localStorage.getItem("userType");
        if(type === "AVATER"){
            setIsAdmin(true);
        }
    }, [isAdmin])


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
        reader.readAsDataURL(files[0])
    }

    const resetFields = () => {
        setNameEn("");
        setNameBN("");
        setInStockQuantity("");
        setMeasurementUnit("");
        setPrice("");
        setDiscout(0);
        setImage("");      
    }

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

        const progress = {
            onUploadProgress: (ProgressEvent) => {
                const {loaded, total} = ProgressEvent;
                let percent = Math.floor((loaded * 100) / total);
                if(percent < 100){
                    setUploadProgress(percent);
                }
            }
        }
    
        axios.post('/api/products', formdata , {
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

    let imageSelectedMsg = <Typography variant="h4" className = {classes.imagetext}>Select an Image</Typography>
    if(displayImage !== ""){
        imageSelectedMsg = <img src= {displayImage} className={classes.image}/>
    }

    return (
        <div>
            <Snackbar open={snakeBarOpen} autoHideDuration={6000} onClose={handleCloseSnakeBar}>
                <Alert onClose={handleCloseSnakeBar} severity={snakeBarType} sx={{ width: '100%' }}>
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
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" component="label" fullWidth>
                                            Select a product image
                                            <input name="image" 
                                                type="file" 
                                                onChange={(e) => {imageSelectHandeler(e.target.files)}}
                                                hidden
                                                required
                                            />
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button fullWidth 
                                            onClick={submitForm} 
                                            variant="outlined" 
                                        >
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    {imageSelectedMsg}
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


// const submitForm = async () => {
//     const response = await fetch('/api/products', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             nameEN: nameEN,
//             nameBN: nameBN,
//             inStockQuantity: inStockQuantity,
//             measurementUnit: measurementUnit,
//             price: price,
//             discount: discount,
//             image: image
//         })
//     })
//     const data = await response.data;
//     console.log(data);
// }
