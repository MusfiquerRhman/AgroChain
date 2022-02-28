import React, { useState, useEffect } from 'react'
import { useSnackbar } from 'notistack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
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
import * as productsApi from "../../../api/products"
// const minDate = new Date('2022-01-01T00:00:00.000');
// const maxDate = new Date('2100-01-01T00:00:00.000');

function Season() {
    const classes = style();
    const { enqueueSnackbar } = useSnackbar();

    const [openAddForm, setOpenAddForm] = useState(false);
    const [seasonName, handleChangeSeasonName] = useInputState("");
    const [description, handleChangeDescription] = useInputState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [allSeasons, setAllSeasons] = useState([]);

    useEffect(() => {
        async function getData() {
            const seasons = await productsApi.getAllSeasons();
            setAllSeasons(seasons.data.result);
        }
        getData();
    }, [])

    const openForm = () => {
        setOpenAddForm(true);
    }

    const cancelSeason = () => {
        setOpenAddForm(false);
    }

    const submitForm = async (e) => {
        e.preventDefault();
        let response = await adminApi.addSeason(seasonName, startDate, endDate, description);
        if (response.status === 200) {
            enqueueSnackbar(`${seasonName} Season added`, {variant: 'success'});
            window.location.reload();
        }
        else {
            enqueueSnackbar(`failed to add Season`, {variant: 'error'});
        }
    }

    return (
        <div>
            <h1>Seasons</h1>
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

            <SeasonList seasons={[allSeasons]}/>
        </div>
    )
}

export default Season;

