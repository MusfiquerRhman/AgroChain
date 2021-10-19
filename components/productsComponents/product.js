import React, {useState, useEffect} from 'react';
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
import style from "../../styles/productStyle"


export default function Product(props) {
    const [value, setValue] = useState("")
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const {PRODUCT_ID, ADMIN_ID, PRODUCT_NAME_EN, PRODUCT_NAME_BN, PRODUCT_IN_STOCK_QUANTITY, PRODUCT_MEASUREMENT_UNIT, PRODUCT_AGRO_PRICE, PRODUCT_DISCOUNT, PRODUCT_IMG} = props;
    const photo = `/img/${PRODUCT_IMG}`;

    const classes = style();

    let offerText= "No offer available"
    if(PRODUCT_DISCOUNT > 0){
        offerText = `Discount: ৳ ${PRODUCT_AGRO_PRICE * PRODUCT_DISCOUNT /100} /  ${PRODUCT_MEASUREMENT_UNIT} (${PRODUCT_DISCOUNT}%)`
    }

  return (
    <Paper elevation={6} className = {classes.card}>
        <CardHeader
            title={PRODUCT_NAME_EN}
            subheader={`${PRODUCT_NAME_BN} - ৳ ${PRODUCT_AGRO_PRICE} / ${PRODUCT_MEASUREMENT_UNIT}`}
        />

        <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image={photo}
        />

         <CardContent>
            <Typography gutterBottom variant="subtitle1" component="div">
                <ListItemText primary={offerText} />
            </Typography>
        </CardContent>

        <CardActions>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <Input
                    id="outlined-adornment-weight"
                    value={value}
                    onChange={(e) => {handleChange(e)}}
                    endAdornment={<InputAdornment position="end">{PRODUCT_MEASUREMENT_UNIT}</InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                        "aria-label": "Enter the amount"
                    }}
                />
                <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText>
            </FormControl>
            <Button size="small" variant="outlined">Add to cart</Button>
        </CardActions>
    </Paper>
  );
}


// export default function Product(props) {
//     const {PRODUCT_ID, ADMIN_ID, PRODUCT_NAME_EN, PRODUCT_NAME_BN, PRODUCT_IN_STOCK_QUANTITY, PRODUCT_MEASUREMENT_UNIT, PRODUCT_AGRO_PRICE, PRODUCT_DISCOUNT, PRODUCT_IMG} = props;
//     const photo = `/img/${PRODUCT_IMG}`;
//     return (
//         <div>
//             <img src={photo}/>
//             <h1>{PRODUCT_NAME_EN}</h1>
//             <h2>{PRODUCT_NAME_BN}</h2>
//             <p>{PRODUCT_IN_STOCK_QUANTITY}</p>
//             <p>{PRODUCT_MEASUREMENT_UNIT}</p>
//             <p>{PRODUCT_AGRO_PRICE}</p>
//             <p>{PRODUCT_DISCOUNT}</p>
//         </div>
//     )
// }
