import React, { useEffect, useState } from 'react'
import ScheduledDate from './ScheduledDate';
import People from './People';
import ServiceProducts from './ServiceProducts';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllFilters, updateFilters } from '@/redux/actions/filterAction';

const Filter = () => {
  const [selection, setSelection] = useState(1);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [scheduledDate, setScheduledDate] = useState({from: '', to: '', field: ''})
  const peopleFilter = useSelector((state) => state.filterReducer.filters.people);
  const dispatch = useDispatch();



  useEffect(() => {
    setSelectedPeople(peopleFilter)
  }, [])

  const getActiveFilter = () => {
    switch(selection){
      case 1:
        return <ScheduledDate scheduledDate={scheduledDate} setScheduledDate={setScheduledDate} />
      case 2:
        return <People selectedPeople={selectedPeople} setSelectedPeople={setSelectedPeople} />
      case 3:
        return <ServiceProducts />
    }
  }

  const applyFilter = () => {
    let filterList = {
      people: selectedPeople,
      scheduledDate: [scheduledDate.from, scheduledDate.to, scheduledDate.field]
    }

    dispatch(updateFilters(filterList))
  }

  const resetFilter = () => {
    dispatch(removeAllFilters());
    setSelectedPeople([]);
    setScheduledDate({from: '', to: '', field: ''});
  }

  return (
    <div className='h-[400px] w-[700px]'>
      <div className='flex h-[350px] w-[700px]'>
      {/* Left side */}
        <div className='w-[200px] bg-slate-50 p-3 border-r-2'>
          <div className="left flex flex-col text-start gap-2">
            <button onClick={() => setSelection(1)} className={`text-start rounded-lg p-2 ${selection === 1 && 'bg-gray-200'} transition-all duration-300`}>Scheduled Date</button>
            <button onClick={() => setSelection(2)} className={`text-start rounded-lg p-2 ${selection === 2 && 'bg-gray-200'} transition-all duration-300`}>People {peopleFilter.length > 0 && peopleFilter.length}</button>
            <button onClick={() => setSelection(3)} className={`text-start rounded-lg p-2 ${selection === 3 && 'bg-gray-200'} transition-all duration-300`}>Services/Products</button>
          </div>
        </div>
        {/* right side */}
        <div className="right w-[500px] overflow-auto">
          {getActiveFilter()}
        </div>
      </div>

      {/* footer */}
      <div className="footer border-t-2 flex justify-end">
        <div className=''>
          <button onClick={() => resetFilter()} className='border-2 p-1 pl-4 pr-4 rounded-md'>Reset to Default</button>
          <button onClick={() => applyFilter()} className='border-2 p-1 pl-4 pr-4 bg-black text-white ml-3 rounded-md'>Apply</button>
        </div>
      </div>
    </div>
  )
}

export default Filter