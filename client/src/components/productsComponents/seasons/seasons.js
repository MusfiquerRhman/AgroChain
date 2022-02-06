import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Snackbar from '@mui/material/Snackbar';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import SeasonList from "./seasonsList"
import style from "../../../styles/seasonsStyles"
import useInputState from '../../../hooks/useInputState';
import * as adminApi from '../../../api/admin'
import {Alert} from "../../helper"

// const minDate = new Date('2022-01-01T00:00:00.000');
// const maxDate = new Date('2100-01-01T00:00:00.000');

function Season() {
    const classes = style();
    const [openAddForm, setOpenAddForm] = useState(false);
    const [seasonName, handleChangeSeasonName] = useInputState("");
    const [description, handleChangeDescription] = useInputState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [snakeBarOpen, setSnakeBarOpen] = useState(false);
    const [snakeBarType, setSnakeBarType] = useState("success");
    const [snakeMessage, setSnakeMessage] = useState("");

    const handleCloseSnakeBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnakeBarOpen(false);
    };

    const openForm = () => {
        setOpenAddForm(true);
    }

    const cancelSeason = () => {
        setOpenAddForm(false);
    }

    const submitForm = async (e) => {
        e.preventDefault();
        let response = await adminApi.addSeason(seasonName, startDate.getDate(), startDate.getMonth(), endDate.getDate(), endDate.getMonth(), description);
        if (response.status === 200) {
            setSnakeBarOpen(true);
            setSnakeBarType('success');
            setSnakeMessage(`${seasonName} Season added`);
        }
        else {
            setSnakeBarOpen(true);
            setSnakeBarType('error');
            setSnakeMessage(`failed to add Season`);
        }
    }

    return (
        <div>

            <h1>Seasons</h1>

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

            <Box sx={{ width: '100%', marginTop: "2rem", marginBottom: "2rem" }}>
                {openAddForm === false && (
                    <Grid container
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Button variant="contained"
                            className={classes.addButton}
                            className={classes.placeButton}
                            onClick={openForm}
                            disabled={openAddForm}
                            sx={{ width: "25%", minWidth: "270px" }}
                        >
                            Add a new season
                        </Button>
                    </Grid>
                )}

                <Dialog open={openAddForm} onClose={cancelSeason}>
                    <form>
                        <DialogTitle>Add Season</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To add a new season, enter the name of the season and select the start and end date of the season. year dosen't matter, select the month and date.
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
                                            label="Season Name"
                                            variant="standard"
                                            value={seasonName}
                                            onChange={handleChangeSeasonName}
                                            required
                                            sx={{
                                                width: "100%",
                                                minWidth: "270px",
                                                marginTop: "1rem"
                                            }}
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
                            <Button onClick={submitForm}>Add</Button>
                            <Button onClick={cancelSeason}>Cancel</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Box>

            <SeasonList />

            <Typography variant="h6" component="div" gutterBottom className={classes.heading} textAlign="center">
                We had joy, we had fun, we had seasons in the sun. <br></br>
                But the hills that we climbed were just seasons out of time.
            </Typography>
        </div>
    )
}

export default Season;

