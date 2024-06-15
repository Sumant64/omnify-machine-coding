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
    let from = '';
    let to = '';
    setDateDropdown(option)
    switch(option) {
      case 'All':
        setScheduledDate({from: '', to: '', field: 'All'})
        break;
      case '30Days':
        to = new Date();
        from = new Date().setDate(to.getDate() - 30);
        from = new Date(from);
        setScheduledDate({from, to, field: '30Days'});
        break;
      case 'ThisMonth':
        from = new Date().setDate(1);
        from = new Date(from);
        to = new Date();
        setScheduledDate({from, to, field: 'ThisMonth'})
        break;
      case 'LastMonth':
        break;
      case 'ThisQuarter':
        break;
      case '2QuarterAgo':
        break;
      case 'ThisYear':
        let currentYr = new Date().getFullYear();
        to = new Date(`01-01-${currentYr}`)
        from = new Date(`12-31-${currentYr}`);
        setScheduledDate({from, to, field: 'ThisYear'});
        break;
      case 'LastYear':
        let yr = new Date().getFullYear() - 1;
        to = new Date(`01-01-${yr}`)
        from = new Date(`12-31-${yr}`);
        setScheduledDate({from, to, field: 'LastYear'})
        break;
    }
  }
  

  return (
    <div>
      <select value={dateDropdown} onChange={(event) => handleChange(event.target.value)}>
        <option value="All">All</option>
        <option value="30Days">Last 30 Days</option>
        <option value="ThisMonth">This month</option>
        <option value="LastMonth">Last month</option>
        <option value="ThisQuarter">This quarter</option>
        <option value="2QuarterAgo">2 quarter ago</option>
        <option value="ThisYear">This Year</option>
        <option value="LastYear">Last Year</option>
      </select>
    </div>
  )
}

export default ScheduledDate