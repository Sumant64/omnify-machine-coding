import React, { useEffect, useState } from 'react'
import ScheduledDate from './ScheduledDate';
import People from './People';
import ServiceProducts from './ServiceProducts';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllFilters, updateFilters } from '@/redux/actions/filterAction';
import { IoIosCloseCircle } from "react-icons/io";

const Filter = ({filterDialog, setFilterDialog}) => {
  const [selection, setSelection] = useState(1);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [scheduledDate, setScheduledDate] = useState({from: '', to: '', field: ''})
  const peopleFilter = useSelector((state) => state.filterReducer.filters.people);
  const serviceFilter = useSelector((state) => state.filterReducer.filters.service);
  const [selectedService, setSelectedService] = useState([]);
  const dispatch = useDispatch();



  useEffect(() => {
    setSelectedPeople(peopleFilter);
    setSelectedService(serviceFilter);
  }, [])

  const getActiveFilter = () => {
    switch(selection){
      case 1:
        // scheduled date filter
        return <ScheduledDate scheduledDate={scheduledDate} setScheduledDate={setScheduledDate} />
      case 2:
        // people filter
        return <People selectedPeople={selectedPeople} setSelectedPeople={setSelectedPeople} />
      case 3:
        // service filter
        return <ServiceProducts selectedService={selectedService} setSelectedService={setSelectedService} />
    }
  }

  const applyFilter = () => {
    let filterList = {
      people: selectedPeople,
      scheduledDate: [scheduledDate.from, scheduledDate.to, scheduledDate.field],
      service: selectedService
    }

    dispatch(updateFilters(filterList));
    setFilterDialog(false);
  }

  const resetFilter = () => {
    dispatch(removeAllFilters());
    setSelectedPeople([]);
    setScheduledDate({from: '', to: '', field: ''});
    setFilterDialog(false)
  }

  return (
    <div className='w-[100vw] h-[100vh] sm:h-[400px] sm:w-[700px]'>
      <div className='flex h-[350px] w-[700px]'>
      <IoIosCloseCircle className='w-7 h-7 fixed top-[3px] right-4 ml-2 sm:hidden' onClick={() => setFilterDialog(false)} />
      {/* Left side */}
        <div className='w-[25vw] sm:w-[200px] bg-slate-50 p-3 border-r-2'>
          <div className="left flex flex-col text-start gap-2">
            <button onClick={() => setSelection(1)} className={`text-start rounded-lg sm:p-2 ${selection === 1 && 'bg-gray-200'} transition-all duration-300`}>Scheduled Date</button>
            <button onClick={() => setSelection(2)} className={`text-start rounded-lg sm:p-2 ${selection === 2 && 'bg-gray-200'} transition-all duration-300`}>People {peopleFilter.length > 0 && peopleFilter.length}</button>
            <button onClick={() => setSelection(3)} className={`text-start rounded-lg sm:p-2 ${selection === 3 && 'bg-gray-200'} transition-all duration-300`}>Services {serviceFilter.length > 0 && serviceFilter.length}</button>
          </div>
        </div>
        {/* right side */}
        <div className="right w-[75vw] sm:w-[500px] overflow-auto">
          {getActiveFilter()}
        </div>
      </div>

      {/* footer */}
      <div className="footer border-t-2 flex justify-end p-2">
        <div className=''>
          <button onClick={() => resetFilter()} className='border-2 p-1 pl-4 pr-4 rounded-md'>Reset to Default</button>
          <button onClick={() => applyFilter()} className='border-2 p-1 pl-4 pr-4 bg-black text-white ml-3 rounded-md'>Apply</button>
        </div>
      </div>
    </div>
  )
}

export default Filter