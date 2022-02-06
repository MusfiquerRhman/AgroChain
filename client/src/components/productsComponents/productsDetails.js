import React, {useState, useEffect} from 'react';
import {useParams } from 'react-router-dom'
// MaterialUI Elements
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ListItemText from "@mui/material/ListItemText";
import Input from '@mui/material/Input';
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import CardHeader from '@mui/material/CardHeader';
import MuiAlert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';

import style from "../../styles/productDetailsStyle"
import * as userApi from "../../api/users"
import * as productApi from "../../api/products"
import { Alert } from '../helper';


function ProductDetails() {
    const classes = style();
    const { id } = useParams()
    const [value, setValue] = useState("")
    const [isSnakebarOpen, setIsSnakebarOpen] = useState(false)
    const [flashMessage, setFlashMEssage] = useState("");
    const [snakeBarType, setSnakeBarType] = useState("success");
    const [totalPrice, setTotalPrice] = useState("Add to cart");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [PRODUCT_ID, setProductId] = useState("")
    const [PRODUCT_NAME_EN, setNameEn] = useState("")
    const [PRODUCT_NAME_BN, setNameBn] = useState("")
    const [PRODUCT_IN_STOCK_QUANTITY, setInStockQuantity] = useState("")
    const [PRODUCT_MEASUREMENT_UNIT, setProdcutMesuarementUnit] = useState("")
    const [PRODUCT_AGRO_PRICE, setPrice] = useState("")
    const [PRODUCT_DISCOUNT, setDiscount] = useState("")
    const [PRODUCT_IMG, setImage] = useState("")
    const [PRODUCT_DETAILS, setProductDetails] = useState("")

    useEffect(() => {
        const loggedInUser = localStorage.getItem("userId");
        if(loggedInUser){
            setIsLoggedIn(true);
        }
        else {
            setTotalPrice("Log in first!")
        }

        async function getData(){
            const res = await productApi.productDetails(id);
            if(res.status === 200){
                setProductId(res.data.data[0].PRODUCT_ID)
                setNameEn(res.data.data[0].PRODUCT_NAME_EN)
                setNameBn(res.data.data[0].PRODUCT_NAME_BN)
                setInStockQuantity(res.data.data[0].PRODUCT_IN_STOCK_QUANTITY)
                setProdcutMesuarementUnit(res.data.data[0].PRODUCT_MEASUREMENT_UNIT)
                setPrice(res.data.data[0].PRODUCT_AGRO_PRICE)
                setDiscount(res.data.data[0].PRODUCT_DISCOUNT)
                setImage(res.data.data[0].PRODUCT_IMG)
                setProductDetails(res.data.data[0].PRODUCT_DETAILS)
            }
            else {
                setIsSnakebarOpen(true);
                setSnakeBarType("error");
                setFlashMEssage("Server Error! please try again later");
            }
        }
        getData();
    }, [id])

    const handleChange = (event) => {
        setValue(event.target.value);
        if(event.target.value !== ""){
            setTotalPrice(`Price: ${
                (PRODUCT_AGRO_PRICE - PRODUCT_AGRO_PRICE * PRODUCT_DISCOUNT /100) * event.target.value
            }`);
        } else {
            setTotalPrice("Add to cart");
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsSnakebarOpen(false);
    };

    const submitForm = async (e) => {
        if(value > 0) {
            const res = await userApi.addToCart(PRODUCT_ID, value);
            if(res.status === 201){
                setIsSnakebarOpen(true);
                setFlashMEssage(`${PRODUCT_NAME_EN} (${PRODUCT_NAME_BN}) Added to cart`);
                setValue("");
                setSnakeBarType("success");
            }
            else {
                setIsSnakebarOpen(true);
                setSnakeBarType("error");
                setFlashMEssage("Server Error! please try again later");
            }
        }
        else {
            setIsSnakebarOpen(true);
            setSnakeBarType("error");
            setFlashMEssage("Enter a valid amount");
        }
    }

    let isAvailable = true;
    let offerText= (
        <Typography 
            gutterBottom 
            variant="subtitle1" 
            component="div"
        >
            No offer available
        </Typography>
    )

    if(PRODUCT_IN_STOCK_QUANTITY <= 0){
        offerText = (
            <Typography 
                gutterBottom 
                variant="subtitle1" 
                component="div"
            > 
                Currently not in stock
            </Typography>
        )
        isAvailable = false;
    }

    else if(PRODUCT_DISCOUNT > 0){
        offerText = (
            <Typography 
                gutterBottom 
                variant="subtitle1" 
                component="div"
            >
                Discount: ৳ {PRODUCT_AGRO_PRICE * PRODUCT_DISCOUNT /100} /  {PRODUCT_MEASUREMENT_UNIT} ({PRODUCT_DISCOUNT}%)
            </Typography>
        )
    }

    return (
        <div>
            <Snackbar 
                open={isSnakebarOpen} 
                autoHideDuration={6000} 
                onClose={handleCloseSnackbar}
            >
                <Alert 
                    onClose={handleCloseSnackbar} 
                    severity={snakeBarType} 
                    sx={{ width: '100%' }}
                >
                    {flashMessage}
                </Alert>
            </Snackbar>

            <Paper elevation={6} > 
                <div className={classes.form}>
                    <Box sx={{ width: '100%' }}>
                        <Grid container 
                            spacing={2} 
                            direction="row" 
                            justifyContent="space-between"
                        >
                            <Grid container item 
                                direction="column" 
                                spacing={2} 
                                xs={12} 
                                lg={6}
                            >
                                {(PRODUCT_NAME_BN === "") ? (
                                    <Box sx={{ width: 300 }}>
                                        <Skeleton animation="wave" width={210} height={118} />
                                        <Skeleton />
                                        <Skeleton />
                                        <Skeleton /> 
                                        <Skeleton width={'100%'} height={118}/>      
                                    </Box>
                                ) : (
                                    <div className = {classes.card}>
                                        <CardHeader
                                            titleTypographyProps={{ variant:'h2' }}
                                            subheaderTypographyProps={{ variant:'h5' }}
                                            title={`${PRODUCT_NAME_EN}`}
                                            subheader={`${PRODUCT_NAME_BN}`}
                                        />

                                        <CardContent >
                                            <Typography 
                                                gutterBottom 
                                                variant="subtitle1" 
                                                component="div"
                                            >
                                                <ListItemText primary={
                                                    `Price: ৳ ${PRODUCT_AGRO_PRICE} / ${PRODUCT_MEASUREMENT_UNIT}`
                                                } />
                                                <ListItemText primary={offerText} />                
                                            </Typography>
                                            <Typography 
                                                gutterBottom 
                                                variant="subtitle1" 
                                                component="div"
                                            >
                                                <b>Description: </b>{`${PRODUCT_DETAILS}`}
                                            </Typography>
                                        </CardContent>

                                    <CardActions>
                                        <Grid container 
                                            spacing={2} 
                                            direction="row" 
                                            justifyContent="flex-start"
                                        >
                                            <Grid item 
                                                xs={12} 
                                                md={6}
                                            >
                                                <FormControl 
                                                    sx={{ m: 1, width: "90%" }} 
                                                    variant="outlined" 
                                                    focused
                                                >
                                                    <Input
                                                        id="outlined-adornment-weight"
                                                        value={value}
                                                        color= "secondary"
                                                        onChange={(e) => {handleChange(e)}}
                                                        disabled={!isAvailable || !isLoggedIn}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                {PRODUCT_MEASUREMENT_UNIT}
                                                            </InputAdornment>
                                                        }
                                                        aria-describedby="outlined-weight-helper-text"    
                                                        type="number"                    
                                                    />
                                                    <FormHelperText id="outlined-weight-helper-text">
                                                        <Typography 
                                                            gutterBottom 
                                                            variant="body1" 
                                                            component="span"
                                                        >
                                                            {totalPrice}
                                                        </Typography>
                                                    </FormHelperText>
                                                </FormControl>
                                            </Grid>
                                            <Grid item 
                                                xs={12} 
                                                md={6}
                                            >
                                                <Button 
                                                    size="large" 
                                                    variant="contained" 
                                                    disabled={!isAvailable || !isLoggedIn}
                                                    onClick={submitForm}
                                                    fullWidth
                                                >
                                                    Add to cart
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </CardActions>
                                </div>
                            )}
                        </Grid>
                            <Grid item xs={12} lg={6}>
                                {(PRODUCT_IMG === "") ? (
                                    <Skeleton 
                                        variant="rectangular" 
                                        width={'100%'} 
                                        height={'40vh'} 
                                    />
                                ) : (
                                    <img src={`/img/${PRODUCT_IMG}`} className={classes.image} alt="Product imag" />
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </Paper>
        </div>
    )
}

export default ProductDetails;


// ProductDetails.getInitialProps = async (context) => {
//     const response = await fetch(`http://localhost:3000/api/products/${context.params.id}`)
//     let data = await response.json();
//     return {props: {data}}
// }

// export const getServerSideProps = async (context) => {
//     const response = await fetch(`http://localhost:3000/api/products/${context.params.id}`)
//     let data = await response.json();
//     return {props: {data}}
// }

//==========================================================================================================================
// UPDATE products_details 
// SET 
//     PRODUCT_DETAILS = "Cheese is a dairy product produced in wide ranges of flavors, textures and forms by coagulation of the milk protein casein. It comprises proteins and fat from milk, usually the milk of cows, buffalo, goats, or sheep."
// WHERE
//     PRODUCT_DETAILS IS NULL

// ALTER TABLE products_details
// ADD `PRODUCT_DETAILS` TEXT,
// ADD `IS_AVAILABLE` BOOL

// ALTER TABLE seasons
// ADD `SEASON_START_DAY` INT,
// ADD `SEASON_START_MONTH` INT,
// ADD `SEASON_END_DAY` INT,
// ADD `SEASON_END_MONTH` INT
// ADD `SEASON_DESCRIPTION` text