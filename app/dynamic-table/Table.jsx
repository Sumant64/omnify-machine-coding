"use client"
import React, { useEffect, useState } from 'react';
import mydata from '../../data/data.json';
import './style.css';

const columnData = {
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



    useEffect(() => {



    }, []);

    // const handleColumn = (item) => {
    //     setLoading(true);
    //     console.log(item);
    //     let newCols = columns;
    //     if (newCols.includes(item)) {
    //         let filterData = newCols.filter((col) => {
    //             return col !== item
    //         })
    //         setColumns(filterData)
    //     } else {
    //         newCols.push(item);
    //         setColumns(newCols)
    //     }
    //     setLoading(false)
    // }

    const handleColumn = (item) => {
        console.log(item)
        setLoading(true);
        let newCols = columns;
        if(newCols[item]){
            console.log('entered in true')
            setColumns({...columns, [item]: false})
        } else {
            setColumns({...columns, [item]: true})
        }

        setLoading(false);
    }

    const handleSearch = (event) => {
        setLoading(true);
        setSearchClient(event.target.value);
        if(event.target.value){
            console.log(event.target.value)
            let searchRows = mydata.filter((item) => {
                let regex = new RegExp(event.target.value, "i", "g")
                return item.payer.toString().match(regex)
            })
    
            console.log(searchRows)
            setRows([...searchRows])
            } else {
                setRows(mydata)
                }
                
                setLoading(false);
    }


    return (
        <div>
            <h1>Dynamic Table</h1>
            <input type="text" placeholder='Search Client' value={searchClient} onChange={(event) => handleSearch(event)} />
            <div style={{ position: 'relative' }}>
                <button onClick={() => setDialog(!dialog)}>Dynamic columns</button>
                <div className={`column__dialog ${dialog && 'active'}`}>
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
            {
                !loading && 
                    <table>
                        <thead>
                            <tr>
                                {
                                    Object.keys(columns).map((item) => {

                                        if(columns[item]){
                                        return (
                                            <th>{item}</th>
                                        )

                                        }

                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                rows.map((item) => {

                                    return (
                                        <tr>
                                            {columns['Created On'] && <td>{item.createdOn}</td>}
                                            {columns['Payer'] && <td>{item.payer}</td>}
                                            {columns['Status'] && <td>{item.status}</td>}
                                            {columns['Email'] && <td>{item.email}</td>}
                                            {columns['Services'] && <td>{item.services}</td>}
                                            {columns['Scheduled'] && <td>{item.scheduled}</td>}
                                            {columns['Payer Phone'] && <td>{item.payerPhone}</td>}
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
            }
        </div>
    )
}

export default Table