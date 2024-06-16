"use client"
import React, { useEffect, useState } from 'react';
import mydata from '../../data/data.json';
import '../dynamic-table/style.css';
import Filter from '../components/filter/Filter';
import { useSelector } from 'react-redux';
import { TfiReload } from "react-icons/tfi";
import { CiCalendar } from "react-icons/ci";
import { RxPerson } from "react-icons/rx";
import { RiRecordCircleLine } from "react-icons/ri";
import { HiOutlineHashtag } from "react-icons/hi";

const columnData = [
    {
        field: 'ID',
        display: true,
        svg: ''
    },
    {
        field: 'Created On',
        display: true,
        svg: <CiCalendar className='w-5 h-5 relative top-[2px]' />
    },
    {
        field: 'Payer',
        display: true,
        svg: <RxPerson className='w-5 h-5 relative top-[2px]' />
    },
    {
        field: 'Status',
        display: true,
        svg: <RiRecordCircleLine className='w-5 h-5 relative top-[2px]' />
    },
    {
        field: 'Email',
        display: true,
        svg: <HiOutlineHashtag className='w-5 h-5 relative top-[2px]' />
    },
    {
        field: 'Payer Phone',
        display: true,
        svg: <HiOutlineHashtag className='w-5 h-5 relative top-[2px]' />
    },
    {
        field: 'Services',
        display: true,
        svg: <HiOutlineHashtag className='w-5 h-5 relative top-[2px]' />
    },
    {
        field: 'Scheduled',
        display: true,
        svg: <CiCalendar className='w-5 h-5 relative top-[2px]' />
    },
]

const DynamicTableUpgrade = () => {
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState(columnData);
    const [dialog, setDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filterDialog, setFilterDialog] = useState(false);
    const [searchClient, setSearchClient] = useState('');
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const peopleFilter = useSelector((state) => state.filterReducer.filters.people);
    const scheduledDateFilter = useSelector((state) => state.filterReducer.filters.scheduledDate);

    useEffect(() => {
        loadInitial();
    }, [peopleFilter, scheduledDateFilter]);

    const loadInitial = () => {
        let data = mydata;
        if (peopleFilter.length > 0) {
            data = data.filter((item) => {
                return peopleFilter.includes(item.payer);
            })
        }
        console.log(data);
        if (scheduledDateFilter.length > 0 && scheduledDateFilter[0] !== '') {
            let from = new Date(scheduledDateFilter[0]);
            let to = new Date(scheduledDateFilter[1]);

            data = data.filter((item) => {
                let scheduled = new Date(item.scheduled);
                return scheduled >= from && scheduled <= to;
            })
        }
        setPage(1)
        setRowsPerPage(10)

        setRows(data);
    }

    const handleColumn = (item) => {
        setLoading(true);
        if (item.display) {
            setColumns(columns.map((val) => {
                if (val.field === item.field) {

                    val.display = false
                }
                return val;
            }))
        } else {
            setColumns(columns.map((val) => {
                if (val.field === item.field) {

                    val.display = true
                }
                return val;
            }))

        }

        setLoading(false);
    }

    const handleSearch = (searchValue) => {
        setLoading(true);
        setSearchClient(searchValue);
        if (searchValue) {
            let searchRows = mydata.filter((item) => {
                let regex = new RegExp(searchValue, "i", "g");
                return item.payer.toString().match(regex)
            })
            setRows([...searchRows])
        } else {
            setRows(mydata)
        }
        setLoading(false);
    }

    const selectPageHandler = (selectPage) => {
        if (selectPage >= 1 && selectPage <= rows.length / rowsPerPage && selectPage !== page) {
            setPage(selectPage);
        }
    }

    // const handleDialogCloseOutside = () => {
    //     if(dialog === true && mounseUnderDialog === false) {
    //         setDialog(false)
    //     }
    // }


    return (
        <div className='m-4'>
            <h1 className='text-3xl font-bold'>Waitlist</h1>
            <div className='flex flex-col gap-1 sm:flex-row sm:gap-4 mt-5 flex-wrap '>
                <p className='border-2 flex-1 p-3 rounded-xl '>All Waitlist <span>100</span></p>
                <p className='border-2 flex-1 p-3 rounded-xl '>Newly Added <span>50</span></p>
                <p className='border-2 flex-1 p-3 rounded-xl '>Leads <span>20</span></p>
            </div>

            {/* filters */}
            <div className="filters flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between mt-4">
                <div className="filters">
                    <button className='border-2 rounded-xl p-[6px] bg-slate-100 flex' onClick={() => { setFilterDialog(!filterDialog); setSearchClient('') }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel relative top-1 mr-2" viewBox="0 0 16 16">
                            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z" />
                        </svg>
                        Add Filters
                    </button>
                    <div className={`border-2 bg-[#fff] shadow-lg absolute ${filterDialog ? 'block' : 'hidden'}`}>
                        <Filter />
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row gap-3'>
                    {/* search */}
                    <div className='flex w-[100%] sm:w-[200px] rounded-lg border-2 p-[6px] shadow-md'>
                        <div className=''>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search relative top-1" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                            </svg>
                        </div>
                        <input className='pl-2 w-full border-none outline-none' type="text" placeholder='Search Client' value={searchClient} onChange={(event) => handleSearch(event.target.value)} />
                    </div>
                    {/* column filter */}
                    <div className='flex gap-3'>
                        <div>
                            <TfiReload className='w-5 h-5 relative top-2' />
                        </div>
                        <div className='relative'>
                            <button className='relative top-2' onClick={() => setDialog(!dialog)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-layout-three-columns" viewBox="0 0 16 16">
                                    <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5zM1.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5H5V1zM10 15V1H6v14zm1 0h3.5a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5H11z" />
                                </svg>
                            </button>
                            <div className={`border-2 bg-[#fff] shadow-lg absolute right-0 p-4 ${dialog ? 'block' : 'hidden'}`}>
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

                        {/* download icons */}
                        <div className='relative top-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                            </svg>
                        </div>

                    </div>
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
                                            if (item.display) {
                                                return (
                                                    <th className='text-start p-2 bg-slate-100'>
                                                        <div className='flex gap-2'>
                                                        {item.svg}{item.field}
                                                        </div>
                                                    </th>
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
                                                {columns[7].display && <td className='min-w-[250px]'>{item.payerPhone}</td>}
                                                {columns[5].display && <td className='min-w-[250px]'>{item.services}</td>}
                                                {columns[6].display && <td className='min-w-[250px] pr-2'>{item.scheduled}</td>}
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
                    <select value={rowsPerPage.toString()} onChange={(event) => { setRowsPerPage(+event.target.value); setPage(1) }}>
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
                                if (i === (page - 1) - 1 || i === (page - 1) || i === (page - 1) + 1) {
                                    return <span key={i} className={`p-2 pl-4 pr-4 border-2 ${page === i + 1 ? 'bg-[#e2e2e2]' : ''}`}>
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