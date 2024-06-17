import { CiCalendar } from "react-icons/ci";
import { RxPerson } from "react-icons/rx";
import { RiRecordCircleLine } from "react-icons/ri";
import { HiOutlineHashtag } from "react-icons/hi";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

export const columnData = [
    {
        field: '',
        display: true,
        svg: <MdCheckBoxOutlineBlank className='w-5 h-5 relative top-[2px]' />
    },
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