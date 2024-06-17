import React, { useState } from 'react'
import Sidebar from './Sidebar';
import { IoMenuOutline } from "react-icons/io5";


const MainLayout = (props) => {
    const [toggle, setToggle] = useState(false);


  return (
    <>
        <div className='block sm:hidden fixed top-5 right-0 pr-5' onClick={() => setToggle(!toggle)}><IoMenuOutline className='w-8 h-8 relative top-[2px] ml-2' /></div>
        <div style={{boxSizing: 'border-box'}} className='flex bg-slate-100'>
            <div className={`bg-slate-100 z-50 transition-all duration-500 absolute h-[100vh] sm:static sm:block overflow-hidden ${toggle ? 'w-[228px]' : 'w-[0px] sm:w-[64px]'}`}>
                <Sidebar toggle={toggle} setToggle={setToggle} />
            </div>
            <div style={{flex: '5'}}>
                {props.children}
            </div>
        </div>
    </>
  )
}

export default MainLayout