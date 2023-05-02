
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactDataTable from 'react-data-table-component';
import * as moment from 'moment';


function Home() {

    const [search, searchFilter] = useState("");
    const [data, setData] = useState([]);
    const [filterProduct, setFilterProduct] = useState([]);

    const getProductList = async () => {
        try {
            const response = await axios.get('http://localhost:9091/getProductList');
            console.log("response.data>>>>>>.", response.data);
            setData(response.data);
            setFilterProduct(response.data)
        } catch (error) {
            console.log("Error in Get Data ", error);
        }
    }

    useEffect(() => {
        getProductList();
    }, [])

    useEffect(() => {
        const result = data.filter(product => {
            return product.Product_Name.toLowerCase().match(search.toLowerCase());
        })
        setFilterProduct(result);
    }, [search])


    const columns = [
        {
            name: 'No',
            selector: row => row.Product_ID,
            sortable: true
        },
        {
            name: 'Name',
            selector: row => row.Product_Name,
            sortable: true
        },
        {
            name: 'Price',
            selector: row => row.Product_Price,
            sortable: true
        },
        {
            name: 'Created At',
            selector: row => moment(row.Product_CreatedAt).format('lll'),
            //  row.Product_CreatedAt,
            sortable: true
        },
        {
            name: 'Image',
            cell: row => <img src={`http://localhost:9091/images/` + row.Product_Image} alt='' style={{ width: '40px', height: "40px" }} />
        },
        {
            name: 'Action',
            cell: row => <Link to={`./update/${row.Product_ID}`} className='btn btn-sm btn-primary mx-2'>Edit</Link>
        }
    ]

    return (
        <>
            <div className='d-flex flex-column align-items-center'> 
                <ReactDataTable
                    title="Product List"
                    columns={columns}
                    data={filterProduct}
                    fixedHeader
                    fixedHeaderScrollHeight='485px'
                    highlightOnHover
                    pagination
                    subHeader
                    subHeaderComponent={
                        <input type='text' placeholder='Search Here' className='w-25 form-control' value={search} onChange={(e) => searchFilter(e.target.value)} />
                    }
                    actions={<Link to="/create" className='btn btn-success'>Create +</Link>}
                >
                </ReactDataTable>
            </div>
        </>
    );
}

export default Home;
