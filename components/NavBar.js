import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Router from 'next/router'
import Link from "next/link"
import {Search, SearchIconWrapper, StyledInputBase} from "../styles/navbarStyles";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
import AdminDrawer from "./navbarComponents/AdminDrawer";

export default function NavBar(){
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [open, setOpen] = React.useState(false);
    const [loggedin, setLoggedIn] = useState(false);
    const [isAdmin, setAdmin] = useState(false);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const loggedInUser = localStorage.getItem("userId");
        if(loggedInUser){
            setLoggedIn(true);
            const userType = localStorage.getItem("userType");
            if(userType === "AVATER"){
                setAdmin(true);
            }
            setUserName(localStorage.getItem("userName"));
        }
    })

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

    const handleLogOut = () => {
        setAnchorEl(null);
        handleMobileMenuClose();

        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userName");
        localStorage.removeItem("userPhone");
        localStorage.removeItem("userType");
        localStorage.removeItem("userJoinDate");

        axios.post('/api/user/logout').then(res => {
            Router.reload('/');
        }).catch(err => {
            console.log(err.message);
        });
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
                <MenuItem onClick={handleMenuClose}><Link href="/"><a>Profile</a></Link></MenuItem>
                <MenuItem onClick={handleMenuClose}><Link href="/"><a>Purchase History</a></Link></MenuItem>
                <MenuItem onClick={handleLogOut}><Link href="/"><a>Logout</a></Link></MenuItem>
            </Box>
        }

        {!loggedin &&
            <Box>
                <MenuItem onClick={handleMenuClose}><Link href="/login"><a>Login</a></Link></MenuItem>
                <MenuItem onClick={handleMenuClose}><Link href="/registration"><a>Sign Up</a></Link></MenuItem>
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
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
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
                        <Link href="/"><a><i>AgroChain</i></a></Link>
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
                                sx={{ display: { xs: 'none', sm: 'block' } }}
                            >
                            <Badge badgeContent={1} color="error">
                                <Link href="/user/cart" ><a>Cart</a></Link>
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
