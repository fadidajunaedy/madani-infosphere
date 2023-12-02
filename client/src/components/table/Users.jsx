import {  useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { 
    HiEye, 
    HiPencilSquare, 
    HiTrash, 
    HiDocumentPlus 
} from "react-icons/hi2"
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai"
import Pagination from "./Pagination"
import Alert from "../elements/Alert"
import { useModalConfirm } from "../../context/ModalConfirmContext"
import { CSVLink } from 'react-csv'
import ButtonLink from "../elements/ButtonLink"

const TableUsers = ({title, data}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [dataPerPage, setDataPerPage] = useState(10)
    const [searchKeyword, setSearchKeyword] = useState("")
    const [filteredData, setFilteredData] = useState(data)
    const [sortColumn, setSortColumn] = useState(null); // Track the column being sorted
    const [sortOrder, setSortOrder] = useState("asc");
    const [isExporting, setIsExporting] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const { showModalConfirm } = useModalConfirm()

    useEffect(() => {
        setFilteredData(data.filter((currData) =>
            currData.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            currData.username.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            currData.email.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            currData.position.toLowerCase().includes(searchKeyword.toLowerCase())
        ))
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [searchKeyword, data])

    const handleDataPerPage = (e) => {
        const newDataPerPage = parseInt(e.target.value);
        setDataPerPage(newDataPerPage);
    
        const newCurrentPage = Math.ceil((currentPage * dataPerPage) / newDataPerPage);
        setCurrentPage(newCurrentPage);
    }

    const filteredDataUser = filteredData.filter(data => data.role === "user")

    const indexOfLastData = currentPage * dataPerPage
    const indexOfFirstData = indexOfLastData - dataPerPage
    const currentData = filteredDataUser.slice(indexOfFirstData, indexOfLastData)

    const calculateRowNumber = (index) => {
        return index + 1 + (currentPage - 1) * dataPerPage
    }

    const paginateFront = () => {
        const remainingData = filteredDataUser.length - indexOfLastData;
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
    }

    const handleSort = (column) => {
        if (column === sortColumn) {
          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
          setSortColumn(column);
          setSortOrder("asc");
        }
    }

    if (sortColumn === "isVerified") {
        currentData.sort((a, b) => {
            if (sortOrder === "asc") {
                return a.isVerified - b.isVerified
            } else {
                return b.isVerified - a.isVerified
            }
        })
    } else if (sortColumn) {
        currentData.sort((a, b) => {
            const valueA = a[sortColumn].toLowerCase()
            const valueB = b[sortColumn].toLowerCase()
            if (sortOrder === "asc") {
                return valueA.localeCompare(valueB)
            } else {
                return valueB.localeCompare(valueA)
            }
        })
    }

    // const prepareDataForCSV = (data) => {
    //     const csvData = data.map((item, index) => ({
    //       No: calculateRowNumber(index),
    //       Nama: item.name,
    //       Institusi: item.institutioni,
    //       Email: item.email,
    //       "Kota/Negara": item.city,
    //       "Nomor Telephone": item.telephone,
    //       Jabatan: item.position,
    //       Klasifikasi: item.classification,
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
                    {/* {data.length > 0 && (
                        <CSVLink
                        data={prepareDataForCSV(data)}
                        filename={`${title}.csv`}
                        onClick={handleExportToCSV}
                        className="btn btn-secondary"
                        >
                            Export to CSV
                        </CSVLink>
                    )} */}
                    <ButtonLink to="/create-user">
                        <HiDocumentPlus /> Tambah Data
                    </ButtonLink>
                </div>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row justify-between items-start sm:items-center text-sm my-2">
                <div className="flex items-center gap-2 sm:w-auto">
                    Menampilkan
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
                    <input type="text" placeholder="Cari..." className="input input-bordered w-full" 
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
                            <th className="text-left cursor-pointer" onClick={() => handleSort("name")}>
                                Nama
                                {sortColumn === "name" && (
                                    <span className="ml-2">
                                    {sortOrder === "asc" ? "↑" : "↓"}
                                    </span>
                                )}
                            </th>
                            <th className="text-left cursor-pointer" onClick={() => handleSort("username")}>
                                Username
                                {sortColumn === "username" && (
                                    <span className="ml-2">
                                    {sortOrder === "asc" ? "↑" : "↓"}
                                    </span>
                                )}
                            </th>
                            <th className="text-left cursor-pointer" onClick={() => handleSort("email")}>
                                Email
                                {sortColumn === "email" && (
                                    <span className="ml-2">
                                    {sortOrder === "asc" ? "↑" : "↓"}
                                    </span>
                                )}
                            </th>
                            <th className="text-left cursor-pointer" onClick={() => handleSort("position")}>
                                Jabatan
                                {sortColumn === "position" && (
                                    <span className="ml-2">
                                    {sortOrder === "asc" ? "↑" : "↓"}
                                    </span>
                                )}
                            </th>
                            <th className="text-center cursor-pointer" onClick={() => handleSort("isVerified")}>
                                Verifikasi
                                {sortColumn === "isVerified" && (
                                    <span className="ml-2">
                                    {sortOrder === "asc" ? "↑" : "↓"}
                                    </span>
                                )}
                            </th>
                            <th className="text-center cursor-pointer" onClick={() => handleSort("status")}>
                                Status
                                {sortColumn === "status" && (
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
                            <td>{currData.name}</td>
                            <td>{currData.username}</td>
                            <td>{currData.email}</td>
                            <td>{currData.position}</td>
                            <td>
                                {currData.isVerified ? (
                                    <span className="block bg-green-200 text-green-600 hover:bg-green-300 text-sm text-center font-bold py-2 px-4 mx-auto rounded-lg">Valid</span>
                                ) : (
                                    <span className="block bg-red-200 text-red-600 hover:bg-red-300 text-sm text-center font-bold py-2 px-4 mx-auto rounded-lg">Invalid</span>
                                )}
                            </td>
                            <td>
                                {currData.status ? (
                                    <span className="block bg-green-200 text-green-600 hover:bg-green-300 text-sm text-center font-bold py-2 px-4 mx-auto rounded-lg">Aktif</span>
                                ) : (
                                    <span className="block bg-red-200 text-red-600 hover:bg-red-300 text-sm text-center font-bold py-2 px-4 mx-auto rounded-lg">Non-Aktif</span>
                                )}
                            </td>
                            <td>
                                <div className="h-full flex justify-center items-center gap-4">
                                   <Link to={`/edit-user/${currData.id}`} disabled>
                                        <HiPencilSquare size={14} className="btn btn-square btn-ghost hover:text-yellow-500 p-4"/>
                                    </Link>
                                    <button onClick={() => showModalConfirm("USER", currData.id)}>
                                        <HiTrash size={14} className="btn btn-square btn-ghost hover:text-red-500 p-4"/>
                                    </button>
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
                            <th colSpan={8}>
                                <Pagination
                                    dataPerPage={dataPerPage}
                                    totalData={filteredDataUser.length}
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

export default TableUsers