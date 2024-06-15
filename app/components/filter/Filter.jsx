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
    <div className='h-[250px] w-[500px]'>
      <div className='flex h-[250px] w-[500px]'>
        <div className='flex'>
          <div className="left flex-1 flex flex-col text-start">
            <button onClick={() => setSelection(1)} className='text-start'>Scheduled Date</button>
            <button onClick={() => setSelection(2)} className='text-start'>People</button>
            <button onClick={() => setSelection(3)} className='text-start'>Services/Products</button>
          </div>
          <div className='border-r-2 ml-3 mr-3'></div>
        </div>
        <div className="right flex-6">
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