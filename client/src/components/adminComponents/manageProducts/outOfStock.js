import React from 'react'
import MediaControlCard from "./cards";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import manageProductsStyle from "../../../styles/manageProductsStyle"

const OutOfStock = () => {
    const classes = manageProductsStyle();

    return (
        <React.Fragment>
            <Paper elevation={0}>
                <h1 className={classes.activeProductsHeaderText}>
                    Out of Stock
                </h1>
                <h3 className={classes.activeProductsSubHeading}>
                    These products are out of stock.
                </h3>
            </Paper>
        {/* <Grid container spacing={2} >
            {products.map(product => (
                <Grid item xs={12} sm={12} md={6} xl={6} key={product.CART_ID}>
                    <MediaControlCard {...product} key={product.CART_ID} />
                </Grid>
            ))}
        </Grid> */}
        </React.Fragment>
    )
}

export default OutOfStock