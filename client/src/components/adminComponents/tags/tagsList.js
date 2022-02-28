import React, { useEffect, useState } from 'react'
// MaterialUI Elements
import Grid from '@mui/material/Grid';

import * as adminApi from "../../../api/admin"
import TagItems from './tagItems';

export default function TagsList() {
    const [allTags, setAllTags] = useState([]);

    useEffect(() => {
        async function getData() {
            const tags = await adminApi.getallTags();
            setAllTags(tags.data);
        }
        getData();
    }, [])

    return (
        <Grid container spacing={3}>
            {allTags.map(tag => (
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    xl={3}
                    key={tag.TAG_ID}
                >
                    <TagItems {...tag} key={tag.TAG_ID} />
                </Grid>
            ))}
        </Grid>
    )
}
