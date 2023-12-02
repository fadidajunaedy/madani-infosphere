import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi2"

const Pagination = ({
    dataPerPage,
    totalData,
    paginateFront,
    paginateBack,
    currentPage,
  }) => {
  const startRange = (currentPage - 1) * dataPerPage + 1;
  const endRange = Math.min(currentPage * dataPerPage, totalData);
  return (
    <div className='py-2 flex justify-between items-center prose-lg'>
      <div>
        <p className='text-sm text-gray-700'>
          Menampilkan
          <span className='font-medium'>&nbsp;{startRange}&nbsp;</span>
          sampai
          <span className='font-medium'>&nbsp;{endRange}&nbsp;</span>
          dari
          <span className='font-medium'>&nbsp;{totalData}&nbsp;</span>
          Data
        </p>
      </div>
      <div className="join rounded-lg flex gap-2">
        <button className="join-item btn btn-square btn-ghost flex justify-center items-center" onClick={() => { paginateBack() }}><HiChevronDoubleLeft className="text-current"/></button>
        <button className="join-item btn btn-square btn-ghost flex justify-center items-center" onClick={() => { paginateFront() }}><HiChevronDoubleRight className="text-current"/></button>
      </div>
    </div>
  )
}

export default Pagination