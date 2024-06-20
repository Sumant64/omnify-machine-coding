import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const ScheduledDate = ({ scheduledDate, setScheduledDate }) => {
  const [dateDropdown, setDateDropdown] = useState('');
  const [customDate, setCustomDate] = useState({ from: '', to: '' });
  const [isCustom, setIsCustom] = useState(false)
  const scheduledDateFilter = useSelector((state) => state.filterReducer.filters.scheduledDate);

  useEffect(() => {
    console.log(scheduledDateFilter)
    if (scheduledDateFilter.length > 0) {
      setDateDropdown(scheduledDateFilter[2]);
      setScheduledDate(scheduledDateFilter)
    } else {
      setDateDropdown('All')
    }
  }, [])

  const handleChange = (option) => {
    let from = '';
    let to = '';
    if (option !== 'Custom') {
      setIsCustom(false)
    }
    setDateDropdown(option)
    switch (option) {
      case 'All':
        setScheduledDate({ from: '', to: '', field: 'All' })
        break;
      case 'Custom':
        setIsCustom(true);
        break;
      case '30Days':
        to = new Date();
        from = new Date().setDate(to.getDate() - 30);
        from = new Date(from);
        setScheduledDate({ from, to, field: '30Days' });
        break;
      case 'ThisMonth':
        from = new Date().setDate(1);
        from = new Date(from);
        to = new Date();
        setScheduledDate({ from, to, field: 'ThisMonth' })
        break;
      case 'ThisYear':
        let currentYr = new Date().getFullYear();
        from = new Date(`01-01-${currentYr}`);
        to = new Date(`12-31-${currentYr}`);
        setScheduledDate({ from, to, field: 'ThisYear' });
        break;
      case 'LastYear':
        let yr = new Date().getFullYear() - 1;
        to = new Date(`01-01-${yr}`)
        from = new Date(`12-31-${yr}`);
        setScheduledDate({ from, to, field: 'LastYear' })
        break;
    }
  }


  return (
    <div className='m-3 ml-4 mr-4'>
      <h2>Show orders for</h2>
      <div className='flex justify-center mt-3'>
        <select className='border-2 w-[100%] p-2 rounded-lg shadow-sm' value={dateDropdown} onChange={(event) => handleChange(event.target.value)}>
          <option value="All">All</option>
          <option value="Custom">Custom</option>
          <option value="30Days">Last 30 Days</option>
          <option value="ThisMonth">This month</option>
          <option value="LastMonth">Last month</option>
          <option value="ThisQuarter">This quarter</option>
          <option value="2QuarterAgo">2 quarter ago</option>
          <option value="ThisYear">This Year</option>
          <option value="LastYear">Last Year</option>
        </select>

      </div>
      {isCustom && <div className="custom mt-6 flex">
        <div className='flex-1'>
          <h2>From</h2>
          <input className='border-2 w-[90%] p-2 rounded-lg shadow-sm' placeholder='From' type="date" value={customDate.from} onChange={(event) => {
            setCustomDate({ ...customDate, from: event.target.value });
            setScheduledDate({ from: event.target.value, to: customDate.to, field: 'Custom' })
          }} />
        </div>

        <div className='flex-1'>
          <h2>To</h2>
          <input className='border-2 w-[90%] p-2 rounded-lg shadow-sm' placeholder='To' type="date" value={customDate.to} onChange={(event) => {
            setCustomDate({ ...customDate, to: event.target.value });
            setScheduledDate({ from: customDate.from, to: event.target.value, field: 'Custom' })
          }} />
        </div>
      </div>}
    </div>
  )
}

export default ScheduledDate