import React, { useState } from 'react';
import { IoLogoSlack } from "react-icons/io";
import { IoMenuOutline } from "react-icons/io5";
import { IoFileTrayOutline } from "react-icons/io5";
import { TbCopyCheck } from "react-icons/tb";
import { IoCalendarOutline } from "react-icons/io5";
import { CgSandClock } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { CiCircleQuestion } from "react-icons/ci";
import { LuLayoutDashboard } from "react-icons/lu";


const Sidebar = ({ toggle, setToggle }) => {


    return (
        <div className='pl-1 pr-1 h-[100vh] flex flex-col'>
            <div style={{ flexGrow: '1' }}>
                <div className='flex justify-between mt-4'>
                    <div className={`flex ${toggle ? 'block' : 'hidden'}`}>
                        <IoLogoSlack className='w-6 h-6 relative top-[2px]' />
                        <h1>Front-Desk</h1>
                    </div>
                    <IoMenuOutline onClick={() => setToggle(!toggle)} className='hidden sm:block w-8 h-8 relative top-[2px] ml-2' />
                </div>
                {/* Top Links */}
                <ul>
                    <li><a className={`flex gap-3 pt-2 pb-2 mt-2 mb-2 ${toggle ? 'ml-0' : 'ml-2'}`} href="#"><IoFileTrayOutline className={`w-6 h-6 relative top-[2px] ${toggle ? 'ml-0' : 'ml-2'}`} /> <span className={`${toggle ? 'block' : 'hidden'}`}>Order</span></a></li>
                    <li><a className={`flex gap-3 pt-2 pb-2 mt-2 mb-2 ${toggle ? 'ml-0' : 'ml-2'}`} href="#"><TbCopyCheck className={`w-6 h-6 relative top-[2px] ${toggle ? 'ml-0' : 'ml-2'}`} /> <span className={`${toggle ? 'block' : 'hidden'}`}>Subscription</span></a></li>
                    <li><a className={`flex gap-3 pt-2 pb-2 mt-2 mb-2 ${toggle ? 'ml-0' : 'ml-2'}`} href="#"><IoCalendarOutline className={`w-6 h-6 relative top-[2px] ${toggle ? 'ml-0' : 'ml-2'}`} /> <span className={`${toggle ? 'block' : 'hidden'}`}>Calendar</span></a></li>
                    <li><a className={`flex gap-3 pt-2 pb-2 mt-2 mb-2 ${toggle ? 'ml-0' : 'ml-2'} bg-[#fff] rounded-lg`} href="#"><CgSandClock className={`w-6 h-6 relative top-[2px] ${toggle ? 'ml-0' : 'ml-2'}`} /> <span className={`${toggle ? 'block' : 'hidden'}`}>Waitlist</span></a></li>
                </ul>
            </div>

            {/* Bottom Links */}
            <div className='relative bottom-0'>
                <ul>
                    <li><a className={`flex gap-3 justify-between pt-2 pb-2 mt-2 mb-2 ${toggle ? 'ml-0' : 'ml-2'}`} href="#">
                        <div className='flex gap-2'>
                            <LuLayoutDashboard className={`w-5 h-5 relative top-[2px] ${toggle ? 'ml-0' : 'hidden'}`} />
                            <span className={`${toggle ? 'block' : 'hidden'}`}>Dashboard</span>
                        </div>
                        <MdLogout className={`w-6 h-6 relative top-[2px] ${toggle ? 'mr-0' : 'mr-3'}`} />
                    </a></li>
                    <li><a className={`flex gap-3 pt-2 pb-2 mt-2 mb-2 bg-[#fff] rounded-lg ${toggle ? 'ml-0' : 'ml-2'}`} href="#"><img className='rounded-full w-10 h-10' src="https://cdn.pixabay.com/photo/2017/03/16/21/18/logo-2150297_640.png" alt="profile" /><span><div className={` ${toggle ? 'block' : 'hidden'}`}><p>Admin Name</p><p>adminname@mail.com</p></div></span></a></li>
                    <li><a className={`flex gap-3 pt-2 pb-2 mt-2 mb-2 ${toggle ? 'ml-0' : 'ml-2'}`} href="#"><CiCircleQuestion className={`w-6 h-6 relative ${toggle ? 'ml-0 top-4' : 'ml-2 top-[2px]'}`} /> <div className={` ${toggle ? 'block' : 'hidden'}`}><p>Help Center</p><p>@2024 Omnify.Inc</p></div></a></li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar