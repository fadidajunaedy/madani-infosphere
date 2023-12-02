import { useEffect, useState } from "react";
import { HiEye, HiArrowDownTray, HiArrowTopRightOnSquare } from "react-icons/hi2"
import { getReports } from "../../services/ReportServices"
import moment from "moment"
import Hero2 from "../../images/hero-2.png"
import ButtonBack from "../../components/elements/ButtonBack"
import useQuery from "../../hooks/useQuery"
import { useModal } from "../../context/ModalContext";
import Modal from "../../components/modal"

const Reports = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]); // State for filtered data
    const query = useQuery();
    const keyword = query.get("keyword");
    // const keywordFilter = keyword ? keyword.toLowerCase() : "";

    const { showModal } = useModal();

    useEffect(() => {
        getReports((reports) => {
            setData(reports);
            setFilteredData(reports.filter((d) => 
                d.title.toLowerCase().includes(keyword.toLowerCase()) ||
                (Array.isArray(d.tags) && d.tags.join(' ').toLowerCase().includes(keyword.toLowerCase()))
            ))
        })
    }, [data, keyword])
    return (
        <div>
            <div data-aos="fade-left">
                <ButtonBack />
            </div>
            <div data-aos="fade-up" className="flex w-full rounded-lg shadow-lg bg-base-100 mb-4 overflow-hidden prose-none">
                <img src={Hero2} className="w-full h-full object-cover" alt="" srcSet="" />
            </div>
            <Modal />
            <div data-aos="fade-up" className="flex items-center flex-wrap gap-2 mb-4 prose-lg">
                Hasil dari keyword: <span className="italic font-semibold">{keyword}</span>
            </div>
            <div>
                {/* {query.get("name")} */}
            </div>
            <div data-aos="fade-up" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 prose-lg">
                {filteredData.length > 0 ?
                filteredData.map((d) => (
                <div key={d._id} className="card w-full bg-base-100 shadow-xl">       
                    <div className="flex flex-col justify-start items-start p-8 h-full">
                        <h2 className="text-slate-900 dark:text-white text-base font-semibold tracking-tight line-clamp-1">{d.title}</h2>
                        <div className="divider my-0"></div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-2">{d.createdUser}</p>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">{moment(d.createdAt).format('DD/MM/YYYY')}</p>
                        <div className="flex flex-wrap gap-2 text-sm mb-4">
                            {d.tags.length > 0 && d.tags.map((tag, index) => (
                                <span key={index} className="bg-green-200 text-green-600 w-fit hover:bg-green-300 font-bold py-1 px-2 rounded-lg">{tag}</span>
                            ))}
                        </div>
                        <div className="mt-auto w-full flex justify-end items-center gap-2">
                            <button onClick={() => showModal("REPORT", d)} className="btn btn-square  bg-blue-700 hover:bg-blue-500 p-2">
                                <HiEye className="text-white"/>
                            </button>
                            {d.file && (
                                <a 
                                href={`https://api.madani-infosphere.id/download/${d.category}/${d.file}`} 
                                rel="noreferrer" 
                                target="_blank" 
                                className="btn btn-square text-white bg-green-700 hover:bg-green-500 p-2">
                                    <HiArrowDownTray className="text-white"/>
                                </a>
                            )}

                            {d.linkFile && (
                                <a 
                                href={d.linkFile}
                                target="_blank" 
                                className="btn btn-square text-white bg-green-700 hover:bg-green-500 p-2" rel="noreferrer">
                                    <HiArrowTopRightOnSquare/>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
                )) : (
                    <div className="card w-full flex justify-center items-center col-span-4 bg-base-100 py-4  text-slate-400 ">Data yang anda cari tidak ditemukan</div>
                )}
                
            </div>
        </div>
    )
}

export default Reports