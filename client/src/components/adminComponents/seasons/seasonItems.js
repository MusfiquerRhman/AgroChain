import React, { useState } from 'react'
import { useSnackbar } from 'notistack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DialogContentText from '@mui/material/DialogContentText';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import * as adminApi from "../../../api/admin"
import useInputState from "../../../hooks/useInputState"

export default function SeasonsItems(props) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const { enqueueSnackbar } = useSnackbar();

    const {
        SEASON_DESCRIPTION,
        SEASON_END_DATE,
        SEASON_NAME,
        SEASON_START_DATE,
        SEASON_ID
    } = props

    const stert_Date = new Date(SEASON_START_DATE);
    const end_Date = new Date(SEASON_END_DATE);

    let startMonth = stert_Date.getMonth() + 1;
    let startDay = stert_Date.getDate();
    let endMonth = end_Date.getMonth() + 1;
    let endDay = end_Date.getDate();

    if (startMonth <= 9) {
        startMonth = `0${startMonth}`
    }
    if (startDay <= 9) {
        startDay = `0${startDay}`
    }
    if (endMonth <= 9) {
        endMonth = `0${endMonth}`
    }
    if (endDay <= 9) {
        endDay = `0${endDay}`
    }

    let date = new Date()

    const startDateString = `${date.getFullYear()}-${startMonth}-${startDay}T00:00:00.000`
    const endDateString = `${date.getFullYear()}-${endMonth}-${endDay}T00:00:00.000`

    const [seasonName, handleChangeSeasonName, setSeasonName] = useInputState(SEASON_NAME);
    const [description, handleChangeDescription, setSeasonDescription] = useInputState(SEASON_DESCRIPTION);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [startDate, setStartDate] = useState(new Date(startDateString));
    const [endDate, setEndDate] = useState(new Date(endDateString));

    const cancelSeasonEdit = () => {
        setSeasonName(SEASON_NAME);
        setSeasonDescription(SEASON_DESCRIPTION);
        setStartDate(new Date(startDateString));
        setEndDate(new Date(endDateString));
        setOpenEditForm(false);
    }

    const handleClickEdit = () => {
        setOpenEditForm(true);
    }

    const handleClickOpenDelete = () => {
        setDeleteOpen(true);
    }

    const handleCloseDelete = () => {
        setDeleteOpen(false);
    }

    const updateForm = async () => {
        const res = await adminApi.updateSeasons(seasonName, startDate, endDate, description, SEASON_ID)
        if (res.status === 200) {
            enqueueSnackbar(`Successfully updated`, {variant: 'info'});
            setOpenEditForm(false);
        }
        else {
            enqueueSnackbar(`Failed to Update`, {variant: 'error'});
            cancelSeasonEdit();
        }
    }

    const deleteForm = async () => {
        const res = await adminApi.deleteSeasons(SEASON_ID);
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
                        onClose={handleCloseDelete}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            Are you sure you want to delete?
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {`${seasonName} (${startDate.getDate()} ${months[startDate.getMonth()]} - ${endDate.getDate()} ${months[endDate.getMonth()]})`}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDelete}>Cancle</Button>
                            <Button onClick={deleteForm} autoFocus color="error">
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={openEditForm} onClose={cancelSeasonEdit} fullWidth={true}>
                        <form>
                            <DialogTitle sx={{ textTransform: 'capitalize' }} >Edit {SEASON_NAME}</DialogTitle>
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
                                            <TextField id="registration-name"
                                                label="Season Name"
                                                variant="standard"
                                                value={seasonName}
                                                onChange={handleChangeSeasonName}
                                                required
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item sx={{ width: "100%" }}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    openTo="month"
                                                    views={['month', 'day']}
                                                    label="Select when the season starts"
                                                    value={startDate}
                                                    onChange={(newValue) => {
                                                        setStartDate(newValue);
                                                    }}
                                                    renderInput={(params) =>
                                                        <TextField {...params}
                                                            helperText={null}
                                                            sx={{
                                                                width: "100%",
                                                                minWidth: "270px",
                                                                marginBottom: "0.5rem",
                                                                marginTop: "0.5rem"
                                                            }}
                                                        />
                                                    }
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                        <Grid item sx={{ width: "100%" }}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    openTo="month"
                                                    views={['month', 'day']}
                                                    label="Select when the season Ends"
                                                    value={endDate}
                                                    onChange={(newValue) => {
                                                        setEndDate(newValue);
                                                    }}
                                                    renderInput={(params) =>
                                                        <TextField {...params}
                                                            helperText={null}
                                                            sx={{ width: "100%", minWidth: "270px" }}
                                                        />
                                                    }
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                        <Grid item sx={{ width: "100%" }}>
                                            <TextField id="registration-description"
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
                                <Button onClick={cancelSeasonEdit}>Cancel</Button>
                            </DialogActions>
                        </form>
                    </Dialog>

                    <Card sx={{ maxWidth: 345 }}>
                        <CardContent>
                            <Typography 
                                gutterBottom 
                                variant="h5" 
                                component="div">
                                {seasonName}
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
                            <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                                {`${startDate.getDate()} ${months[startDate.getMonth()]} - ${endDate.getDate()} ${months[endDate.getMonth()]}`}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                size="small"
                                onClick={handleClickEdit}
                            >
                                Edit
                            </Button>
                            <Button
                                size="small"
                                color="error"
                                onClick={handleClickOpenDelete}
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

