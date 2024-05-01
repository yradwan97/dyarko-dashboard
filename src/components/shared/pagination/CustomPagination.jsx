import React, { useState } from 'react'
import Pagination from "react-js-pagination";
import {BiChevronLeft, BiChevronRight} from 'react-icons/bi'
function CustomPagination() {
    const [activePage, setActivePage] = useState(1)
    const handlePage = (pageNumber) => {
        setActivePage(pageNumber)
    }
  return (
    <div>
        <Pagination
          innerClass="flex justify-center items-center mt-10 gap-x-4"
          itemClass="page-item w-8 h-8 bg-white text-sm text-gray-500 shadow rounded-full flex justify-center items-center cursor-pointer"
          activeClass="!bg-main-600 !text-white"
          itemClassPrev="!bg-inherit !shadow-inherit"
          prevPageText={<BiChevronLeft className='text-main-600 text-xl'/>}
          itemClassNext="!bg-inherit !shadow-inherit"
          nextPageText={<BiChevronRight className='text-main-600 text-xl'/>}
          hideFirstLastPages={true}
          activePage={activePage}
          itemsCountPerPage={10}
          totalItemsCount={100}
          pageRangeDisplayed={3}
          onChange={handlePage}
        />
      </div>
  )
}

export default CustomPagination