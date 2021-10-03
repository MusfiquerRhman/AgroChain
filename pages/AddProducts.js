import React from 'react';
import useInputState from '../hooks/useInputState';

function AddProducts() {
    const [nameEN, handleChangeNameEn] = useInputState("");
    const [nameBN, handleChangeNameBn] = useInputState("");
    const [inStockQuantity, handleChangeInStockQuantity] = useInputState("");
    const [measurementUnit, handleChangeMeasurementUnit] = useInputState("");
    const [price, handleChangePrice] = useInputState("");
    const [discount, handleChangeDicount] = useInputState("");

    const submitComments = async () => {
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nameEN: nameEN,
                nameBN: nameBN,
                inStockQuantity: inStockQuantity,
                measurementUnit: measurementUnit,
                price: price,
                discount: discount,
                image: image
            })
        })
        const data = await response.data;
        console.log(data);
    }

    return (
        <div>
            <form>
                Name (en)
                <input type="text"
                    value={nameEN}
                    onChange={handleChangeNameEn}
                />
                Name (bn)
                <input type="text"
                    value={nameBN}
                    onChange={handleChangeNameBn}
                />
                in stock
                <input type="number"
                    value={inStockQuantity}
                    onChange={handleChangeInStockQuantity}
                />
                mesurement unit
                <input type="text"
                    value={measurementUnit}
                    onChange={handleChangeMeasurementUnit}
                />
                price
                <input type="text"
                    value={price}
                    onChange={handleChangePrice}
                />
                discount
                <input type="text"
                    value={discount}
                    onChange={handleChangeDicount}
                />
                <input type="file" value={image} onChange={onFileChange}/>
                <button onClick={submitComments}>Submit</button>
            </form>
        </div>
    )
}

export default AddProducts;
