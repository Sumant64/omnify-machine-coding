import React from 'react';
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoCheckbox } from "react-icons/io5";

const CustomSelectBar = ({ openDialog, heading, subheading, options, handleColumn, activeColumns, handleApply, handleDefault }) => {
    return (
        <div className={`border-2 z-10 w-[320px]  overflow-auto bg-[#fff] shadow-lg absolute right-0 p-4 ${openDialog ? 'block' : 'hidden'}`}>
            <h2 className='text-xl font-bold'>{heading}</h2>
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