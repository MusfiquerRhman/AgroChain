import React, { useEffect, useState } from 'react'
// MaterialUI Elements
import Grid from '@mui/material/Grid';
import SeasonsItems from './seasonItems';

export default function SeasonsList(seasons) {
    const [allSeasons, setAllSeasons] = useState([]);

    useEffect(() => {
        setAllSeasons(seasons.seasons[0])
    }, [seasons])

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
                    <SeasonsItems {...season} key={season.SEASON_ID}/>
                </Grid>
            ))}
        </Grid>
    )
}
