import React, { useState } from 'react'
import { useSnackbar } from 'notistack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import * as adminApi from "../../../api/admin"
import useInputState from "../../../hooks/useInputState"

export default function TagItems(props) {
    const { enqueueSnackbar } = useSnackbar();

    const {
        TAG_DESCRIPTION,
        TAG_NAME,
        TAG_ID
    } = props

    const [tagName, handleChangeTagName, setTagName] = useInputState(TAG_NAME);
    const [description, handleChangeDescription, setSeasonDescription] = useInputState(TAG_DESCRIPTION);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);


    const cancelTagEdit = () => {
        setTagName(TAG_NAME);
        setSeasonDescription(TAG_DESCRIPTION);
        setOpenEditForm(false);
    }

    const handleClickEditFormDialog = () => {
        setOpenEditForm(true);
    }

    const handleClickOpenDeleteDialog = () => {
        setDeleteOpen(true);
    }

    const handleCloseDeleteDialog = () => {
        setDeleteOpen(false);
    }

    const updateForm = async () => {
        const res = await adminApi.updateTags(tagName, description, TAG_ID)
        if (res.status === 200) {
            enqueueSnackbar(`Successfully updated`, {variant: 'info'});
            setOpenEditForm(false);
        }
        else {
            enqueueSnackbar(`Failed to Update`, {variant: 'error'});
            cancelTagEdit();
        }
    }

    const deleteForm = async () => {
        const res = await adminApi.deleteTags(TAG_ID);
        if (res.status === 200) {
            enqueueSnackbar(`Successfully Deleted`, {variant: 'info'});
            setIsDeleted(true);
        }
        else {
            enqueueSnackbar(`Failed to Delete`, {variant: 'error'});
        }
        setDeleteOpen(false);
    }

    return (
        <React.Fragment>
            {!isDeleted &&
                <div>
                    <Dialog
                        open={deleteOpen}
                        onClose={handleCloseDeleteDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            Are you sure you want to delete?
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={handleCloseDeleteDialog}>Cancle</Button>
                            <Button onClick={deleteForm} autoFocus color="error">
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={openEditForm} onClose={cancelTagEdit} fullWidth={true}>
                        <form>
                            <DialogTitle sx={{ textTransform: 'capitalize' }} >Edit {TAG_NAME}</DialogTitle>
                            <DialogContent>
                                <Box sx={{ width: '100%' }}>
                                    <Grid container
                                        item
                                        direction="column"
                                        spacing={2}
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <Grid item sx={{ width: "100%" }}>
                                            <TextField id="tag-name"
                                                label="Tag Name"
                                                variant="standard"
                                                value={tagName}
                                                onChange={handleChangeTagName}
                                                required
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item sx={{ width: "100%" }}>
                                            <TextField id="tag-description"
                                                label="Description"
                                                type="text"
                                                variant="standard"
                                                value={description}
                                                onChange={handleChangeDescription}
                                                multiline={true}
                                                rows={6}
                                                required
                                                fullWidth
                                                placeholder='250 Charecters max'
                                                inputProps={{ maxLength: 250 }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={updateForm}>Done</Button>
                                <Button onClick={cancelTagEdit}>Cancel</Button>
                            </DialogActions>
                        </form>
                    </Dialog>

                    <Card sx={{ maxWidth: 345 }}>
                        <CardContent>
                            <Typography 
                                gutterBottom 
                                variant="h5" 
                                component="div">
                                {tagName}
                            </Typography>
                            <Typography 
                                gutterBottom 
                                variant="body2" 
                                color="text.secondary" 
                                sx={{ 
                                    height: "10rem", 
                                    overflow: "hidden", 
                                    textOverflow: "string" 
                                }}
                            >
                                {description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                size="small"
                                onClick={handleClickEditFormDialog}
                            >
                                Edit
                            </Button>
                            <Button
                                size="small"
                                color="error"
                                onClick={handleClickOpenDeleteDialog}
                            >
                                Delete
                            </Button>
                        </CardActions>
                    </Card>
                </div>
            }
        </React.Fragment>
    )
}
