import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useSnackbar } from 'notistack';

// MaterialUI Elements
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

import style from "../../../styles/productStyle"
import * as userApi from "../../../api/users"

export default function Product(props) {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const users = useSelector((state) => state.users);
    const [value, setValue] = useState("");
    const [totalPrice, setTotalPrice] = useState("Enter Amount");

    const handleChange = (event) => {
        setValue(event.target.value);
        if (event.target.value !== "") {
            setTotalPrice(`Price: ${(PRODUCT_AGRO_PRICE - PRODUCT_AGRO_PRICE * PRODUCT_DISCOUNT / 100) * event.target.value}`);
        } else {
            setTotalPrice("Add to cart")
        }
    };

    const { PRODUCT_ID,
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
        if (value > 0) {
            const res = await userApi.addToCart(PRODUCT_ID, value);
            if (res.status === 201) {
                enqueueSnackbar(`${PRODUCT_NAME_EN} (${PRODUCT_NAME_BN}) Added to cart`, {variant: 'success'});
                setValue("")
            }
            else {
                enqueueSnackbar(`Server Error! please try again later`, {variant: 'error'})
            }
        }
        else {
            enqueueSnackbar(`Enter a valid amount`, {variant: 'error'})
        }
    }

    let isAvailable = true;
    let offerText = "😅 No offer available"

    if (PRODUCT_IN_STOCK_QUANTITY <= 0) {
        offerText = "😥 Currently not in stock"
        isAvailable = false;
    }
    else if (PRODUCT_DISCOUNT > 0) {
        let price = PRODUCT_AGRO_PRICE * PRODUCT_DISCOUNT / 100;
        offerText = `💕 Discount: ৳ ${price} /  ${PRODUCT_MEASUREMENT_UNIT} (${PRODUCT_DISCOUNT}%)`
    }

    return (
        <div>
            <Paper elevation={6}>
                <CardActionArea onClick={() => navigate(`/products/${PRODUCT_ID}`)}>
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
                    <CardContent className={classes.offer}>
                        <Typography
                            gutterBottom
                            variant="subtitle1"
                            component="div"
                        >
                            <ListItemText primary={offerText} />
                        </Typography>
                    </CardContent>
                </CardActionArea>

                {users.userId && (
                    <CardActions>
                        <FormControl sx={{ marginRight: 1, marginLeft: 1, width: "25ch" }} variant="outlined" focused>
                            <Input
                                id="outlined-adornment-weight"
                                value={value}
                                color="secondary"
                                onChange={(e) => { handleChange(e) }}
                                disabled={!isAvailable || !users.userId}
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
                            disabled={!isAvailable || !users.userId}
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
