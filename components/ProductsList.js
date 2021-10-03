import React from 'react'
import Product from './product'

export default function ProductsList({products}) {
    return (
        <div>
            <h1>List of all products</h1>
            {products.map(product => (
                <Product {...product} key={product.PRODUCT_ID}/>
            ))}
        </div>
    )
}
