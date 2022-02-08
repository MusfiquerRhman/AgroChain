import './App.css'
import React, { useEffect } from 'react';
import NavBar from "./components/navbarComponents/NavBar"
import Grid from '@mui/material/Grid';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProducts } from './actions/products'
import { SnackbarProvider } from 'notistack';

import ProductsList from './components/productsComponents/ProductsList'
import ProdutDetails from './components/productsComponents/productsDetails'
import AddProducts from './components/adminComponents/AddProducts'
import Login from './components/userComponents/login'
import Registration from './components/userComponents/registration'
import Cart from './components/productsComponents/cart/cart'
import Seasons from './components/productsComponents/seasons/seasons'

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    return (
        <BrowserRouter>
            <SnackbarProvider maxSnack={3}>
                <Grid container direction="column">
                    <Grid item><NavBar /></Grid>
                    <Grid item container justifyContent={"center"}>
                        <Grid item xs={12} sm={10} lg={8}>
                            <Routes >
                                <Route exact path='/' element={<ProductsList />} />
                                <Route exact path='/registration' element={<Registration />} />
                                <Route exact path='/login' element={<Login />} />
                                <Route exact path='/products/:id' element={<ProdutDetails />} />
                                <Route exact path='/user/cart' element={<Cart />} />
                                <Route exact path='/avater/addproducts' element={<AddProducts />} />
                                <Route exact path='/avater/seasons' element={<Seasons />} />
                            </Routes >
                        </Grid>
                    </Grid>
                </Grid>
            </SnackbarProvider>
        </BrowserRouter>
    )
}

export default App;