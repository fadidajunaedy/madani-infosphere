import { useContext, useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { 
    HiEye, 
    HiArrowDownTray,
    HiArrowTopRightOnSquare, 
    HiPencilSquare, 
    HiTrash, 
    HiDocumentPlus 
} from "react-icons/hi2"
import Pagination from "./Pagination"
import Alert from "../elements/Alert"
import { useModal } from "../../context/ModalContext"
import { useModalConfirm } from "../../context/ModalConfirmContext"
import { AuthContext } from "../../context/AuthContext"
import { CSVLink } from 'react-csv'
import ButtonLink from "../elements/ButtonLink"

const Reports = ({title, data, category, subcategory}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [dataPerPage, setDataPerPage] = useState(10)
    const [searchKeyword, setSearchKeyword] = useState("")
    const [filteredData, setFilteredData] = useState(data)
    const [isLoading, setIsLoading] = useState(true)
    const [sortColumn, setSortColumn] = useState(null); // Track the column being sorted
    const [sortOrder, setSortOrder] = useState("asc");
    const [isExporting, setIsExporting] = useState(false)

    const { showModal } = useModal()
    const { showModalConfirm } = useModalConfirm()
    const { userData } = useContext(AuthContext)

    useEffect(() => {
        const newData = data.filter((currData) => currData.title.toLowerCase().includes(searchKeyword.toLowerCase()))
        setFilteredData(newData)
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [searchKeyword, data])

    const handleDataPerPage = (e) => {
        const newDataPerPage = parseInt(e.target.value);
        setDataPerPage(newDataPerPage);

        const newCurrentPage = Math.ceil((indexOfFirstData + 1) / newDataPerPage)
        setCurrentPage(newCurrentPage)
    }

    const filteredDataReport = filteredData.filter(data => data.subcategory === subcategory)

    const indexOfLastData = currentPage * dataPerPage
    const indexOfFirstData = indexOfLastData - dataPerPage
    const currentData = filteredDataReport.slice(indexOfFirstData, indexOfLastData)

    const calculateRowNumber = (index) => {
        return index + 1 + (currentPage - 1) * dataPerPage
    }

    const paginateFront = () => {
        const remainingData = filteredDataReport.length - indexOfLastData;
        if (remainingData > 0) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
        }
    };
    
    const paginateBack = () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1;
            setCurrentPage(newPage);
        }
    };
    
    const handleSort = (column) => {
        if (column === sortColumn) {
          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
          setSortColumn(column);
          setSortOrder("asc");
        }
      };

    if (sortColumn === "tags") {
        currentData.sort((a, b) => {
            const tagsA = a.tags.join(', ').toLowerCase();
            const tagsB = b.tags.join(', ').toLowerCase();
            if (sortOrder === "asc") {
              return tagsA.localeCompare(tagsB);
            } else {
              return tagsB.localeCompare(tagsA);
            }
        });
    } else if (sortColumn) {
        currentData.sort((a, b) => {
            const valueA = a[sortColumn].toLowerCase();
            const valueB = b[sortColumn].toLowerCase();
            if (sortOrder === "asc") {
                return valueA.localeCompare(valueB);
            } else {
                return valueB.localeCompare(valueA);
            }
        })
    }

    // const prepareDataForCSV = (data) => {
    //     const csvData = data.filter(item => item.subcategory.includes(subcategory) ).map((item, index) => ({
    //       No: calculateRowNumber(index),
    //       Judul: item.title,
    //       Deskripsi: item.description,
    //       Tags: item.tags.join(', '),
    //       Tahun: item.year,
    //       File: item.file ? `https://api.madani-infosphere.id/files/${item.category}/${item.file} ` : item.linkFile, 
    //       'Diupload Oleh': item.createdUser,
    //     }))
    //     return csvData
    //   }

    // const handleExportToCSV = () => {
    //     setIsExporting(true);
    // } 

    return (
        <div data-aos="fade-up" className="w-full prose-lg overflow-x-auto card shadow-lg p-6 bg-base-100">
            <Alert />
            <div className="flex justify-between items-center my-2">
                <h2  className="text-2xl font-semibold">{title}</h2>
                <div className="flex justify-center items-center gap-4">
                    {/* {currentData.filter(currData => currData.subcategory === subcategory ).length > 0 && (
                        <CSVLink
                        data={prepareDataForCSV(currentData)}
                        filename={`${title}.csv`}
                        onClick={handleExportToCSV}
                        className="btn btn-secondary"
                        >
                            Export to CSV
                        </CSVLink>
                    )} */}
                    {(
                        (userData.role === "super-admin" || userData.role === "admin" || userData.position === "Executive Director" || userData.position === "Deputy Director") || 
                        (userData.position === "HRGA" && (subcategory === "weekly-update" || subcategory === "sop-hrga" || subcategory === "catatan-rapat-eksternal")) || 
                        (userData.position === "Finance" && (subcategory === "sop-keuangan" || subcategory === "catatan-rapat-eksternal")) || 
                        (userData.position === "Comms" && (subcategory === "sop-komunikasi" || subcategory === "siaran-pers" || subcategory === "infografik" || subcategory === "media-monitoring"  || subcategory === "catatan-rapat-eksternal" || subcategory === "asset-digital" || subcategory === "laporan-sosmed")) ||
                        ((userData.position === "Program Manager" || userData.position === "Biofuel" || userData.position === "Klima" || userData.position === "Green Development" || userData.position === "Komodo") && (subcategory === "hutan-dan-iklim" || subcategory === "komoditas-berkelanjutan" || subcategory === "pembangunan-hijau" || subcategory === "bioenergi" || subcategory === "publikasi-internal" || subcategory === "materi-literasi" || subcategory === "peraturan-dan-regulasi" || subcategory === "db-tabular" || subcategory === "db-spasial" || subcategory === "catatan-rapat-eksternal")) ||
                        (userData.position === "Knowledge Management" && (subcategory === "rencana-strategis" || subcategory === "publikasi-internal" || subcategory === "materi-literasi" || subcategory === "peraturan-dan-regulasi" || subcategory === "db-tabular" || subcategory === "db-spasial" || subcategory === "media-monitoring" || subcategory === "catatan-rapat-eksternal"))
                    ) && (  
                        <ButtonLink to={`/create-report?category=${category}&subcategory=${subcategory}`}>
                            <HiDocumentPlus /> Tambah Data
                        </ButtonLink>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row justify-between items-start sm:items-center text-sm my-2">
                <div className="flex items-center gap-2 sm:w-auto">
                    Tampilkan
                    <select className="select select-bordered w-full" value={dataPerPage} onChange={handleDataPerPage}>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                    Data
                </div>
                <div className="flex items-center w-full max-w-lg gap-2 ">
                    <input type="text" placeholder="Cari berdasarkan Judul..." className="input input-bordered w-full" 
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}/>
                </div>
            </div>
            <div className="divider my-1"></div>
            <div className="overflow-x-auto w-full">
                <table data-aos="fade" className="table w-full rounded-lg text-normal overflow-hidden">
                    <thead className="bg-base-200 h-16">
                        <tr>
                            <th className="text-left">No</th>
                            <th className="text-left cursor-pointer" onClick={() => handleSort("title")}>
                                Judul
                                {sortColumn === "title" && (
                                    <span className="ml-2">
                                    {sortOrder === "asc" ? "↑" : "↓"}
                                    </span>
                                )}
                            </th>
                            {subcategory !== "peraturan-dan-regulasi" && (
                            <th className="text-left cursor-pointer" onClick={() => handleSort("year")}>
                                Tahun
                                {sortColumn === "year" && (
                                <span className="ml-2">
                                    {sortOrder === "asc" ? "↑" : "↓"}
                                </span>
                                )}
                            </th>
                            )}
                            <th className="text-left cursor-pointer" onClick={() => handleSort("description")}>
                                Deskripsi
                                {sortColumn === "description" && (
                                <span className="ml-2">
                                    {sortOrder === "asc" ? "↑" : "↓"}
                                </span>
                                )}
                            </th>
                            <th className="text-left cursor-pointer" onClick={() => handleSort("tags")}>
                                Tags
                                {sortColumn === "tags" && (
                                <span className="ml-2">
                                    {sortOrder === "asc" ? "↑" : "↓"}
                                </span>
                                )}
                            </th>
                            {(subcategory === "peraturan-dan-regulasi" || subcategory === "db-tabular" || subcategory === "db-spasial") && (
                            <th className="text-left cursor-pointer" onClick={() => handleSort("relatedProgram")}>
                            Program Terkait
                            {sortColumn === "relatedProgram" && (
                            <span className="ml-2">
                                {sortOrder === "asc" ? "↑" : "↓"}
                            </span>
                            )}
                            </th>
                            )}
                            <th className="text-left cursor-pointer" onClick={() => handleSort("createdUser")}>
                            Diupload Oleh
                            {sortColumn === "createdUser" && (
                            <span className="ml-2">
                                {sortOrder === "asc" ? "↑" : "↓"}
                            </span>
                            )}
                            </th>
                            <th className="text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                        <tr>
                            <td colSpan={8} className="text-center">
                                <p>Memuat...</p>
                            </td>
                        </tr>
                        ) : currentData.length > 0 ? 
                        currentData.map((currData, index) => (
                        <tr key={index}>
                            <th>{calculateRowNumber(index)}</th>
                            <td>{currData.title.substring(0, 20) + (currData.title.length > 20 ? "..." : "")}</td>
                            {subcategory !== "peraturan-dan-regulasi" && (
                                <td>{currData.year}</td>
                            )}
                            <td>{currData.description.substring(0, 30) + (currData.description.length > 30 ? "..." : "")}</td>
                            {/* <td>{currData.subcategory}</td> */}

                            <td className="flex flex-wrap gap-2">
                                { currData.tags.length > 0 && currData.tags.map(tag => (
                                <span key={tag} className="bg-green-200 text-green-600 hover:bg-green-300 text-sm font-bold py-2 px-4 rounded-lg">{tag}</span>
                                ))}
                            </td>
                            {(subcategory === "peraturan-dan-regulasi" || subcategory === "db-tabular" || subcategory === "db-spasial") && (
                            <td>{currData.relatedProgram}</td>
                            )}
                            <td>{currData.createdUser}</td>
                            <td>
                                <div className="h-full flex justify-center items-center gap-4">
                                    <button onClick={() => showModal("REPORT", currData)}>
                                        <HiEye size={14} className="btn btn-square btn-ghost hover:text-blue-500 p-4"/>
                                    </button>
                                    {currData.file !== "" && (
                                        <a
                                        href={`https://api.madani-infosphere.id/download/${currData.category}/${currData.file}`}
                                        rel="noreferrer" target="_blank">
                                            <HiArrowDownTray size={14} className="btn btn-square btn-ghost hover:text-green-500 p-4"/>
                                        </a>
                                    )}
                                    {currData.linkFile !== "" && (
                                        <a
                                        href={currData.linkFile}
                                        rel="noreferrer" target="_blank">
                                            <HiArrowTopRightOnSquare size={14} className="btn btn-square btn-ghost hover:text-blue-500 p-4"/>
                                        </a>
                                    )}

                                    {(currData.createdUser === userData.username || userData.role === "admin" || userData.role === "super-admin") && (
                                        <>
                                        <Link to={`/edit/${currData.id}`}>
                                            <HiPencilSquare size={14} className="btn btn-square btn-ghost hover:text-yellow-500 p-4"/>
                                        </Link>
                                        <button onClick={() => showModalConfirm("REPORT", currData.id)}>
                                            <HiTrash size={14} className="btn btn-square btn-ghost hover:text-red-500 p-4"/>
                                        </button>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                        )) : (
                        <tr>
                            <td colSpan={8} className="text-center">
                                {(searchKeyword.length > 0 && currentData.length === 0) ? (
                                    <p>Data yang anda cari tidak ditemukan</p>

                                ) : (
                                    <p>Data <span className="font-semibold">{title}</span> masih kosong</p>
                                )}
                            </td>
                        </tr>
                        )}
                    </tbody>
                    <tfoot className="bg-base-200">
                        <tr>
                            <th colSpan={9}>
                                <Pagination
                                    dataPerPage={dataPerPage}
                                    totalData={filteredDataReport.length}
                                    paginateBack={paginateBack}
                                    paginateFront={paginateFront}
                                    currentPage={currentPage}/>
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default Reports