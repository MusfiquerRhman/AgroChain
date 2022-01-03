import React, {useState, useEffect} from 'react';
import Router from 'next/router'
import axios from 'axios';
import style from "../../styles/productStyle"
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ListItemText from "@mui/material/ListItemText";
import Input from '@mui/material/Input';
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import CardHeader from '@mui/material/CardHeader';
import CardActionArea from '@mui/material/CardActionArea';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Product(props) {
    const [value, setValue] = useState("")
    const [totalPrice, setTotalPrice] = useState("Enter Amount")
    const [snakeBarOpen, setSnakebarOpen] = useState(false)
    const [flashMessage, setFlashMEssage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [snakeBarType, setSnakeBarType] = useState("success");

    useEffect(() => {
        const loggedInUser = localStorage.getItem("userId");
        if(loggedInUser){
            setIsLoggedIn(true);
        }
    })

    const handleChange = (event) => {
        setValue(event.target.value);
        if(event.target.value !== ""){
            setTotalPrice(`Price: ${(PRODUCT_AGRO_PRICE - PRODUCT_AGRO_PRICE * PRODUCT_DISCOUNT /100) * event.target.value}`);
        } else {
            setSnakeBarType("error")
            setTotalPrice("Add to cart")
        }
    };

    const {PRODUCT_ID, 
        ADMIN_ID, 
        PRODUCT_NAME_EN, 
        PRODUCT_NAME_BN, 
        PRODUCT_IN_STOCK_QUANTITY, 
        PRODUCT_MEASUREMENT_UNIT, 
        PRODUCT_AGRO_PRICE, 
        PRODUCT_DISCOUNT, 
        PRODUCT_IMG
    } = props;

    const photo = `/img/${PRODUCT_IMG}`;
    const classes = style();

    const submitForm = async (e) => {
        if(value > 0){
            const formdata = new FormData();
            formdata.append("userId", localStorage.getItem("userId"));
            formdata.append("productId", PRODUCT_ID);
            formdata.append("quantity", value);

            setSnakebarOpen(false);
            axios.post('/api/products/cart', formdata, {
                headers: {
                    "x-access-token": localStorage.getItem('token')
                }
            }).then(res => {
                if(res.status === 201){
                    setSnakebarOpen(true);
                    setFlashMEssage(`${PRODUCT_NAME_EN} (${PRODUCT_NAME_BN}) Added to cart`);
                    setValue("")
                }
            }).catch(err => {
                setSnakeBarType("error")
                setFlashMEssage("Server Error! please try again later");
                console.log(err.message);
            });
        }
        else {
            setSnakebarOpen(true);
            setSnakeBarType("error");
            setFlashMEssage("Enter a valid amount");
        }
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnakebarOpen(false);
    };

    let isAvailable = true;
    let offerText = "😅 No offer available"

    if(PRODUCT_IN_STOCK_QUANTITY <= 0){
        offerText = "😥 Currently not in stock"
        isAvailable = false;
    }
    else if(PRODUCT_DISCOUNT > 0){
        let price = PRODUCT_AGRO_PRICE * PRODUCT_DISCOUNT / 100;
        offerText = `💕 Discount: ৳ ${price} /  ${PRODUCT_MEASUREMENT_UNIT} (${PRODUCT_DISCOUNT}%)`
    }

    return (
        <div>
            <Snackbar 
                open={snakeBarOpen} 
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
            <Paper elevation={6}>
                <CardActionArea onClick={() => Router.push(`/products/${PRODUCT_ID}`)}>
                    <CardHeader
                        title={`🥗 ${PRODUCT_NAME_EN}`}
                        subheader={`${PRODUCT_NAME_BN} - ৳ ${PRODUCT_AGRO_PRICE} / ${PRODUCT_MEASUREMENT_UNIT}`}
                    />
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="120"
                        image={photo}
                    />
                    <CardContent  className={classes.offer}>
                        <Typography 
                            gutterBottom 
                            variant="subtitle1" 
                            component="div"
                        >
                            <ListItemText primary={offerText}/>
                        </Typography>
                    </CardContent>
                </CardActionArea>

                {isLoggedIn && (
                    <CardActions>
                        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined" focused>
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
                                {totalPrice}
                            </FormHelperText>
                        </FormControl>
                        <Button 
                            size="small" 
                            variant="contained"
                            disabled={!isAvailable || !isLoggedIn}
                            onClick={submitForm}
                        >
                            Add to cart
                        </Button>
                    </CardActions>
                )}

            </Paper>
        </div>
   );
}
