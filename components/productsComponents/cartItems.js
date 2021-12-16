import React, {useState, useEffect} from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import { height } from '@mui/system';

export default function Product(props) {
    const theme = useTheme();
    const {CART_ID, 
        CART_QUANTITY, 
        PRODUCT_NAME_EN, 
        PRODUCT_NAME_BN, 
        PRODUCT_AGRO_PRICE, 
        PRODUCT_DISCOUNT, 
        PRODUCT_MEASUREMENT_UNIT, 
        PRODUCT_IMG
    } = props;

    return (
        <Card sx={{ display: 'flex' }}>
            <CardMedia
                component="img"
                sx={{ width: 150, height: 130 }}
                image={`/img/${PRODUCT_IMG}`}
                alt="Product Image"
            />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                {`${PRODUCT_NAME_EN} (${PRODUCT_NAME_BN})`}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {CART_QUANTITY} {PRODUCT_MEASUREMENT_UNIT} - ৳ {(PRODUCT_AGRO_PRICE - PRODUCT_AGRO_PRICE * PRODUCT_DISCOUNT /100) * CART_QUANTITY}
              </Typography>             
            <Typography variant="subtitle1" color="text.secondary" component="div">
                
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, pb: 1 }}>
            <Stack spacing={2} direction="row">
                <Button size="small" variant="contained" startIcon={<EditIcon />} >Edit</Button>
                <Button size="small" variant="contained" color="error" startIcon={<CancelIcon />} >Delete</Button>
            </Stack>
            </Box>
          </Box>
        </Card>
    );
}

