import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
// MaterialUI Elements
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import * as adminApi from "../../api/admin";

import BorderLinearProgress from "../../styles/BorderLinearProgress";
import style from "../../styles/formStyle";
import useInputState from "../../hooks/useInputState";

function AddProducts() {
    const { enqueueSnackbar } = useSnackbar();
    const classes = style();

    const [nameEN, handleChangeNameEn, setNameEn] = useInputState("");
    const [nameBN, handleChangeNameBn, setNameBN] = useInputState("");
    const [inStockQuantity, handleChangeInStockQuantity, setInStockQuantity] = useInputState("");
    const [measurementUnit, handleChangeMeasurementUnit, setMeasurementUnit] = useInputState("");
    const [details, handleChangeDetails, setdetails] = useInputState("");
    const [price, handleChangePrice, setPrice] = useInputState("");
    const [discount, handleChangeDicount, setDiscout] = useInputState(0);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAvailable, setIsAvailable] = useState(true);
    const [flashMessage, setFlashMEssage] = useState("");

    const [image, setImage] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    const [displayImage, setDisplayImage] = useState("");

    const [allSeasons, setAllSeasons] = useState([]);
    const [allSelectedSeasons, setAllSelectedSeasons] = useState([]);

    const [allTags, setAllTags] = useState([]);
    const [allSelectedTags, setAllSelectedTags] = useState([]);

    const [anchorElSeason, setAnchorElSeason] = React.useState(null);
    const [anchorElTag, setAnchorElTag] = React.useState(null);

    useEffect(() => {
        const type = localStorage.getItem("keyboardCat");
        if (type === "AVATER") {
            setIsAdmin(true);
        }
    }, [isAdmin]);

    useEffect(() => {
        async function getSeasons() {
            const res = await adminApi.seasonshort();
            if (res.status === 200) {
                setAllSeasons(res.data);
            }
        }
        getSeasons();
    }, [isAdmin]);

    useEffect(() => {
        async function getTags() {
            const res = await adminApi.getallTags();
            if (res.status === 200) {
                setAllTags(res.data);
            }
        }
        getTags();
    }, [isAdmin]);

    const openSeason = Boolean(anchorElSeason);

    const handleClickSeason = (event) => {
        setAnchorElSeason(event.currentTarget);
    };

    const handleCloseSeason = () => {
        setAnchorElSeason(null);
    };

    const openTag = Boolean(anchorElTag);

    const handleClickTag = (event) => {
        setAnchorElTag(event.currentTarget);
    };

    const handleCloseTag = () => {
        setAnchorElTag(null);
    };

    const submitForm = async (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("nameEN", nameEN);
        formdata.append("nameBN", nameBN);
        formdata.append("inStockQuantity", inStockQuantity);
        formdata.append("measurementUnit", measurementUnit);
        formdata.append("price", price);
        formdata.append("discount", discount);
        formdata.append("addedBy", localStorage.getItem("userId"));
        formdata.append("image", image);
        formdata.append("details", details);
        formdata.append("isAvailable", isAvailable);

        for (let i = 0; i < allSelectedSeasons.length; i++) {
            formdata.append("seasons[]", allSelectedSeasons[i].seasonId);
        }

        for (let i = 0; i < allSelectedTags.length; i++) {
            formdata.append("tags[]", allSelectedTags[i].tagId);
        }

        const progress = {
            onUploadProgress: (ProgressEvent) => {
                const { loaded, total } = ProgressEvent;
                let percent = Math.floor((loaded * 100) / total);
                if (percent < 100) {
                    setUploadProgress(percent);
                }
            },
        };

        axios.post("http://localhost:5000/api/avater/add", formdata, {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
        }, progress).then((res) => {
            if (res.status === 200) {
                console.log("res 200", res);
                setUploadProgress(100);
                resetFields();
                enqueueSnackbar("Product added succesfuly", {
                    variant: "success",
                });
            } else if (res.status === 201) {
                setUploadProgress(100);
                resetFields();
                if (res.data === "seasons") {
                    setFlashMEssage("Product added succesfuly, but failed to add all seasons and tags, Please edit them in the manage products page");
                }
                else if (res.data === "tags") {
                    setFlashMEssage("Product added succesfuly, but failed to add all tags, Please edit them in the manage products page");
                }
            }
        }).catch((err) => {
            setUploadProgress(0);
            enqueueSnackbar("Failed to add product, please try a agian", {
                variant: "error",
            });
        });
    };

    const handleChangeIsAvailable = (event) => {
        setIsAvailable(event.target.checked);
    };

    const addSeason = (seasonId, seasonName) => {
        let seasonList = [...allSelectedSeasons];
        if (seasonList.find((season) => season.seasonId === seasonId) === undefined) {
            seasonList.push({ seasonId, seasonName });
            enqueueSnackbar(`Season ${seasonName} Added`, {
                variant: "info",
            });
            setAllSelectedSeasons(seasonList);
        } else {
            enqueueSnackbar(`Season ${seasonName} already Added`, {
                variant: "error",
            });
        }
    };

    const deleteSeason = (id, seasonName) => {
        let seasonList = allSelectedSeasons.filter(
            (season) => season.seasonId !== id
        );
        enqueueSnackbar(`Season ${seasonName} Deleted`, {
            variant: "default",
        });
        setAllSelectedSeasons(seasonList);
    };

    const addTag = (tagId, tagName) => {
        let tagList = [...allSelectedTags];
        if (tagList.find((tag) => tag.tagId === tagId) === undefined) {
            tagList.push({ tagId: tagId, tagName: tagName });
            enqueueSnackbar(`Tag ${tagName} Added`, {
                variant: "info",
            });
            setAllSelectedTags(tagList);
        } else {
            enqueueSnackbar(`Tag ${tagName} already Added`, {
                variant: "error",
            });
        }
    };

    const deleteTag = (id, tagName) => {
        let tagList = allSelectedTags.filter(
            (tag) => tag.tagId !== id
        );
        enqueueSnackbar(`Tag ${tagName} Deleted`, {
            variant: "default",
        });
        setAllSelectedTags(tagList);
    };

    useEffect(() => {
        setTimeout(() => {
            setUploadProgress(0);
        }, 1000);
    }, [uploadProgress]);

    const imageSelectHandeler = (files) => {
        setImage(files[0]);
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setDisplayImage(reader.result);
            }
        };
        if (files[0] && files[0].type.match("image.*")) {
            reader.readAsDataURL(files[0]);
        }
    };

    const resetFields = () => {
        setNameEn("");
        setNameBN("");
        setInStockQuantity("");
        setMeasurementUnit("");
        setPrice("");
        setDiscout(0);
        setImage("");
        setdetails("");
    };

    let imageSelectedMsg = (
        <Typography variant="h4" className={classes.imagetext}>
            Select an Image
        </Typography>
    );
    if (displayImage !== "") {
        imageSelectedMsg = (
            <img src={displayImage} className={classes.image} alt="product" />
        );
    }

    return (
        <div>
            {(flashMessage !== "") && (
            <Alert severity="error"
                sx={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
                <AlertTitle>Error</AlertTitle>
                {flashMessage}
            </Alert>
            )}

            {isAdmin && (
                <Paper elevation={6} sx={{ width: "100%" }}>
                    <form className={classes.form}>
                        <Typography variant="h3">Enter product details</Typography>

                        <BorderLinearProgress
                            value={uploadProgress}
                            variant="determinate"
                        />
                        <Box sx={{ width: "100%" }}>
                            <Grid
                                container
                                spacing={2}
                                direction="row"
                                justifyContent="space-between"
                            >
                                <Grid
                                    container
                                    item
                                    direction="column"
                                    spacing={2}
                                    xs={12}
                                    lg={6}
                                >
                                    <Grid item>
                                        <TextField
                                            id="standard-basic"
                                            label="Name (English)"
                                            variant="standard"
                                            value={nameEN}
                                            onChange={handleChangeNameEn}
                                            required
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            id="standard-basic"
                                            label="Name (bn)"
                                            variant="standard"
                                            value={nameBN}
                                            onChange={handleChangeNameBn}
                                            required
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            id="standard-basic"
                                            label="In stock"
                                            variant="standard"
                                            type="number"
                                            value={inStockQuantity}
                                            onChange={handleChangeInStockQuantity}
                                            required
                                            fullWidth
                                            InputProps={{ inputProps: { min: 0 } }}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            id="standard-basic"
                                            label="mesurement unit"
                                            variant="standard"
                                            value={measurementUnit}
                                            onChange={handleChangeMeasurementUnit}
                                            required
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            id="standard-basic"
                                            label="price"
                                            variant="standard"
                                            type="number"
                                            value={price}
                                            onChange={handleChangePrice}
                                            required
                                            fullWidth
                                            InputProps={{ inputProps: { min: 0 } }}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            id="standard-basic"
                                            label="Discount"
                                            type="number"
                                            variant="standard"
                                            value={discount}
                                            onChange={handleChangeDicount}
                                            required
                                            fullWidth
                                            InputProps={{ inputProps: { min: 0, max: 100 } }}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            id="product_details"
                                            label="Description"
                                            type="text"
                                            variant="standard"
                                            value={details}
                                            onChange={handleChangeDetails}
                                            multiline={true}
                                            rows={4}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        container
                                        spacing={2}
                                        direction="row"
                                        justifyContent="space-between"
                                    >
                                        <Grid item>
                                            <Stack direction="row" spacing={1}>
                                                {allSelectedSeasons.map((season) => {
                                                    return (
                                                        <Chip
                                                            color="primary"
                                                            key={season.seasonId}
                                                            label={season.seasonName}
                                                            onDelete={() =>
                                                                deleteSeason(season.seasonId, season.seasonName)
                                                            }
                                                        />
                                                    );
                                                })}
                                            </Stack>
                                        </Grid>
                                        <Grid item lg={5} md={4} sm={6} xs={12}>
                                            <Button
                                                fullWidth
                                                id="demo-positioned-button"
                                                aria-controls={
                                                    openSeason ? "demo-positioned-menu" : undefined
                                                }
                                                aria-haspopup="true"
                                                aria-expanded={openSeason ? "true" : undefined}
                                                onClick={handleClickSeason}
                                                variant="contained"
                                                startIcon={<AddIcon />}
                                            >
                                                Add Seasons
                                            </Button>
                                            <Menu
                                                id="demo-positioned-menu"
                                                aria-labelledby="demo-positioned-button"
                                                anchorEl={anchorElSeason}
                                                open={openSeason}
                                                onClose={handleCloseSeason}
                                                anchorOrigin={{
                                                    vertical: "top",
                                                    horizontal: "left",
                                                }}
                                                transformOrigin={{
                                                    vertical: "top",
                                                    horizontal: "left",
                                                }}
                                            >
                                                {allSeasons.map((season) => {
                                                    return (
                                                        <MenuItem
                                                            key={season.SEASON_ID}
                                                            onClick={() =>
                                                                addSeason(season.SEASON_ID, season.SEASON_NAME)
                                                            }
                                                        >
                                                            {season.SEASON_NAME}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Menu>
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        item
                                        container
                                        spacing={2}
                                        direction="row"
                                        justifyContent="space-between"
                                    >
                                        <Grid item>
                                            <Stack direction="row" spacing={1}>
                                                {allSelectedTags.map((tag) => {
                                                    return (
                                                        <Chip
                                                            color="primary"
                                                            key={tag.tagId}
                                                            label={tag.tagName}
                                                            onDelete={() =>
                                                                deleteTag(tag.tagId, tag.tagName)
                                                            }
                                                        />
                                                    );
                                                })}
                                            </Stack>
                                        </Grid>
                                        <Grid item lg={5} md={4} sm={6} xs={12}>
                                            <Button
                                                fullWidth
                                                id="demo-positioned-button"
                                                aria-controls={
                                                    openTag ? "demo-positioned-menu" : undefined
                                                }
                                                aria-haspopup="true"
                                                aria-expanded={openTag ? "true" : undefined}
                                                onClick={handleClickTag}
                                                variant="contained"
                                                startIcon={<AddIcon />}
                                            >
                                                Add Tags
                                            </Button>
                                            <Menu
                                                id="demo-positioned-menu"
                                                aria-labelledby="demo-positioned-button"
                                                anchorEl={anchorElTag}
                                                open={openTag}
                                                onClose={handleCloseTag}
                                                anchorOrigin={{
                                                    vertical: "top",
                                                    horizontal: "left",
                                                }}
                                                transformOrigin={{
                                                    vertical: "top",
                                                    horizontal: "left",
                                                }}
                                            >
                                                {allTags.map((tag) => {
                                                    return (
                                                        <MenuItem
                                                            key={tag.TAG_ID}
                                                            onClick={() =>
                                                                addTag(tag.TAG_ID, tag.TAG_NAME)
                                                            }
                                                        >
                                                            {tag.TAG_NAME}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Menu>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <FormControlLabel
                                            label="Make available in products page and search results"
                                            control={
                                                <Checkbox
                                                    checked={isAvailable}
                                                    onChange={handleChangeIsAvailable}
                                                />
                                            }
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    {imageSelectedMsg}
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            component="label"
                                            fullWidth
                                            sx={{ marginTop: "1rem" }}
                                        >
                                            Select a product image
                                            <input
                                                name="image"
                                                type="file"
                                                onChange={(e) => {
                                                    imageSelectHandeler(e.target.files);
                                                }}
                                                hidden
                                                required
                                            />
                                        </Button>
                                    </Grid>
                                    <Grid item sx={{ marginTop: "1rem" }}>
                                        <Button fullWidth onClick={submitForm} variant="outlined">
                                            Add product
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </form>
                </Paper>
            )}
            {!isAdmin && (
                <h1 style={{ textAlign: "center" }}>
                    404 | This page could not be found.
                </h1>
            )}
        </div>
    );
}

export default AddProducts;
