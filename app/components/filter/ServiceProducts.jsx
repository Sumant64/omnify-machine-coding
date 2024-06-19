import { searchService } from '@/service/search';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const ServiceProducts = ({selectedService, setSelectedService}) => {
  const [searchValue, setSearhValue] = useState('');
    const [searchList, setSearchList] = useState([]);
    const serviceFilter = useSelector((state) => state.filterReducer.filters.service);

    useEffect(() => {
       setSelectedService(serviceFilter)
    }, [])

    const handleChange = (e) => {
        setSearhValue(e.target.value);
        const res = searchService(e.target.value);
        setSearchList(res);
    }

    const handleRemove = (item) => {
        let filterData = selectedService.filter((val) => {
            return val !== item
        })
        setSelectedService(filterData)
    }

    const handleValueClick = (value) => {
        if(selectedService.includes(value)){
            let filterData = selectedService.filter((item) => {
                return item !== value;
            })

            setSelectedService(filterData)
        }else {
            setSelectedService([...selectedService, value])
        }
    }



  return (
    <>
      <div className='p-4'>
        <input value={searchValue} onChange={(e) => handleChange(e)} className='w-full p-2 rounded-md border-2 bg-gray-50' type="text" placeholder='Search Payer' />

        {/* Values */}
        <div>
          <div className="selected flex gap-2 mt-3 flex-wrap">
            {
              selectedService.map((item) => {
                return (
                  <div className='border-2 text-sm rounded-full pl-2 pr-2 flex '>
                    {item}
                    <div className='pl-2 cursor-pointer' onClick={() => handleRemove(item)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x relative top-[3px]" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                      </svg>
                    </div>
                  </div>
                )
              })
            }
          </div>

          {
            searchValue && searchList.map((item) => {
              let active = selectedService.includes(item);
              return (
                <div className='cursor-pointer m-2 flex' onClick={() => handleValueClick(item)}>
                  {
                    active ? '☑️' : '🔲'
                  }
                  <p>{item}</p>
                </div>
              )
            })
          }
        </div>

      </div>
    </>
  )
}

export default ServiceProducts