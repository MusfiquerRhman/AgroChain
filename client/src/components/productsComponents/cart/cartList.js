import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import { useSnackbar } from 'notistack';
// MaterialUI Elements
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

import CartItems from './cartItems'
import * as userApi from "../../../api/users"
import style from "../../../styles/cartStyles"

export default function CartList({products}) {
    const classes = style();
    const { enqueueSnackbar } = useSnackbar();
    const users = useSelector((state) => state.users);

    let disableButton = products.length === 0 ? true : false;
    let buttonText = disableButton ? "List empty" : "Place Order"
    let buttonIcon = disableButton ? (<RemoveShoppingCartIcon />) : (<DoneAllIcon />);

    const setPrice = () => {
        let price = 0;
        for(let i = 0; i < products.length; i++){
            price += (products[i].PRODUCT_AGRO_PRICE - products[i].PRODUCT_AGRO_PRICE * products[i].PRODUCT_DISCOUNT /100) * products[i].CART_QUANTITY
            console.log(products[i].CART_QUANTITY, products[i].PRODUCT_NAME_EN)
        }
        return price;
    }

    const [totalPrice, setTotalPrice] = useState(setPrice());

    useEffect(() => {
        setTotalPrice(setPrice());
    }, [products]);
    

    const updateCart = (changedValue) => {
        setTotalPrice(totalPrice - changedValue);
    }

    const submitOrders = async (e) => {
        e.preventDefault();

        const res = await userApi.submitCart(users.userId);
        if(res.status === 200){
            enqueueSnackbar("Order Successfully submitted", {variant: 'success'})
        }
        else {
            enqueueSnackbar("Order Failed submitted", {variant: 'error'})
        }
    }

    return (
        <div>
            <Paper elevation={0} className={classes.cartHeaderBox}>
                <h1 className={classes.cartHeading}>
                    Items in your cart
                </h1>
                <h3 className={classes.cartPrice}>
                    Total Price: {totalPrice} Taka
                </h3>
            </Paper>
            <Grid container spacing={2} >
                {products.map(product => (
                    <Grid item xs={12} sm={12} md={6} xl={6} key={product.CART_ID}>
                        <CartItems {...product} key={product.CART_ID} updatePrice = {updateCart}/>
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
