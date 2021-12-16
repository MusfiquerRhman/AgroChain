import React, {useState, useEffect} from 'react';
import Cartlist from "../../components/productsComponents/cartList"
import axios from 'axios';

export default function Cart() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const userid = localStorage.getItem("userId");
        axios.get(`http://localhost:3000/api/products/cart/${userid}`).then(res => {
            if(res.status === 200){
                let items = []
                res.data.forEach(element => {
                    items.push(element)
                });
                setProducts(items);
            }
        })
    }, [products])

    return(
        <Cartlist products={products}/>
    )
}
