import React, {useState, useEffect} from 'react';
import axios from 'axios';
import style from "../../styles/productDetailsStyle"

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


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
  
function ProductDetails(props) {
    const [value, setValue] = useState("")
    const [isSnakebarOpen, setIsSnakebarOpen] = useState(false)
    const [flashMessage, setFlashMEssage] = useState("");
    const [snakeBarType, setSnakeBarType] = useState("success");
    const [totalPrice, setTotalPrice] = useState("Add to cart");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const classes = style()

    useEffect(() => {
        const loggedInUser = localStorage.getItem("userId");
        if(loggedInUser){
            setIsLoggedIn(true);
        }
        else {
            setTotalPrice("Log in first!")
        }
    })

    const {PRODUCT_ID, 
        ADMIN_ID, 
        PRODUCT_NAME_EN, 
        PRODUCT_NAME_BN, 
        PRODUCT_IN_STOCK_QUANTITY, 
        PRODUCT_MEASUREMENT_UNIT, 
        PRODUCT_AGRO_PRICE, 
        PRODUCT_DISCOUNT, 
        PRODUCT_IMG
    } = props.data.data[0];

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
            const formdata = new FormData();
            formdata.append("userId", localStorage.getItem("userId"));
            formdata.append("productId", PRODUCT_ID);
            formdata.append("quantity", value);
    
            axios.post('/api/products/cart', formdata).then(res => {
                if(res.status === 201){
                    setIsSnakebarOpen(true);
                    setSnakeBarType("success")
                    setFlashMEssage("Product Added to cart");
                }
            }).catch(err => {
                setFlashMEssage("Server Error! please try again later");
                console.log(err.message);
            });
        }
        else {
            setIsSnakebarOpen(true);
            setSnakeBarType("error")
            setFlashMEssage("Enter a valid amount");
        }
    }

    let isAvailable = true;
    let offerText= (
        <Typography gutterBottom variant="subtitle1" component="div">
            No offer available
        </Typography>
    )

    if(PRODUCT_IN_STOCK_QUANTITY <= 0){
        offerText = (
            <Typography gutterBottom variant="subtitle1" component="div"> 
                Currently not in stock
            </Typography>
        )
        isAvailable = false;
    }

    else if(PRODUCT_DISCOUNT > 0){
        offerText = (
            <Typography gutterBottom variant="subtitle1" component="div">
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
                                <div className = {classes.card}>
                                    <CardHeader
                                        titleTypographyProps={{ variant:'h2' }}
                                        subheaderTypographyProps={{ variant:'h5' }}
                                        title={`${PRODUCT_NAME_EN}`}
                                        subheader={`${PRODUCT_NAME_BN}`}
                                    />

                                    <CardContent>
                                        <Typography gutterBottom variant="subtitle1" component="div">
                                            <ListItemText primary={
                                                `Original Price: ৳ ${PRODUCT_AGRO_PRICE} / ${PRODUCT_MEASUREMENT_UNIT}`
                                            } />
                                            <ListItemText primary={offerText} />                
                                            </Typography>
                                        </CardContent>
                                    <CardActions>

                                    <Grid container 
                                        spacing={2} 
                                        direction="row" 
                                        justifyContent="space-between"
                                    >
                                        <Grid item 
                                            xs={12} 
                                            lg={6}
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
                                            lg={6}
                                        >
                                            <Button 
                                                size="large" 
                                                variant="outlined" 
                                                disabled={!isAvailable || !isLoggedIn}
                                                onClick={submitForm}
                                            >
                                                Add to cart
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </CardActions>
                            </div>
                        </Grid>
                            <Grid item xs={12} lg={6}>
                                <img src={`/img/${PRODUCT_IMG}`} className={classes.image}/>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </Paper>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    const response = await fetch(`http://localhost:3000/api/products/${context.params.id}`)
    let data = await response.json();
    return {props: {data}}
}

export default ProductDetails;
