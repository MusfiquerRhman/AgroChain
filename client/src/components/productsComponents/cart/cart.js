import React, {useState, useEffect} from 'react';
import Cartlist from "./cartList"
import * as api from "../../../api/users"
import {useSelector} from 'react-redux'

export default function Cart() {
    const [products, setProducts] = useState([]);
    const users = useSelector((state) => state.users);

    useEffect(() => {
        async function getCartItems(){
            const res = await api.userCartItems(users.userId);
            if(res.status === 200){
                let items = []
                res.data.forEach(element => {
                    items.push(element)
                });
                setProducts(items);
            }
        }
        getCartItems();
    }, [users.userId])

    return(
        <Cartlist products={products}  key={products.CART_ID}/>
    )
}
