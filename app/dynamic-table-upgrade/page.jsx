"use client"
import React, { useEffect, useState } from 'react';
import mydata from '../../data/data.json';
import '../dynamic-table/style.css';

const columnData = [
    {
        field: 'ID',
        display: true,
        svg: ''
    },
    {
        field: 'Created On',
        display: true,
        svg: ''
    },
    {
        field: 'Payer',
        display: true,
        svg: ''
    },
    {
        field: 'Status',
        display: true,
        svg: ''
    },
    {
        field: 'Email',
        display: true,
        svg: ''
    },
    {
        field: 'Services',
        display: true,
        svg: ''
    },
    {
        field: 'Scheduled',
        display: true,
        svg: ''
    },
    {
        field: 'Payer Phone',
        display: true,
        svg: ''
    }
]

const DynamicTableUpgrade = () => {
    const [rows, setRows] = useState(mydata);
    const [columns, setColumns] = useState(columnData);
    const [dialog, setDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchClient, setSearchClient] = useState('');
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [mounseUnderDialog, setMouseUnderDialog] = useState(false);



    useEffect(() => {

    }, []);

    const handleColumn = (item) => {
        setLoading(true);
        let newCols = columns;
        if (item.display) {
            setColumns(columns.map((val) => {
                if(val.field === item.field){

                    val.display = false
                }
                return val;
            }))
        } else {
            setColumns(columns.map((val) => {
                if(val.field === item.field){

                    val.display = true
                }
                return val;
            }))
            
        }

        setLoading(false);
    }

    const handleSearch = (event) => {
        setLoading(true);
        setSearchClient(event.target.value);
        if (event.target.value) {
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

    const handleDialogCloseOutside = () => {
        if(dialog === true && mounseUnderDialog === false) {
            setDialog(false)
        }
    }


    return (
        <div className='m-4' onClick={() => handleDialogCloseOutside()}>
            <h1 className='text-3xl font-bold'>Waitlist</h1>
            <div className='flex gap-4 mt-5'>
                <p className='border-2 flex-1 p-3 rounded-xl'>All Waitlist <span>100</span></p>
                <p className='border-2 flex-1 p-3 rounded-xl'>Newly Added <span>50</span></p>
                <p className='border-2 flex-1 p-3 rounded-xl'>Leads <span>20</span></p>
            </div>
            <div className='text-right mt-4'>
                <input className=' rounded-xl p-[6px] shadow-md' type="text" placeholder='Search Client' value={searchClient} onChange={(event) => handleSearch(event)} />
            </div>
            <div className='relative'>
                <button className='border-2 rounded-xl p-[6px] bg-slate-100' onClick={() => setDialog(!dialog)}>Dynamic columns</button>
                <div onMouseEnter={() => setMouseUnderDialog(true)} onMouseLeave={() => setMouseUnderDialog(false)} className={`border-2 bg-[#fff] shadow-lg absolute p-4 ${dialog ? 'block' : 'hidden'}`}>
                    {
                        columnData.map((item) => {
                            let active = columns.filter((col) => col.field === item.field);
                            active = active[0].display
                            return (
                                <div className='flex gap-2'>
                                    <div className="check relative top-2">
                                        {
                                            active ? 'T' : 'F'
                                        }
                                    </div>
                                    <div className='border-[1px] m-1 pl-3 cursor-pointer rounded-md p-1 w-[200px]' onClick={() => handleColumn(item)}>
                                        {item.field}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='flex justify-center'>
                <div className='w-[100%] overflow-auto'>

                    {
                        !loading &&
                        <table className='rounded-xl border-2 w-full mt-3'>
                            <thead className='border-b-2 text-start'>
                                <tr>
                                    {
                                        columns.map((item) => {
                                            if(item.display) {
                                                return (
                                                    <th className='text-start p-2 bg-slate-100'>{item.field}</th>
                                                )
                                            }
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    rows.slice(page * rowsPerPage - rowsPerPage, page * rowsPerPage).map((item, index) => {

                                        return (
                                            <tr className={`border-b-2 ${index % 2 === 0 && 'bg-slate-50'}`}>
                                                <td className='p-2'>{item.id}</td>
                                                {columns[1].display && <td className='min-w-[300px]'>{item.createdOn}</td>}
                                                {columns[2].display && <td className='min-w-[250px]'>{item.payer}</td>}
                                                {columns[3].display && <td className='min-w-[150px]'>{item.status}</td>}
                                                {columns[4].display && <td className='min-w-[250px]'>{item.email}</td>}
                                                {columns[5].display && <td className='min-w-[250px]'>{item.services}</td>}
                                                {columns[6].display && <td className='min-w-[250px] pr-2'>{item.scheduled}</td>}
                                                {columns[7].display && <td className='min-w-[250px]'>{item.payerPhone}</td>}
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    }
                </div>
            </div>

            <div className='flex justify-between'>
                <div className="rows mt-3">
                    Display 
                    <select value={rowsPerPage.toString()} onChange={(event) => {setRowsPerPage(+event.target.value); setPage(1)}}>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                    out of {rows.length}
                </div>

                {
                    rows.length > 0 && !loading &&
                    <div className='p-[10px] mb-[10px] flex justify-center'>
                        <span onClick={() => selectPageHandler(page - 1)} className='border-2 p-3 cursor-pointer'>Prev</span>
                        {
                            [...Array(Math.ceil(rows.length / rowsPerPage))].map((_, i) => {
                                if(i === (page-1) - 1 || i === (page-1) || i === (page-1) + 1){
                                return <span key={i} className={`p-2 pl-4 pr-4 border-2 ${page === i+1 ? 'bg-[#e2e2e2]': ''}`}>
                                    {i + 1}
                                </span>
                                }
                            })
                        }
                        <span onClick={() => selectPageHandler(page + 1)} className='border-2 p-3 cursor-pointer'>Next</span>
                    </div>
                }
            </div>
        </div>
    )
}

export default DynamicTableUpgrade