import React, {useState} from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";

import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import SubjectIcon from '@mui/icons-material/Subject';

import ActiveProducts from "./activeProducts";
import DisabledProducts from './disabledProducts';
import OutOfStock from './outOfStock'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function LabTabs() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1', marginTop: "1rem" }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="tabs"
                    >
                        <Tab icon={<SubjectIcon />} label="All Products" value="1" />
                        <Tab icon={<RemoveShoppingCartIcon />} label="Out of Stock" value="2" />
                        <Tab icon={<EventAvailableIcon />} label="Availble Products" value="3" />
                        <Tab icon={<EventBusyIcon />} label="Disabled Products" value="4" />
                    </Tabs>
                </Box>
                <TabPanel value="1">< ActiveProducts /></TabPanel>
                <TabPanel value="2">< OutOfStock /></TabPanel>
                <TabPanel value="3">< ActiveProducts /></TabPanel>
                <TabPanel value="4">< DisabledProducts /></TabPanel>
            </TabContext>
        </Box>
    );
}