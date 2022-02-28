import React, {useState, useEffect} from 'react';
import {useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack';

// MaterialUI Elements
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
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
import Skeleton from '@mui/material/Skeleton';

import style from "../../../styles/productDetailsStyle"
import * as userApi from "../../../api/users"
import * as productApi from "../../../api/products"

function ProductDetails() {
    const { enqueueSnackbar } = useSnackbar();
    const classes = style();
    const { id } = useParams()
    const [value, setValue] = useState("")
    const [totalPrice, setTotalPrice] = useState("Add to cart");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [PRODUCT_ID, setProductId] = useState("")
    const [PRODUCT_NAME_EN, setNameEn] = useState("")
    const [PRODUCT_NAME_BN, setNameBn] = useState("")
    const [PRODUCT_IN_STOCK_QUANTITY, setInStockQuantity] = useState("")
    const [PRODUCT_MEASUREMENT_UNIT, setProdcutMesuarementUnit] = useState("")
    const [PRODUCT_AGRO_PRICE, setPrice] = useState("")
    const [PRODUCT_DISCOUNT, setDiscount] = useState("")
    const [PRODUCT_IMG, setImage] = useState("")
    const [PRODUCT_DETAILS, setProductDetails] = useState("")

    useEffect(() => {
        const loggedInUser = localStorage.getItem("userId");
        if(loggedInUser){
            setIsLoggedIn(true);
        }
        else {
            setTotalPrice("Log in first!")
        }

        async function getData(){
            const res = await productApi.productDetails(id);
            if(res.status === 200){
                setProductId(res.data.data[0].PRODUCT_ID)
                setNameEn(res.data.data[0].PRODUCT_NAME_EN)
                setNameBn(res.data.data[0].PRODUCT_NAME_BN)
                setInStockQuantity(res.data.data[0].PRODUCT_IN_STOCK_QUANTITY)
                setProdcutMesuarementUnit(res.data.data[0].PRODUCT_MEASUREMENT_UNIT)
                setPrice(res.data.data[0].PRODUCT_AGRO_PRICE)
                setDiscount(res.data.data[0].PRODUCT_DISCOUNT)
                setImage(res.data.data[0].PRODUCT_IMG)
                setProductDetails(res.data.data[0].PRODUCT_DETAILS)
            }
            else {
                enqueueSnackbar("Server Error! please try again later", {variant: 'error'});
            }
        }
        getData();
    }, [])

    const handleChange = (event) => {
        setValue(event.target.value);
        if(event.target.value !== ""){
            setTotalPrice(`Price: ${
                (PRODUCT_AGRO_PRICE - PRODUCT_AGRO_PRICE * PRODUCT_DISCOUNT /100) * event.target.value
            }`);
        } else {
            setTotalPrice("Add to cart");
        }
    };

    const submitForm = async (e) => {
        if(value > 0) {
            const res = await userApi.addToCart(PRODUCT_ID, value);
            if(res.status === 201){
                setValue("");
                enqueueSnackbar(`${PRODUCT_NAME_EN} (${PRODUCT_NAME_BN}) Added to cart`, {variant: 'success'});
            }
            else {
                enqueueSnackbar(`Server Error! please try again later`, {variant: 'error'});
            }
        }
        else {
            enqueueSnackbar(`Enter a valid amount`, {variant: 'error'});
        }
    }

    let isAvailable = true;
    let offerText= (
        <Typography 
            gutterBottom 
            variant="subtitle1" 
            component="div"
        >
            No offer available
        </Typography>
    )

    if(PRODUCT_IN_STOCK_QUANTITY <= 0){
        offerText = (
            <Typography 
                gutterBottom 
                variant="subtitle1" 
                component="div"
            > 
                Currently not in stock
            </Typography>
        )
        isAvailable = false;
    }

    else if(PRODUCT_DISCOUNT > 0){
        offerText = (
            <Typography 
                gutterBottom 
                variant="subtitle1" 
                component="div"
            >
                Discount: ৳ {PRODUCT_AGRO_PRICE * PRODUCT_DISCOUNT /100} /  {PRODUCT_MEASUREMENT_UNIT} ({PRODUCT_DISCOUNT}%)
            </Typography>
        )
    }

    return (
        <div>
            <Paper elevation={6} > 
                <div className={classes.form}>
                    <Box sx={{ width: '100%' }}>
                        <Grid container 
                            spacing={2} 
                            direction="row" 
                            justifyContent="space-between"
                        >
                            <Grid container item 
                                direction="column" 
                                spacing={2} 
                                xs={12} 
                                lg={6}
                            >
                                {(PRODUCT_NAME_BN === "") ? (
                                    <Box sx={{ width: 300 }}>
                                        <Skeleton animation="wave" width={210} height={118} />
                                        <Skeleton />
                                        <Skeleton />
                                        <Skeleton /> 
                                        <Skeleton width={'100%'} height={118}/>      
                                    </Box>
                                ) : (
                                    <div className = {classes.card}>
                                        <CardHeader
                                            titleTypographyProps={{ variant:'h2' }}
                                            subheaderTypographyProps={{ variant:'h5' }}
                                            title={`${PRODUCT_NAME_EN}`}
                                            subheader={`${PRODUCT_NAME_BN}`}
                                        />

                                        <CardContent >
                                            <Typography 
                                                gutterBottom 
                                                variant="subtitle1" 
                                                component="div"
                                            >
                                                <ListItemText primary={
                                                    `Price: ৳ ${PRODUCT_AGRO_PRICE} / ${PRODUCT_MEASUREMENT_UNIT}`
                                                } />
                                                <ListItemText primary={offerText} />                
                                            </Typography>
                                            <Typography 
                                                gutterBottom 
                                                variant="subtitle1" 
                                                component="div"
                                            >
                                                <b>Description: </b>{`${PRODUCT_DETAILS}`}
                                            </Typography>
                                        </CardContent>

                                    <CardActions>
                                        <Grid container 
                                            spacing={2} 
                                            direction="row" 
                                            justifyContent="flex-start"
                                        >
                                            <Grid item 
                                                xs={12} 
                                                md={6}
                                            >
                                                <FormControl 
                                                    sx={{ m: 1, width: "90%" }} 
                                                    variant="outlined" 
                                                    focused
                                                >
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
                                                        <Typography 
                                                            gutterBottom 
                                                            variant="body1" 
                                                            component="span"
                                                        >
                                                            {totalPrice}
                                                        </Typography>
                                                    </FormHelperText>
                                                </FormControl>
                                            </Grid>
                                            <Grid item 
                                                xs={12} 
                                                md={6}
                                            >
                                                <Button 
                                                    size="large" 
                                                    variant="contained" 
                                                    disabled={!isAvailable || !isLoggedIn}
                                                    onClick={submitForm}
                                                    fullWidth
                                                >
                                                    Add to cart
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </CardActions>
                                </div>
                            )}
                        </Grid>
                            <Grid item xs={12} lg={6}>
                                {(PRODUCT_IMG === "") ? (
                                    <Skeleton 
                                        variant="rectangular" 
                                        width={'100%'} 
                                        height={'40vh'} 
                                    />
                                ) : (
                                    <img src={`/img/${PRODUCT_IMG}`} className={classes.image} alt="Product imag" />
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </Paper>
        </div>
    )
}

export default ProductDetails;


// ProductDetails.getInitialProps = async (context) => {
//     const response = await fetch(`http://localhost:3000/api/products/${context.params.id}`)
//     let data = await response.json();
//     return {props: {data}}
// }

// export const getServerSideProps = async (context) => {
//     const response = await fetch(`http://localhost:3000/api/products/${context.params.id}`)
//     let data = await response.json();
//     return {props: {data}}
// }

//==========================================================================================================================
// UPDATE products_details 
// SET 
//     PRODUCT_DETAILS = "Cheese is a dairy product produced in wide ranges of flavors, textures and forms by coagulation of the milk protein casein. It comprises proteins and fat from milk, usually the milk of cows, buffalo, goats, or sheep."
// WHERE
//     PRODUCT_DETAILS IS NULL

// ALTER TABLE products_details
// ADD `PRODUCT_DETAILS` TEXT,
// ADD `IS_AVAILABLE` BOOL

// ALTER TABLE seasons
// ADD `SEASON_START_DAY` INT,
// ADD `SEASON_START_MONTH` INT,
// ADD `SEASON_END_DAY` INT,
// ADD `SEASON_END_MONTH` INT
// ADD `SEASON_DESCRIPTION` text

// ALTER TABLE products_details ADD addedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
// UPDATE products_details SET addedAt = CURRENT_TIMESTAMP

// CREATE TABLE tags (
// 	TAG_ID varchar(38) PRIMARY KEY DEFAULT UUID(),
//     TAG_NAME varchar(15) NOT NULL,
//     TAG_DESCRIPTION text NOT NULL
// )

// CREATE TABLE tags_map (
// 	TAG_ID varchar(38),
//     PRODUCT_ID varchar(38),
//     PRIMARY KEY (TAG_ID, PRODUCT_ID)
// )

// SELECT * 
// 	FROM products_details AS P
//     JOIN seasons_map as SM
//     	ON P.PRODUCT_ID = SM.PRODUCT_ID
//     JOIN seasons as S
//     	ON SM.SEASON_ID = S.SEASON_ID
//     JOIN tags_map as TM
//     	ON TM.PRODUCT_ID = P.PRODUCT_ID
//     JOIN tags as T
//     	ON T.TAG_ID = TM.TAG_ID
// 	WHERE P.PRODUCT_ID = '04b5fbee-8fd9-11ec-aac3-38d5470f2067'

// SELECT DISTINCT p.PRODUCT_NAME_EN, p.PRODUCT_NAME_BN, SM.SEASON_NAME, SM.SEASON_DESCRIPTION, TM.TAG_NAME, TM.TAG_DESCRIPTION, P.PRODUCT_IN_STOCK_QUANTITY, 				  						P.PRODUCT_MEASUREMENT_UNIT, P.PRODUCT_AGRO_PRICE, P.PRODUCT_AGRO_PRICE, P.PRODUCT_DISCOUNT, P.PRODUCT_IMG, P.PRODUCT_DETAILS
// 	FROM products_details AS P 
//     LEFT OUTER JOIN 
//        	(SELECT DISTINCT seasons_map.SEASON_ID, seasons_map.PRODUCT_ID, seasons.SEASON_NAME, seasons.SEASON_DESCRIPTION FROM seasons_map
//         	JOIN seasons
//          	ON seasons_map.SEASON_ID = seasons.SEASON_ID
//         ) SM 
//             ON SM.PRODUCT_ID = P.PRODUCT_ID
//     LEFT OUTER JOIN
//     	(SELECT DISTINCT tags_map.TAG_ID, tags_map.PRODUCT_ID, tags.TAG_NAME, tags.TAG_DESCRIPTION FROM tags_map
//          	JOIN tags
//          	ON tags_map.TAG_ID = tags_map.TAG_ID
//         ) TM
//         	ON TM.PRODUCT_ID = P.PRODUCT_ID
//     WHERE P.PRODUCT_ID = 'd8496008-8fe6-11ec-aac3-38d5470f2067'