import React, {useState, useEffect} from 'react';
import LinearProgressWithLabel from '@mui/material/LinearProgress';
import useInputState from '../hooks/useInputState';
import axios from 'axios';

function AddProducts() {
    const [nameEN, handleChangeNameEn, setNameEn] = useInputState("");
    const [nameBN, handleChangeNameBn, setNameBN] = useInputState("");
    const [inStockQuantity, handleChangeInStockQuantity, setInStockQuantity] = useInputState("");
    const [measurementUnit, handleChangeMeasurementUnit, setMeasurementUnit] = useInputState("");
    const [price, handleChangePrice, setPrice] = useInputState("");
    const [discount, handleChangeDicount, setDiscout] = useInputState("");

    const [image, setImage] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setUploadProgress(0);
        }, 1000)
    }, [uploadProgress])

    const imageSelectHandeler = files => {
        setImage(files[0]);
    }

    const resetFields = () => {
        setNameEn("");
        setNameBN("");
        setInStockQuantity("");
        setMeasurementUnit("");
        setPrice("");
        setDiscout("");
        setImage("");      
    }

    const submitForm = async (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("nameEN", nameEN);
        formdata.append("nameBN", nameBN);
        formdata.append("inStockQuantity", inStockQuantity);
        formdata.append("measurementUnit", measurementUnit);
        formdata.append("price", price);
        formdata.append("discount", discount);
        formdata.append("image", image);

        const progress = {
            onUploadProgress: (ProgressEvent) => {
                const {loaded, total} = ProgressEvent;
                let percent = Math.floor((loaded * 100) / total);
                if(percent < 100){
                    setUploadProgress(percent);
                }
            }
        }
    
        axios.post('/api/products', formdata, progress).then(res => {
            setUploadProgress(100)
            console.log(res);
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));

        resetFields();
        console.log(uploadProgress)
    }

    return (
        <div>
            <form>
                <LinearProgressWithLabel value={uploadProgress} variant="determinate"/>
                Name (English)
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
                <input name="image" type="file" onChange={(e) => {imageSelectHandeler(e.target.files)}}/>
                <button onClick={submitForm}>Submit</button>
            </form>
        </div>
    )
}

export default AddProducts;


// const submitForm = async () => {
//     const response = await fetch('/api/products', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
            // nameEN: nameEN,
            // nameBN: nameBN,
            // inStockQuantity: inStockQuantity,
            // measurementUnit: measurementUnit,
            // price: price,
            // discount: discount,
//             image: image
//         })
//     })
//     const data = await response.data;
//     console.log(data);
// }

// const submitForm = async () => {
//     const formdata = new FormData();
    // formdata.append("nameEN", nameEN);
    // formdata.append("nameBN", nameBN);
    // formdata.append("inStockQuantity", inStockQuantity);
    // formdata.append("measurementUnit", measurementUnit);
    // formdata.append("price", price);
    // formdata.append("discount", discount);
//     formdata.append("image", image, imgae.name);

//     axios.post('/api/products', formdata).then(res => {
//             console.log(res);
//     })

//     const data = await response.data;
//     console.log(data);
// }

// formdata.append("productDetails", {
//     nameEN: nameEN,
//     nameBN: nameBN,
//     inStockQuantity: inStockQuantity,
//     measurementUnit: measurementUnit,
//     price: price,
//     discount: discount,
// })