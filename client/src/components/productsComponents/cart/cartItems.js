import React, { useState } from 'react';
import { useSnackbar } from 'notistack';

// MaterialUI Elements
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import useInputState from "../../../hooks/useInputState"
import * as userApi from "../../../api/users"

export default function Product(props) {
    const { enqueueSnackbar } = useSnackbar();

    const { CART_ID,
        CART_QUANTITY,
        PRODUCT_NAME_EN,
        PRODUCT_NAME_BN,
        PRODUCT_AGRO_PRICE,
        PRODUCT_DISCOUNT,
        PRODUCT_MEASUREMENT_UNIT,
        PRODUCT_IMG
    } = props;

    const [quantity, handleChangeQuantity] = useInputState("");
    const [openEditPopUp, setOpenEditPopUp] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [cartQuantity, setCartQuantity] = useState(CART_QUANTITY);
    const [isDeleted, setIsDeleted] = useState(false);

    const updateForm = async () => {
        if (quantity <= 0) {
            enqueueSnackbar("Quantity must be greater than 0", {variant: 'error'})
        }
        else {
            const res = await userApi.updateCart(CART_ID, quantity);
            if (res.status === 200) {
                setCartQuantity(quantity);
                enqueueSnackbar("Successfully updated", {variant: 'info'})
                const changedValue = (cartQuantity - quantity) * (PRODUCT_AGRO_PRICE - (PRODUCT_AGRO_PRICE * PRODUCT_DISCOUNT /100))
                props.updatePrice(changedValue)
            }
            else {
                enqueueSnackbar("Failed to Update", {variant: 'error'})
            }
            setOpenEditPopUp(false);
        }
    }

    const deleteForm = async () => {
        const res = await userApi.deleteCart(CART_ID);
        if (res.status === 200) {
            enqueueSnackbar("Successfully Deleted", {variant: 'info'})
            const changedValue = cartQuantity * (PRODUCT_AGRO_PRICE - (PRODUCT_AGRO_PRICE * PRODUCT_DISCOUNT /100))
            setIsDeleted(true);
            props.updatePrice(changedValue)
        }
        else {
            enqueueSnackbar("Failed to Deleted", {variant: 'error'})
        }
        setDeleteOpen(false);
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
            {!isDeleted && (
                <div>
                <Dialog
                    open={openEditPopUp}
                    onClose={handleClose}
                >
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
                            <Typography
                                component="div"
                                variant="h5"
                            >
                                {`${PRODUCT_NAME_EN} (${PRODUCT_NAME_BN})`}
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                color="text.secondary"
                                component="div"
                            >
                                {cartQuantity} {PRODUCT_MEASUREMENT_UNIT} - ৳ {(PRODUCT_AGRO_PRICE - PRODUCT_AGRO_PRICE * PRODUCT_DISCOUNT / 100) * cartQuantity}
                            </Typography>
                        </CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, pb: 1 }}>
                            <Stack spacing={2} direction="row">
                                <Button
                                    size="small"
                                    variant="contained"
                                    startIcon={<EditIcon />}
                                    onClick={handleClickOpen}
                                >
                                    Edit
                                </Button>
                                <Button
                                    size="small"
                                    variant="contained"
                                    startIcon={<DeleteIcon />}
                                    color="error"
                                    onClick={handleClickOpenDelete}
                                >
                                    Delete
                                </Button>
                            </Stack>
                        </Box>
                    </Box>
                </Card>
            </div>
            )}
        </div>
    );
}

