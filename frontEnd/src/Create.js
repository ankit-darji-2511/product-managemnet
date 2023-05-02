
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';

function Create() {
    const [values, setValues] = useState({
        productName: '',
        productPrice: ''
    })

    const [file, setFile] = useState();

    const setData = (e) => {
        setFile(e.target.files[0]);
    }

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        const formdata = new FormData();
        formdata.append('image', file)
        formdata.append('productName', values.productName);
        formdata.append('productPrice', values.productPrice);
        
        const config = {
            Headers : {
                "Content-Type" : "multipart/form-data"
            }
        }

        await axios.post('http://localhost:9091/crateProduct', formdata, config)
            .then(result => {
                console.log("Product Created Successfully ::: ", result);
                navigate('/');
            })
            .catch(error => {
                console.log("Error in Get Data", error)
            });
    }



    return (
        <>
            <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
                <div className='w-50 bg-white rounded p-3'>
                    <div>
                        <h2>Product Create</h2>
                       
                        <div className='mb-2'>
                            <label htmlFor=''>Product Name</label>
                            <input type='text' placeholder='Enter Product Name' className='form-control'
                                onChange={e => setValues({ ...values, productName: e.target.value })} />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor=''>Product Price</label>
                            <input type='number' placeholder='Enter Product Price' className='form-control'
                                onChange={e => setValues({ ...values, productPrice: e.target.value })} />
                        </div>

                        <div className='mb-2'>
                            <label htmlFor=''>Upload Image</label>
                            <br></br>
                            <input type='file' onChange={setData} />
                        </div>
                        <br></br>
                        <button className='btn btn-success'onClick={handleSubmit}>Save Product</button> &nbsp;
                        <Link to="/" className='btn btn-btn btn-outline-secondary'>Back</Link>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Create;
