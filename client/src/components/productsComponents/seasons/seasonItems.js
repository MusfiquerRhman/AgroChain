import React, { useState } from 'react'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
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
import {Alert} from "../../helper"

export default function SeasonsItems(props) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const {
        SEASON_DESCRIPTION,
        SEASON_END_DAY,
        SEASON_END_MONTH,
        SEASON_NAME,
        SEASON_START_DAY,
        SEASON_START_MONTH,
        SEASON_ID
    } = props

    let startMonth = SEASON_START_MONTH + 1;
    let startDay = SEASON_START_DAY;
    let endMonth = SEASON_END_MONTH + 1;
    let endDay = SEASON_END_DAY;

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
    const startEndString = `${date.getFullYear()}-${endMonth}-${endDay}T00:00:00.000`

    const [seasonName, handleChangeSeasonName] = useInputState(SEASON_NAME);
    const [description, handleChangeDescription] = useInputState(SEASON_DESCRIPTION);

    const [openEditForm, setOpenEditForm] = useState(false);
    const [startDate, setStartDate] = useState(new Date(startDateString));
    const [endDate, setEndDate] = useState(new Date(startEndString));
    const [snakeBarOpen, setSnakeBarOpen] = useState(false);
    const [snakeBarType, setSnakeBarType] = useState("success");
    const [snakeMessage, setSnakeMessage] = useState("");


    const cancelSeasonEdit = () => {
        setOpenEditForm(false);
    }

    const handleClickEdit = () => {
        setOpenEditForm(true);
    }

    const handleCloseSnakeBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnakeBarOpen(false);
    };

    const updateForm = async () => {
        const res = await adminApi.updateSeasons(seasonName, startDate.getDate(), startDate.getMonth(), endDate.getDate(), endDate.getMonth(), description, SEASON_ID)
        if (res.status === 200) {
            setSnakeBarOpen(true);
            setSnakeBarType("success");
            setSnakeMessage("Successfully updated");
            window.location.reload()
        }
        else {
            setSnakeBarOpen(true);
            setSnakeBarType("error");
            setSnakeMessage("Failed to Update");
        }
        setOpenEditForm(false);
    }


    return (
        <React.Fragment>
            <Snackbar
                open={snakeBarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnakeBar}
            >
                <Alert
                    onClose={handleCloseSnakeBar}
                    severity={snakeBarType}
                    sx={{ width: '100%' }}
                >
                    {snakeMessage}
                </Alert>
            </Snackbar>

            <Dialog open={openEditForm} onClose={cancelSeasonEdit} fullWidth={true}>
                <form>
                    <DialogTitle>Edit {SEASON_NAME}</DialogTitle>
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
                        <Button onClick={updateForm}>Add</Button>
                        <Button onClick={cancelSeasonEdit}>Cancel</Button>
                    </DialogActions>
                </form>
            </Dialog>

            <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {SEASON_NAME}
                    </Typography>
                    <Typography gutterBottom variant="body2" color="text.secondary" sx={{ height: "10rem", overflow: "hidden", textOverflow: "string" }}>
                        {SEASON_DESCRIPTION}
                    </Typography>
                    <Typography variant='subtitle1'>
                        Duration: {`${SEASON_START_DAY} ${months[SEASON_START_MONTH]} - ${SEASON_END_DAY} ${months[SEASON_END_MONTH]}`}
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
                    // onClick={handleClickOpenDelete} 
                    >
                        Delete
                    </Button>
                </CardActions>
            </Card>
        </React.Fragment>
    )
}

