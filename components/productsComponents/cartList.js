import React, {useState, useEffect} from 'react'
import CartItems from './cartItems'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import style from "../../styles/cartStyles"
import DoneAllIcon from '@mui/icons-material/DoneAll';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CartList({products}) {
    const [snakeBarOpen, setSnakeBarOpen] = useState(false);
    const [snakeBarType, setSnakeBarType] = useState("success");
    const [snakeMessage, setSnakeMessage] = useState("");

    let disableButton = products.length === 0 ? true : false;
    let buttonText = disableButton ? "List empty" : "Place Order"
    let buttonIcon = disableButton ? (<RemoveShoppingCartIcon />) : (<DoneAllIcon />);

    const handleCloseSnakeBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnakeBarOpen(false);
    };
    
    let price = 0;
    for(let i = 0; i < products.length; i++){
        price += (products[i].PRODUCT_AGRO_PRICE - products[i].PRODUCT_AGRO_PRICE * products[i].PRODUCT_DISCOUNT /100) * products[i].CART_QUANTITY
    }
    const classes = style();

    const submitOrders = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem("userId");
        axios.post(`/api/products/cart/submit/${userId}`, {
            headers: {
                "x-access-token": localStorage.getItem('token')
            }
        }).then(res => {
            if(res.status === 200){
                setSnakeBarOpen(true);
                setSnakeBarType("success");
                setSnakeMessage("Order Successfully submitted")
            }
        }).catch(err => {
            console.log(err.message);
        });
    }

    return (
        <div>
            <Snackbar open={snakeBarOpen} autoHideDuration={6000} onClose={handleCloseSnakeBar}>
                <Alert onClose={handleCloseSnakeBar} severity={snakeBarType} sx={{ width: '100%' }}>
                    {snakeMessage}
                </Alert>
            </Snackbar>

            <Paper elevation={0} className={classes.cartHeaderBox}>
                <h1 className={classes.cartHeading}>
                    Items in your cart
                </h1>
                <h3 className={classes.cartPrice}>
                    Total Price: {price} Taka
                </h3>
            </Paper>
            <Grid container spacing={2} >
                {products.map(product => (
                    <Grid item xs={12} sm={12} md={6} xl={6}  key={product.CART_ID}>
                        <CartItems {...product} key={product.CART_ID}/>
                    </Grid>
                ))}
            </Grid>
            <Button variant="contained" 
                startIcon={buttonIcon} 
                className={classes.placeButton}
                onClick={submitOrders}
                disabled={disableButton}
            >
                    {buttonText}
            </Button>
        </div>
    )
}
