import React, {useState, useEffect} from 'react'
import CartItems from './cartItems'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import style from "../../styles/cartStyles"
import DoneAllIcon from '@mui/icons-material/DoneAll';

export default function CartList({products}) {
    let price = 0;
    for(let i = 0; i < products.length; i++){
        price += (products[i].PRODUCT_AGRO_PRICE - products[i].PRODUCT_AGRO_PRICE * products[i].PRODUCT_DISCOUNT /100) * products[i].CART_QUANTITY
    }

    const classes = style();

    return (
        <div>
            <Paper elevation={0} className={classes.cartHeaderBox}>
                <h1 className={classes.cartHeading}>
                    Items in your cart
                </h1>
                <h3 className={classes.cartPrice}>
                    Total Price: {price} Taka
                </h3>
            </Paper>
            <Grid container spacing={2}>
                {products.map(product => (
                    <Grid item xs={12} sm={12} md={6} xl={6}  key={product.PRODUCT_ID}>
                        <CartItems {...product} key={product.PRODUCT_ID}/>
                    </Grid>
                ))}
            </Grid>
            <Button variant="contained" 
                startIcon={<DoneAllIcon />} 
                className={classes.placeButton}>
                    Place Order
            </Button>
        </div>
    )
}
