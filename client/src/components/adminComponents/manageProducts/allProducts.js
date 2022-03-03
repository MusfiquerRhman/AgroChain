import React, {useEffect, useState} from 'react'
import MediaControlCard from "./cards";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import manageProductsStyle from "../../../styles/manageProductsStyle"

function AllProducts ({allProducts})  {
    const classes = manageProductsStyle();

    return (
        <React.Fragment>
            <Paper elevation={0}>
                <h1 className={classes.activeProductsHeaderText}>
                    All products
                </h1>
                <h3 className={classes.activeProductsSubHeading}>
                    All the products are here, enabled, disabled, stocked, not in stock, over stocked. You name it, you will found it. Disabled products have lavender color heading and left border, Enabled and stocked products are teal, enabled but out of products are red.
                </h3>
            </Paper>
        <Grid container spacing={2} >
            {allProducts.map(product => (
                <Grid item xs={12} sm={12} md={12} xl={6} key={product.PRODUCT_ID}>
                    <MediaControlCard {...product} key={product.PRODUCT_ID} />
                </Grid>
            ))}
        </Grid>
        </React.Fragment>
    )
}

export default AllProducts