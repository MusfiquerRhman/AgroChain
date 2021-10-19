import React, {useState, useEffect} from 'react';
import LinearProgressWithLabel from '@mui/material/LinearProgress';
import useInputState from '../hooks/useInputState';
import axios from 'axios';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

function AddProducts() {
    const [nameEN, handleChangeNameEn, setNameEn] = useInputState("");
    const [nameBN, handleChangeNameBn, setNameBN] = useInputState("");
    const [inStockQuantity, handleChangeInStockQuantity, setInStockQuantity] = useInputState("");
    const [measurementUnit, handleChangeMeasurementUnit, setMeasurementUnit] = useInputState("");
    const [price, handleChangePrice, setPrice] = useInputState("");
    const [discount, handleChangeDicount, setDiscout] = useInputState(0);

    const [image, setImage] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    const [status, setstatus] = useState(0);

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
            if(res.status === 201){
                setUploadProgress(100);
                setstatus(201);
                resetFields();
            }
            else {
                setUploadProgress(0);
                setstatus(500);
            }
            console.log(res.status);
        }).catch(err => {
            setUploadProgress(0);
            setstatus(500);
        });
    }

    let flash = ""
    if(status === 201){
        flash = <div> <p> Product added succesfuly </p> </div>
    }
    else if(status === 500){
        flash = <div> <p> Failed to add product, please try a agian </p> </div>
    }

    return (
        <div>
            {flash}
            <Paper elevation={6} > 
                <form>
                    <LinearProgressWithLabel value={uploadProgress} variant="determinate"/>
                    <Box sx={{ width: '100%' }}>
                        <TextField id="standard-basic" 
                            label="Name (English)" 
                            variant="standard" 
                            value={nameEN} 
                            onChange={handleChangeNameEn}/>

                        <TextField id="standard-basic" 
                            label="Name (bn)" 
                            variant="standard" 
                            value={nameBN} 
                            onChange={handleChangeNameBn}/>
                        
                        <TextField id="standard-basic" 
                            label="In stock" 
                            variant="standard" 
                            type="number"
                            value={inStockQuantity}
                            onChange={handleChangeInStockQuantity}/>

                        <TextField id="standard-basic" 
                            label="mesurement unit" 
                            variant="standard" 
                            value={measurementUnit}
                            onChange={handleChangeMeasurementUnit}/>

                        <TextField id="standard-basic" 
                            label="price" 
                            variant="standard" 
                            type="number"
                            value={price}
                            onChange={handleChangePrice}/>
                        
                        <TextField id="standard-basic" 
                            label="Discount" 
                            type="number"
                            variant="standard" 
                            value={discount}
                            onChange={handleChangeDicount}/>

                        <Button variant="contained" component="label">
                            Upload File
                            <input
                                name="image" 
                                type="file" 
                                onChange={(e) => {imageSelectHandeler(e.target.files)}}
                                hidden
                            />
                        </Button>
                        
                        <Button onClick={submitForm} variant="outlined" >Submit</Button>
                    </Box>
                </form>
            </Paper>
        </div>
    )
}

export default AddProducts;


{/* <TextField id="standard-basic" 
                    label="Standard" 
                    variant="Select File" 
                    name="image" 
                    type="file" 
                    onChange={(e) => {imageSelectHandeler(e.target.files)}}/> */}
{/* <Button
  variant="contained"
  component="label"
>
  Upload File
  <input
    type="file"
    hidden
  />
</Button> */}
// <input name="image" type="file" onChange={(e) => {imageSelectHandeler(e.target.files)}}/>
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