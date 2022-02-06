import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
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
import Snackbar from '@mui/material/Snackbar';

import style from "../../styles/productStyle"
import * as userApi from "../../api/users"
import { Alert } from '../helper';


export default function Product(props) {
    const navigate = useNavigate();
    const users = useSelector((state) => state.users);
    const [value, setValue] = useState("");
    const [totalPrice, setTotalPrice] = useState("Enter Amount");
    const [snakeBarOpen, setSnakebarOpen] = useState(false)
    const [flashMessage, setFlashMEssage] = useState("");
    const [snakeBarType, setSnakeBarType] = useState("success");

    // useEffect(() => {
    //     async function fetchData(){ 
    //         const res = await userApi.isLoggedIn();
    //         if(res.data.code === 200 || res.data.code === 970904){
    //             setIsLoggedIn(true);
    //         }
    //     }
    //     fetchData()
    // }, [users.userId])

    const handleChange = (event) => {
        setValue(event.target.value);
        if (event.target.value !== "") {
            setTotalPrice(`Price: ${(PRODUCT_AGRO_PRICE - PRODUCT_AGRO_PRICE * PRODUCT_DISCOUNT / 100) * event.target.value}`);
        } else {
            setSnakeBarType("error")
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
            setSnakebarOpen(false);
            const res = await userApi.addToCart(PRODUCT_ID, value);

            if (res.status === 201) {
                setSnakebarOpen(true);
                setSnakeBarType("success")
                setFlashMEssage(`${PRODUCT_NAME_EN} (${PRODUCT_NAME_BN}) Added to cart`);
                setValue("")
            }
            else {
                setSnakebarOpen(true);
                setSnakeBarType("error")
                setFlashMEssage("Server Error! please try again later");
            }
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
