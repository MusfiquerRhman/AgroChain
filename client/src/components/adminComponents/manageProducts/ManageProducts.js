import React, {useState, useEffect} from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import SubjectIcon from '@mui/icons-material/Subject';

import ActiveProducts from "./activeProducts";
import DisabledProducts from './disabledProducts';
import OutOfStock from './outOfStock'
import AllProducts from './allProducts'
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';

import * as adminApi from '../../../api/admin'

export default function LabTabs() {
    const [value, setValue] = React.useState('1');
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        async function getData() {
            const response = await adminApi.getAllProducts();
            if(response.status === 200){
                console.log(response.data)
                setAllProducts(response.data);
            }
        }
        getData();
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1', marginTop: "1rem" }}>
            <TabContext value={value} >
                <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="tabs"
                    >
                        <Tab icon={<SubjectIcon />} label="All Products" value="1" />
                        <Tab icon={<RemoveShoppingCartIcon /> } label="Out of Stock" value="2" />
                        <Tab icon={<EventAvailableIcon />} label="Availble Products" value="3" />
                        <Tab icon={<EventBusyIcon />} label="Disabled Products" value="4" />
                    </Tabs>
                </Box>
                <TabPanel sx={{ padding: 1, paddingTop: '1.5rem'}} value="1">< AllProducts allProducts = {allProducts}/></TabPanel>
                <TabPanel sx={{ padding: 1, paddingTop: '1.5rem'}} value="2">< OutOfStock /></TabPanel>
                <TabPanel sx={{ padding: 1, paddingTop: '1.5rem'}} value="3">< ActiveProducts /></TabPanel>
                <TabPanel sx={{ padding: 1, paddingTop: '1.5rem'}} value="4">< DisabledProducts /></TabPanel>
            </TabContext>
        </Box>
    );
}