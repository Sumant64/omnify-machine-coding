import React, { useState } from 'react'
import ScheduledDate from './ScheduledDate';
import People from './People';
import ServiceProducts from './ServiceProducts';

const Filter = () => {
  const [selection, setSelection] = useState(1);

  const getActiveFilter = () => {
    switch(selection){
      case 1:
        return <ScheduledDate />
      case 2:
        return <People />
      case 3:
        return <ServiceProducts />
    }
  }

  return (
    <div className='h-[350px] w-[700px]'>
      <div className='flex h-[350px] w-[700px]'>
      {/* Left side */}
        <div className='w-[200px] bg-slate-50 p-3 border-r-2'>
          <div className="left flex flex-col text-start gap-2">
            <button onClick={() => setSelection(1)} className={`text-start rounded-lg p-2 ${selection === 1 && 'bg-gray-200'} transition-all duration-300`}>Scheduled Date</button>
            <button onClick={() => setSelection(2)} className={`text-start rounded-lg p-2 ${selection === 2 && 'bg-gray-200'} transition-all duration-300`}>People</button>
            <button onClick={() => setSelection(3)} className={`text-start rounded-lg p-2 ${selection === 3 && 'bg-gray-200'} transition-all duration-300`}>Services/Products</button>
          </div>
        </div>
        {/* right side */}
        <div className="right w-[500px]">
          {getActiveFilter()}
        </div>
      </div>

      {/* footer */}
      <div className="footer">

      </div>
    </div>
  )
}

export default Filter