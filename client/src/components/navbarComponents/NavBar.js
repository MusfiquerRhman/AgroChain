import {NavLink, useNavigate} from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
// MaterialUI Elements
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';

import AdminDrawer from "./AdminDrawer";
import {Search, SearchIconWrapper, StyledInputBase} from "../../styles/navbarStyles";
import * as userApi from '../../api/users'
import {clearLocalStorageDate} from "../helper"

export default function NavBar(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state) => state.users);

    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [loggedin, setLoggedIn] = useState(false);
    const [isAdmin, setAdmin] = useState(false);
    const [userName, setUserName] = useState("");

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    useEffect(() => {
        async function fetchData(){
            const res = await userApi.isLoggedIn();
            if(res.data.code === 200 || res.data.code === 970904){
                setUserName(localStorage.getItem("userName"));
                setLoggedIn(true);
                if(res.data.code === 970904){
                    setAdmin(true);
                }
                if(users.userId === "" && localStorage.getItem("userId") !== null){
                    dispatch({
                        type: "USER_DETAILS",
                        payload: {
                            userEmail: localStorage.getItem("userEmail"),	
                            userPhone: localStorage.getItem("userPhone"),	
                            userId: localStorage.getItem("userId"),
                            userName: localStorage.getItem("userName"),
                            userJoinDate: localStorage.getItem("userJoinDate"),
                            token:  localStorage.getItem("token"),
                            userType: localStorage.getItem("keyboardCat"),
                        }
                    })
                }
            }
            else {
                clearLocalStorageDate();
            }
        }
        fetchData();
    }, [users.userId])

    
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleLogOut = async () => {
        setAnchorEl(null);
        handleMobileMenuClose();

        const res = await userApi.logout();
        if(res.status === 200){
            clearLocalStorageDate();
            setUserName("");
            setAdmin(false);
            setLoggedIn(false);
            dispatch({
                type: "USER_DETAILS",
                payload: {
                    userEmail: "",	
                    userPhone: "",	
                    userId: "",	
                    userName: "",	
                    userJoinDate: "",	
                    token:  "",	
                    userType: ""
                }
            })
            navigate('/')
        }
    }

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
        {loggedin &&
            <Box>
                <MenuItem onClick={handleMenuClose}>
                    <NavLink to="/">Profile</NavLink>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <NavLink to="/">Purchase History</NavLink>
                </MenuItem>
                <MenuItem onClick={handleLogOut}>
                    <NavLink to="/">Logout</NavLink>
                </MenuItem>
            </Box>
        }

        {!loggedin &&
            <Box>
                <MenuItem onClick={handleMenuClose}>
                    <NavLink to="/login">Login</NavLink>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                    <NavLink to="/registration">Sign Up</NavLink>
                </MenuItem>
            </Box>
        }        
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
        {loggedin && (
            <MenuItem>
                <IconButton 
                    size="large" 
                    aria-label="show 4 new mails" 
                    color="inherit"
                >
                <Badge badgeContent={4} color="error">
                    <ShoppingCartIcon />
                </Badge>
                </IconButton>
                <p>Cart</p>
            </MenuItem>
        )}

            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    let accountButtonText = " Sign In"
    if(loggedin){
        accountButtonText= `${userName}`
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {isAdmin && 
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2 }}
                            >
                            <MenuIcon />
                        </IconButton>
                    }  
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        <NavLink to="/"><i>AgroChain</i></NavLink>
                    </Typography>

                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>

                    <Box sx={{ flexGrow: 1 }} />

                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                     {loggedin && ( 
                        <IconButton size="large" color="inherit">
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ 
                                    display: { xs: 'none', sm: 'block' } 
                                }}
                            >
                            <Badge badgeContent={1} color="error">
                                <NavLink to="/user/cart" >Cart</NavLink>
                                    </Badge>
                            </Typography>
                        </IconButton>
                     )}

                    {loggedin && ( 
                        
                        <IconButton size="large" color="inherit">
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon sx={{ fontSize: 30 }}/>
                            </Badge>
                        </IconButton>
                    )}

                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ display: { xs: 'none', sm: 'block' } }}
                            >
                            {accountButtonText}
                            </Typography>
                        </IconButton>
                    </Box>

                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <AdminDrawer handleDrawerClose={handleDrawerClose} open={open}/>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
