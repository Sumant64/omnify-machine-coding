"use client"
import React, { useEffect, useState } from 'react';
import mydata from '../../data/data.json';
import './style.css';

const columnData = {
    'ID': true,
    'Created On': true,
    'Payer': true,
    'Status': true,
    'Email': true,
    'Services': true,
    'Scheduled': true,
    'Payer Phone': true
}

const Table = () => {
    const [rows, setRows] = useState(mydata);
    const [columns, setColumns] = useState(columnData);
    const [dialog, setDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchClient, setSearchClient] = useState('');
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);



    useEffect(() => {

    }, []);

    const handleColumn = (item) => {
        console.log(item)
        setLoading(true);
        let newCols = columns;
        if (newCols[item]) {
            setColumns({ ...columns, [item]: false })
        } else {
            setColumns({ ...columns, [item]: true })
        }

        setLoading(false);
    }

    const handleSearch = (event) => {
        setLoading(true);
        setSearchClient(event.target.value);
        if (event.target.value) {
            console.log(event.target.value)
            let searchRows = mydata.filter((item) => {
                let regex = new RegExp(event.target.value, "i", "g")
                return item.payer.toString().match(regex)
            })
            setRows([...searchRows])
        } else {
            setRows(mydata)
        }

        setLoading(false);
    }

    const selectPageHandler = (selectPage) => {
        if(selectPage >= 1 && selectPage <= rows.length / rowsPerPage && selectPage !== page) {
            setPage(selectPage);
        }
    }


    return (
        <div className='m-4'>
            <h1>Dynamic Table</h1>
            <div className='text-right'>
                <input className='border-2 ' type="text" placeholder='Search Client' value={searchClient} onChange={(event) => handleSearch(event)} />

            </div>
            <div style={{ position: 'relative' }}>
                <button onClick={() => setDialog(!dialog)}>Dynamic columns</button>
                <div className={`border-2 bg-[#fff] shadow-lg absolute ${dialog ? 'block' : 'hidden'}`}>
                    {
                        Object.keys(columnData).map((item) => {
                            return (
                                <div onClick={() => handleColumn(item)}>
                                    {item}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='flex justify-center'>
                <div className='w-[90%] overflow-auto'>

                    {
                        !loading &&
                        <table className='border-2  w-full mt-3'>
                            <thead className='border-2 pt-5 pb-5 text-start'>
                                <tr>
                                    {
                                        Object.keys(columns).map((item) => {

                                            if (columns[item]) {
                                                return (
                                                    <th className='text-start'>{item}</th>
                                                )

                                            }

                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    rows.slice(page * rowsPerPage - rowsPerPage, page * rowsPerPage).map((item) => {

                                        return (
                                            <tr className='pt-2 border-b-2'>
                                                <td>{item.id}</td>
                                                {columns['Created On'] && <td className='w-[300px]'>{item.createdOn}</td>}
                                                {columns['Payer'] && <td className='w-[300px]'>{item.payer}</td>}
                                                {columns['Status'] && <td className='w-[300px]'>{item.status}</td>}
                                                {columns['Email'] && <td className='w-[300px]'>{item.email}</td>}
                                                {columns['Services'] && <td className='w-[300px]'>{item.services}</td>}
                                                {columns['Scheduled'] && <td className='w-[300px] pr-2'>{item.scheduled}</td>}
                                                {columns['Payer Phone'] && <td className='w-[300px]'>{item.payerPhone}</td>}
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    }
                </div>

            </div>

            <div>
                {
                    rows.length > 0 &&
                    <div className='p-[10px] mt-[10px] mb-[10px] flex justify-center'>
                        <span onClick={() => selectPageHandler(page - 1)} className='border-2 p-3'>Prev</span>
                        {
                            [...Array(rows.length / rowsPerPage)].map((_, i) => {
                                if(i === page - 1 || i === page || i === page + 1){
                                return <span key={i} className={`p-2 pl-4 pr-4 border-2 ${page === i+1 ? 'bg-[#e2e2e2]': ''}`}>
                                    {i + 1}
                                </span>
                                }
                            })
                        }
                        <span onClick={() => selectPageHandler(page + 1)} className='border-2 p-3'>Next</span>
                    </div>
                }
            </div>
        </div>
    )
}

export default Table