import React, { useEffect, useState } from 'react'
// MaterialUI Elements
import Grid from '@mui/material/Grid';

import * as adminApi from "../../../api/admin"
import SeasonsItems from './seasonItems';

export default function SeasonsList() {

    const [allSeasons, setAllSeasons] = useState([]);

    useEffect(() => {
        async function getData() {
            const seasons = await adminApi.getAllSeasons();
            setAllSeasons(seasons.data.result);
        }
        getData();
    }, [])

    return (
        <Grid container spacing={3}>
            {allSeasons.map(season => (
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    xl={3}
                    key={season.SEASON_ID}
                >
                    <SeasonsItems {...season} key={season.SEASON_ID} />
                </Grid>
            ))}
        </Grid>
    )
}
