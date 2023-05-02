
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

function Update() {

    const {id} = useParams();
    const [product, setProduct] = useState([]);

    const [file, setFile] = useState();

    const setData = (e) => {
        setFile(e.target.files[0]);
    }


    useEffect(() => {
        axios.post('http://localhost:9091/getSingleProduct/'+id)
            .then(result => {
                console.log("Single Product Data get Successfully ::: ", result);
                setValues({...values, productName: result.data[0].Product_Name, productPrice: result.data[0].Product_Price})
            })
            .catch(error => {
                console.log("Error in Update Product", error)
            });
    }, [])

    const [values, setValues] = useState({
        productName: '',
        productPrice: ''
    })

    const navigate = useNavigate()

    const handleUpdate = (e) => {
          const formdata = new FormData();
        formdata.append('image', file)
        formdata.append('productName', values.productName);
        formdata.append('productPrice', values.productPrice);
        
        const config = {
            Headers : {
                "Content-Type" : "multipart/form-data"
            }
        }

        axios.post('http://localhost:9091/updateProduct/'+id, formdata, config)
            .then(result => {
                console.log("Product Updated Successfully ::: ", result);
                navigate('/');
            })
            .catch(error => {
                console.log("Error Update Product ", error)
            });
    }



    return (
        <>
            <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
                <div className='w-50 bg-white rounded p-3'>
                <div>
                        <h2>Product Update</h2>
                        <div className='mb-2'>
                            <label htmlFor=''>Product Name</label>
                            <input type='text' placeholder='Enter Product Name' className='form-control' value={values.productName}
                                onChange={e => setValues({ ...values, productName: e.target.value })} />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor=''>Product Price</label>
                            <input type='number' placeholder='Enter Product Price' className='form-control' value={values.productPrice}
                                onChange={e => setValues({ ...values, productPrice: e.target.value })} />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor=''>Upload Image</label>
                            <br></br>
                            <input type='file' onChange={setData} />
                        </div>
                        <br></br>
                        <button className='btn btn-success' onClick={handleUpdate}>Update Product</button> &nbsp;
                        <Link to="/" className='btn btn-btn btn-outline-secondary'>Back</Link>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Update;
