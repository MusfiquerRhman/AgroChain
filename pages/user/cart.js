import React, {useState, useEffect} from 'react';
import Cartlist from "../../components/productsComponents/cartList"
import axios from 'axios';

export default function Cart() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const userid = localStorage.getItem("userId");
        axios.get(`/api/products/cart/${userid}`, {
            headers: {
                "x-access-token": localStorage.getItem('token')
            }
        }).then(res => {
            if(res.status === 200){
                let items = []
                res.data.forEach(element => {
                    items.push(element)
                });
                setProducts(items);
            }
        }).catch(err => {
            
        })
    }, [products])

    return(
        <Cartlist products={products}  key={products.CART_ID}/>
    )
}
