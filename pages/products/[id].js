import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

// Material UI components
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import style from "../../styles/formStyle"

function ProductDetails(props) {
    const classes = style()
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

    return (
        <div>
            <Paper elevation={6} > 
                <div className={classes.form}>
                    <Typography variant="h3">
                        Product details
                    </Typography>

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
                                        value={PRODUCT_NAME_EN} 
                                        required
                                        fullWidth
                                        disabled
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField id="standard-basic" 
                                        label="Name (bn)" 
                                        variant="standard" 
                                        value={PRODUCT_NAME_BN} 
                                        required
                                        fullWidth
                                        disabled
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField id="standard-basic" 
                                        label="In stock" 
                                        variant="standard" 
                                        type="number"
                                        value={PRODUCT_IN_STOCK_QUANTITY}
                                        required
                                        fullWidth
                                        disabled
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField id="standard-basic" 
                                        label="mesurement unit" 
                                        variant="standard" 
                                        value={PRODUCT_MEASUREMENT_UNIT}
                                        required
                                        fullWidth
                                        disabled
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField id="standard-basic" 
                                        label="price" 
                                        variant="standard" 
                                        type="number"
                                        value={PRODUCT_AGRO_PRICE}
                                        required
                                        fullWidth
                                        disabled
                                    />
                                </Grid>
                                <Grid item>                   
                                    <TextField id="standard-basic" 
                                        label="Discount" 
                                        type="number"
                                        variant="standard" 
                                        value={PRODUCT_DISCOUNT}
                                        required
                                        fullWidth
                                        disabled
                                    />
                                </Grid>
                                <Grid item>
                                    <Button fullWidth 
                                        variant="outlined" 
                                    >
                                        Submit
                                    </Button>
                                </Grid>
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
