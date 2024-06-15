import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const ScheduledDate = ({scheduledDate, setScheduledDate}) => {
  const [dateDropdown, setDateDropdown] = useState('');
  const scheduledDateFilter = useSelector((state) => state.filterReducer.filters.scheduledDate);

  useEffect(() => {
    console.log(scheduledDateFilter)
    if(scheduledDateFilter.length > 0) {
      setDateDropdown(scheduledDateFilter[2]);
      setScheduledDate(scheduledDateFilter)
    }else {
      setDateDropdown('All')
    }
  }, [])

  const handleChange = (option) => {
    setDateDropdown(option)
    console.log(option)
    switch(option) {
      case 'All':
        setScheduledDate({from: '', to: '', field: 'All'})
        break;
      case '30Days':

        break;
      case 'ThisMonth':
        let from = new Date().setDate(1);
        from = new Date(from);
        let to = new Date();
        setScheduledDate({from, to, field: 'ThisMonth'})
        break;
    }
  }
  

  return (
    <div>
      <select value={dateDropdown} onChange={(event) => handleChange(event.target.value)}>
        <option value="All">All</option>
        <option value="30Days">Last 30 Days</option>
        <option value="ThisMonth">This Month</option>
      </select>
    </div>
  )
}

export default ScheduledDate