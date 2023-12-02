import { 
    HiOutlineClipboardDocumentList,
    HiOutlineDocumentText,
    HiOutlineDocumentChartBar
 } from "react-icons/hi2"

const ProgramLink = () => {
    return (
        <div data-aos="fade-right" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <a href="https://madaniberkelanjutan.id" target='_blank' className=" md:col-start-3 flex justify-between items-center p-4 bg-[#E44B4A] rounded-lg drop-shadow-lg cursor-pointer" rel="noreferrer">
                <div className="text-xl text-white font-bold">Workplan</div>
                <div className="text-white flex items-center"><HiOutlineClipboardDocumentList size={32} className="mr-2"/></div>
            </a>
            <a href="https://madaniberkelanjutan.id" target='_blank' className="flex justify-between items-center p-4 bg-[#EFA83A] rounded-lg drop-shadow-lg cursor-pointer" rel="noreferrer">
                <div className="text-xl text-white font-bold">Proposal</div>
                <div className="text-white flex items-center"><HiOutlineDocumentText size={32} className="mr-2"/></div>
            </a>
            <a href="https://madaniberkelanjutan.id" target='_blank' className="flex justify-between items-center p-4 bg-[#0B6F64] rounded-lg drop-shadow-lg cursor-pointer" rel="noreferrer">
                <div className="text-xl text-white font-bold">Report</div>
                <div className="text-white flex items-center"><HiOutlineDocumentChartBar size={32} className="mr-2"/></div>
            </a>
        </div>
    )
}

export default ProgramLink