import React from 'react';
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoCheckbox } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";


const CustomSelectBar = ({ openDialog, setOpenDialog, heading, subheading, options, handleColumn, activeColumns, handleApply, handleDefault }) => {
    return (
        <div className={`border-2 z-10 w-[100vw] h-[100vh] fixed top-0 left-0 sm:absolute sm:w-[320px] sm:left-auto sm:top-auto sm:right-0 sm:h-[auto] overflow-auto bg-[#fff] shadow-lg  p-4 ${openDialog ? 'block' : 'hidden'} `}>
            <div className='flex justify-between'>
                <h2 className='text-xl font-bold'>{heading}</h2>
                <IoIosCloseCircle className='w-7 h-7 relative top-[2px] ml-2 sm:hidden' onClick={() => setOpenDialog(!openDialog)} />
            </div>
            <p className='mb-3'>{subheading}</p>
            {
                options.map((item) => {
                    let active = activeColumns.includes(item)
                    return (
                        <div className='flex gap-2 pt-1'>
                            <div className="check relative top-2">
                                {
                                    active ?
                                        <IoCheckbox className='w-5 h-5 relative top-[2px]' /> :
                                        <MdCheckBoxOutlineBlank className='w-5 h-5 relative top-[2px]' />
                                }
                            </div>
                            <div className='border-[1px] m-1 pl-3 cursor-pointer rounded-md p-1 w-[240px]' onClick={() => handleColumn(item)}>
                                {item}
                            </div>
                        </div>
                    )
                })
            }

            <div className='flex justify-around mt-3'>
                <button onClick={handleDefault} className='border-2 w-[45%] pt-1 pb-1 text-sm rounded-md'>Resent to Default</button>
                <button onClick={handleApply} className='bg-black text-[#fff] w-[45%] pt-1 pb-1 text-sm rounded-md'>Apply</button>
            </div>
        </div>
    )
}

export default CustomSelectBar