import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useInputState from "../../hooks/useInputState"
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

    const [quantity, handleChangeQuantity, setQuantity] = useInputState("");
    const [openEditPopUp, setOpenEditPopUp] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [cartQuantity, setCartQuantity] = useState(CART_QUANTITY);

    const [snakeBarOpen, setSnakeBarOpen] = useState(false);
    const [snakeBarType, setSnakeBarType] = useState("success");
    const [snakeMessage, setSnakeMessage] = useState("");


    const handleCloseSnakeBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnakeBarOpen(false);
    };

    const updateForm = async (e) => {
        e.preventDefault();

        if(quantity <= 0){
            setSnakeBarOpen(true);
            setSnakeBarType("error");
            setSnakeMessage("Quantity must be greater than 0");
        }
        else {
            const formdata = new FormData();
            formdata.append("quantity", quantity);
    
            console.log(`/api/products/cart/update/${CART_ID}`)
    
            axios.post(`/api/products/cart/update/${CART_ID}`, formdata).then(res => {
                if(res.status === 200){
                    setCartQuantity(quantity);
                    setSnakeBarOpen(true);
                    setSnakeBarType("success");
                    setSnakeMessage("Successfully updated");
                }
            }).catch(err => {
                setSnakeBarOpen(true);
                setSnakeBarType("error");
                setSnakeMessage("Failed to Update");
            });

            setOpenEditPopUp(false);

        }
    }

    const deleteForm = async (e) => {
        e.preventDefault();
        axios.get(`/api/products/cart/delete/${CART_ID}`).then(res => {
            if(res.status === 200){
                setSnakeBarOpen(true);
                setSnakeBarType("success");
                setSnakeMessage("Successfully Deleted");
            }
        }).catch(err => {
            setSnakeBarOpen(true);
            setSnakeBarType("error");
            setSnakeMessage("Failed to Deleted");
            console.log(err.message);
        });

        setOpenEditPopUp(false);
    }

    const handleClickOpen = () => {
        setOpenEditPopUp(true);
    };

    const handleClose = () => {
        setOpenEditPopUp(false);
    };


    const handleClickOpenDelete = () => {
        setDeleteOpen(true);
    };
  
    const handleCloseDelete = () => {
        setDeleteOpen(false);
    };

    return (
        <div>
            <Snackbar open={snakeBarOpen} autoHideDuration={6000} onClose={handleCloseSnakeBar}>
                <Alert onClose={handleCloseSnakeBar} severity={snakeBarType} sx={{ width: '100%' }}>
                    {snakeMessage}
                </Alert>
            </Snackbar>

            <Dialog open={openEditPopUp} onClose={handleClose}>
                <DialogTitle>{PRODUCT_NAME_EN} ({PRODUCT_NAME_BN})</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Current amount: {cartQuantity}, Enter new amount:
                        </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="amount"
                        label="Amount"
                        type="number"
                        InputProps={{
                            inputProps: { 
                                min: 1
                            }
                        }}
                        fullWidth
                        variant="standard"
                        value={quantity} 
                        onChange={handleChangeQuantity}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={updateForm}>Done</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={deleteOpen}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Are you sure you want to delete?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {PRODUCT_NAME_EN} ({PRODUCT_NAME_BN})
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDelete}>Cancle</Button>
                    <Button onClick={deleteForm} autoFocus color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

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
                            {cartQuantity} {PRODUCT_MEASUREMENT_UNIT} - ৳ {(PRODUCT_AGRO_PRICE - PRODUCT_AGRO_PRICE * PRODUCT_DISCOUNT /100) * cartQuantity}
                        </Typography>             
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, pb: 1 }}>
                        <Stack spacing={2} direction="row">
                            <Button size="small" variant="contained" startIcon={<EditIcon />} onClick={handleClickOpen}>Edit</Button>
                            <Button size="small" variant="contained"  startIcon={<DeleteIcon />} color="error" onClick={handleClickOpenDelete} >Delete</Button>
                        </Stack>
                    </Box>
                </Box>
            </Card>
        </div>
    );
}

