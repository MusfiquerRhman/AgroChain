import React, { useState } from 'react'
import { useSnackbar } from 'notistack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import style from "../../../styles/seasonsStyles"
import useInputState from '../../../hooks/useInputState';
import * as adminApi from '../../../api/admin'
import Typography from '@mui/material/Typography';
import TagsList from "./tagsList"

function Tags(){
    const classes = style();
    const { enqueueSnackbar } = useSnackbar();

    const [openAddForm, setOpenAddForm] = useState(false);
    const [tagName, handleChangeTagName] = useInputState("");
    const [description, handleChangeDescription] = useInputState("");

    const openForm = () => {
        setOpenAddForm(true);
    }

    const canceltagDialog = () => {
        setOpenAddForm(false);
    }

    const submitForm = async (e) => {
        e.preventDefault();

        let response = await adminApi.addTags(tagName, description);
        console.log(response.status)
        if (response.status === 200) {
            enqueueSnackbar(`${tagName} tag added`, {variant: 'success'});
            window.location.reload();
        }
        else {
            enqueueSnackbar(`failed to add Season`, {variant: 'error'});
        }
    }

    return (
        <div>
            <h1>Tags</h1>
            <Box sx={{ width: '100%', marginTop: "2rem", marginBottom: "2rem" }}>
                {openAddForm === false && (
                    <Grid container
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Button variant="contained"
                            className={[classes.addButton, classes.placeButton].join(' ')}
                            onClick={openForm}
                            disabled={openAddForm}
                            sx={{ width: "25%", minWidth: "270px" }}
                        >
                            Add a new Tag
                        </Button>
                    </Grid>
                )}

                <Dialog open={openAddForm} onClose={canceltagDialog}>
                    <form>
                        <DialogTitle>Add a Tag</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Add a Tag to descride product qualities like fresh, organic, etc.
                            </DialogContentText>
                            <Box sx={{ width: '100%' }}>
                                <Grid container
                                    item
                                    direction="column"
                                    spacing={2}
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Grid item sx={{ width: "100%" }}>
                                        <TextField id="registration-name"
                                            label="Tag Name"
                                            variant="standard"
                                            value={tagName}
                                            onChange={handleChangeTagName}
                                            required
                                            sx={{
                                                width: "100%",
                                                minWidth: "270px",
                                                marginTop: "1rem"
                                            }}
                                        />
                                    </Grid>
                                    <Grid item sx={{ width: "100%" }}>
                                        <TextField id="registration-description"
                                            label="Description"
                                            type="text"
                                            variant="standard"
                                            value={description}
                                            onChange={handleChangeDescription}
                                            multiline={true}
                                            rows={4}
                                            required
                                            placeholder='250 Charecters max'
                                            inputProps={{ maxLength: 250 }}
                                            sx={{
                                                width: "100%",
                                                minWidth: "270px",
                                                marginTop: "1rem"
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button type="submit" onClick={submitForm}>Add</Button>
                            <Button onClick={canceltagDialog}>Cancel</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Box>

            <TagsList />

            <Typography variant="h6" component="div" gutterBottom className={classes.heading} textAlign="center">
                Friends don't let friends use 
                <span style={{color: "#006B63"}}> #too </span>
                <span style={{color: "#006B63"}}>#many </span>
                <span style={{color: "#006B63"}}>#hashtags</span>
            </Typography>
        </div>
    )
}

export default Tags;