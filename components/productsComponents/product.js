import React from 'react'

export default function Product(props) {
    const {PRODUCT_ID, ADMIN_ID, PRODUCT_NAME_EN, PRODUCT_NAME_BN, PRODUCT_IN_STOCK_QUANTITY, PRODUCT_MEASUREMENT_UNIT, PRODUCT_AGRO_PRICE, PRODUCT_DISCOUNT, PRODUCT_IMG} = props;
    return (
        <div>
            <img src={PRODUCT_IMG}/>
            <h1>{PRODUCT_NAME_EN}</h1>
            <h2>{PRODUCT_NAME_BN}</h2>
            <p>{PRODUCT_IN_STOCK_QUANTITY}</p>
            <p>{PRODUCT_MEASUREMENT_UNIT}</p>
            <p>{PRODUCT_AGRO_PRICE}</p>
            <p>{PRODUCT_DISCOUNT}</p>
        </div>
    )
}
