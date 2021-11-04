import React, {useState} from 'react';
import Router from 'next/router'

//Material UI Components
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

import style from "../../styles/productStyle"

export default function Product(props) {
    const [value, setValue] = useState("")
    const [totalPrice, setTotalPrice] = useState("Add to cart")
    const handleChange = (event) => {
        setValue(event.target.value);
        if(event.target.value !== ""){
            setTotalPrice(`Price: ${(PRODUCT_AGRO_PRICE - PRODUCT_AGRO_PRICE * PRODUCT_DISCOUNT /100) * event.target.value}`);
        } else {
            setTotalPrice("Add to cart")
        }
    };

    const {PRODUCT_ID, 
        ADMIN_ID, 
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

    let isAvailable = true;
    let offerText= (<Typography gutterBottom variant="subtitle1" component="div">
        😅 No offer available
    </Typography>)
    if(PRODUCT_IN_STOCK_QUANTITY <= 0){
        offerText = (<Typography gutterBottom variant="subtitle1" component="div"> 
            😥 Currently not in stock
        </Typography>)
        isAvailable = false;
    }
    else if(PRODUCT_DISCOUNT > 0){
        offerText = (<Typography gutterBottom variant="subtitle1" component="div">
            💕 Discount: ৳ {PRODUCT_AGRO_PRICE * PRODUCT_DISCOUNT /100} /  {PRODUCT_MEASUREMENT_UNIT} ({PRODUCT_DISCOUNT}%)
        </Typography>)
    }

    return (
        <div className = {classes.card}>
            <Paper elevation={6}>
                <CardActionArea onClick={() => Router.push(`/products/${PRODUCT_ID}`)}>
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

                    <CardContent>
                        <Typography gutterBottom variant="subtitle1" component="div">
                            <ListItemText primary={offerText} />
                        </Typography>
                    </CardContent>
                </CardActionArea>

                <CardActions>
                    <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined" focused>
                        <Input
                            id="outlined-adornment-weight"
                            value={value}
                            color= "secondary"
                            onChange={(e) => {handleChange(e)}}
                            disabled={!isAvailable}
                            endAdornment={
                                <InputAdornment position="end">
                                    {PRODUCT_MEASUREMENT_UNIT}
                                </InputAdornment>
                            }
                            aria-describedby="outlined-weight-helper-text"    
                            type="number"                    
                        />
                        <FormHelperText id="outlined-weight-helper-text">
                            <Typography gutterBottom variant="body1" component="span">
                                {totalPrice}
                            </Typography>
                        </FormHelperText>
                    </FormControl>
                    <Button size="small" variant="outlined" disabled={!isAvailable}>Add to cart</Button>
                </CardActions>
            </Paper>
        </div>
   );
}
