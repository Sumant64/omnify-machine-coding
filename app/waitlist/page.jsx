"use client"
import React, { useEffect, useState } from 'react';
import mydata from '../../data/data.json';
import Filter from '../components/filter/Filter';
import { useSelector } from 'react-redux';
import { TfiReload } from "react-icons/tfi";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { columnData } from '@/util/config/tableHeader';
import CustomSelectBar from '../components/common/CustomSelectBar';
import { GoDotFill } from "react-icons/go";
import { dateFormat } from '@/util/date';

const DynamicTableUpgrade = () => {
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([...columnData]);
    const [columnFilter, setColumnFilter] = useState(['Created On', 'Payer', 'Status', 'Email', 'Payer Phone', 'Services', 'Scheduled']);
    const [dialog, setDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filterDialog, setFilterDialog] = useState(false);
    const [searchClient, setSearchClient] = useState('');
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const peopleFilter = useSelector((state) => state.filterReducer.filters.people);
    const serviceFilter = useSelector((state) => state.filterReducer.filters.service);
    const scheduledDateFilter = useSelector((state) => state.filterReducer.filters.scheduledDate);

    useEffect(() => {
        loadInitial();
    }, [peopleFilter, scheduledDateFilter, serviceFilter]);

    const loadInitial = () => {
        let data = mydata;
        if (peopleFilter.length > 0) {
            data = data.filter((item) => {
                return peopleFilter.includes(item.payer);
            })
        }
        if (scheduledDateFilter.length > 0 && scheduledDateFilter[0] !== '') {
            let from = new Date(scheduledDateFilter[0]);
            let to = new Date(scheduledDateFilter[1]);

            data = data.filter((item) => {
                let scheduled = new Date(item.scheduled);
                return scheduled >= from && scheduled <= to;
            })
        }
        if(serviceFilter.length > 0) {
            data = data.filter((item) => {
                return serviceFilter.includes(item.services);
            })
        }
        setPage(1)
        setRowsPerPage(10)

        setRows(data);
    }

    const handleColumn = (item) => {

        if (columnFilter.includes(item)) {
            setColumnFilter((prev) => prev.filter((val) => val !== item))
        } else {
            setColumnFilter([...columnFilter, item])
        }
    }

    const handleApply = () => {
        setLoading(true);
        let newColumns = columns.map((val) => {
            if (val.field !== '' && val.field !== 'ID') {
                if (columnFilter.includes(val.field)) {
                    val.display = true;
                } else {
                    val.display = false;
                }
            }
            return val;
        })
        setDialog(false);
        setColumns(newColumns);
        setLoading(false);
    }

    const handleDefault = () => {
        setColumnFilter(['Created On', 'Payer', 'Status', 'Email', 'Payer Phone', 'Services', 'Scheduled']);
        setColumns(columns.map((val) => {
            val.display = true;
            return val;
        }));
        setDialog(false);
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


    return (
        <div className='m-4 bg-[#fff] p-4 rounded-md'>
            <h1 className='text-3xl font-bold'>Waitlist</h1>
            <div className='flex flex-col gap-1 sm:flex-row sm:gap-4 mt-5 flex-wrap '>
                <p className='border-2 flex-1 p-3 rounded-xl '>All Waitlist <span>100</span></p>
                <p className='border-2 flex-1 p-3 rounded-xl '>Newly Added <span>50</span></p>
                <p className='border-2 flex-1 p-3 rounded-xl '>Leads <span>20</span></p>
            </div>

            {/* filters */}
            <div className="filters flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between mt-4">
                <div className="filters">
                    <button  aria-label='filter' className='border-2 rounded-xl p-[6px] bg-slate-100 flex' onClick={() => { setFilterDialog(!filterDialog); setSearchClient('') }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel relative top-1 mr-2" viewBox="0 0 16 16">
                            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z" />
                        </svg>
                        Add Filters
                    </button>
                    <div className={`border-2 z-50 bg-[#fff] w-[100vw] h-[100vh] sm:w-auto sm:h-auto fixed top-0 left-0 sm:left-auto sm:top-auto shadow-lg sm:absolute ${filterDialog ? 'block' : 'hidden'}`}>
                        <Filter filterDialog={filterDialog} setFilterDialog={setFilterDialog} />
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
                        <input aria-label='Search by client name' className='pl-2 w-full border-none outline-none' type="text" placeholder='Search Client' value={searchClient} onChange={(event) => handleSearch(event.target.value)} />
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
                            <CustomSelectBar
                                openDialog={dialog}
                                setOpenDialog={setDialog}
                                heading={'Edit Column'}
                                subheading={'Select the column to rearrange'}
                                options={['Created On', 'Payer', 'Status', 'Email', 'Payer Phone', 'Services', 'Scheduled']}
                                handleColumn={handleColumn}
                                activeColumns={columnFilter}
                                handleApply={handleApply}
                                handleDefault={handleDefault}
                            />
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

            {/* table section */}
            <section className='flex'>
                {
                    !loading &&
                    <div className='w-[80vw] overflow-auto'>
                        <table aria-label='Waitlist' className='rounded-xl border-2 mt-3'>
                            <thead className='border-b-2 text-start'>
                                <tr>
                                    {
                                        columns.map((item) => {
                                            if (item.display) {
                                                return (
                                                    <th className={`text-start p-2 bg-slate-100 ${item.field === 'ID' && 'sticky left-0'}`}>
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
                                        let createDate = dateFormat(item.createdOn);
                                        let scheduledDate = dateFormat(item.scheduled);

                                        return (
                                            <tr className={`border-b-2 ${index % 2 === 0 && 'bg-slate-50'}`}>
                                                <td><MdCheckBoxOutlineBlank className='w-5 h-5 relative top-[2px] ml-2' /></td>
                                                <td className={`p-2 sticky left-0 ${index % 2 === 0 ? 'bg-slate-50' : 'bg-[#fff]'}`}>{item.id}</td>
                                                {columns[2].display && <td className='min-w-[300px]'>{createDate}</td>}
                                                {columns[3].display && <td className='min-w-[250px]'>{item.payer}</td>}
                                                {columns[4].display && <td className='min-w-[150px]'>
                                                    <div className={`flex gap-2 border-2 rounded-full w-[100px] pl-2 ${item.status === 'Inactive' && 'bg-[#e2e2e2]'} ${item.status === 'Lead' && 'bg-blue-100'} ${item.status === 'Active' && 'bg-green-300'}`}>
                                                        <GoDotFill className={`relative top-1 ${item.status === 'Inactive' && 'text-black'} ${item.status === 'Lead' && 'text-blue-400'} ${item.status === 'Active' && 'text-green-700'}`} />
                                                        <span className={` font-bold ${item.status === 'Inactive' && 'text-black'} ${item.status === 'Lead' && 'text-blue-400'} ${item.status === 'Active' && 'text-green-700'}`}>{item.status}</span>
                                                    </div>
                                                </td>}
                                                {columns[5].display && <td className='min-w-[250px]'>{item.email}</td>}
                                                {columns[6].display && <td className='min-w-[250px]'>{item.payerPhone}</td>}
                                                {columns[7].display && <td className='min-w-[250px]'>{item.services}</td>}
                                                {columns[8].display && <td className='min-w-[250px] pr-2'>{scheduledDate}</td>}
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                }
            </section>

            {/* Table Pagination section */}
            <div className='flex flex-col-reverse sm:flex-row justify-between'>
                <div className="rows mt-0 sm:mt-3">
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
                    <div className='p-[10px] mb-[10px] flex justify-start sm:justify-center'>
                        <span onClick={() => selectPageHandler(page - 1)} className='border-2 p-1 sm:p-3 cursor-pointer'>Prev</span>
                        {
                            [...Array(Math.ceil(rows.length / rowsPerPage))].map((_, i) => {
                                if (i === (page - 1) - 1 || i === (page - 1) || i === (page - 1) + 1) {
                                    return <span key={i} className={`p-2 pl-4 pr-4 border-2 ${page === i + 1 ? 'bg-[#e2e2e2]' : ''}`}>
                                        {i + 1}
                                    </span>
                                }
                            })
                        }
                        <span onClick={() => selectPageHandler(page + 1)} className='border-2 p-1 sm:p-3 cursor-pointer'>Next</span>
                    </div>
                }
            </div>
        </div>
    )
}

export default DynamicTableUpgrade