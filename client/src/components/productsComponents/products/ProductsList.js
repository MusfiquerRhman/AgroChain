import React from 'react'
import Product from './product'
import { useSelector } from 'react-redux';
// MaterialUI Elements
import Grid from '@mui/material/Grid';

export default function ProductsList() {
    const products = useSelector((state) => state.products)

    return (
        <div>
            <h1>All available products</h1>
            <Grid container spacing={3}>
                {products.map(product => (
                    <Grid 
                        item 
                        xs={12} 
                        sm={6} 
                        md={4} 
                        xl={3} 
                        key={product.PRODUCT_ID}
                    >
                        <Product {...product} key={product.PRODUCT_ID}/>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}
