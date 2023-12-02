import {  useEffect, useState, useContext } from "react"
import { Link } from 'react-router-dom'
import { 
    HiEye, 
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

const TableContacts = ({title, data}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [dataPerPage, setDataPerPage] = useState(10)
    const [searchKeyword, setSearchKeyword] = useState("")
    const [filteredData, setFilteredData] = useState(data)
    const [sortColumn, setSortColumn] = useState(null); // Track the column being sorted
    const [sortOrder, setSortOrder] = useState("asc");
    const [isExporting, setIsExporting] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const { showModal } = useModal()
    const { showModalConfirm } = useModalConfirm()

    const { userData } = useContext(AuthContext)

    useEffect(() => {
        setFilteredData(data.filter((currData) => 
            currData.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            currData.email.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            currData.city.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            currData.telephone.toString().includes(searchKeyword.toLowerCase())
        ))
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [searchKeyword, data])

    const handleDataPerPage = (e) => {
        const newDataPerPage = parseInt(e.target.value);
        setDataPerPage(newDataPerPage);

        const newCurrentPage = Math.ceil((indexOfFirstData + 1) / newDataPerPage); // Update the currentPage based on the current data shown
        setCurrentPage(newCurrentPage)
    }

    const indexOfLastData = currentPage * dataPerPage
    const indexOfFirstData = indexOfLastData - dataPerPage
    const currentData = filteredData.slice(indexOfFirstData, indexOfLastData)

    const calculateRowNumber = (index) => {
        return index + 1 + (currentPage - 1) * dataPerPage
    }

    const paginateFront = () => {
        const remainingData = filteredData.length - indexOfLastData;
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

    if (sortColumn) {
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
                    <ButtonLink to="/create-contact">
                        <HiDocumentPlus /> Tambah Data
                    </ButtonLink>
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
                            <th className="text-left cursor-pointer" onClick={() => handleSort("institution")}>
                                Institusi
                                {sortColumn === "institution" && (
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
                            <th className="text-left cursor-pointer" onClick={() => handleSort("email")}>
                                Email
                                {sortColumn === "email" && (
                                    <span className="ml-2">
                                    {sortOrder === "asc" ? "↑" : "↓"}
                                    </span>
                                )}
                            </th>
                            <th className="text-left cursor-pointer" onClick={() => handleSort("telephone")}>
                                Nomor Telephone
                                {sortColumn === "telephone" && (
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
                            <td colSpan={7} className="text-center">
                                <p>Memuat...</p>
                            </td>
                        </tr>
                        ) : currentData.length > 0 ? 
                        currentData.map((currData, index) => (
                        <tr key={index}>
                            <th>{calculateRowNumber(index)}</th>
                            <td>{currData.name}</td>
                            <td>{currData.institution}</td>
                            <td>{currData.position}</td>
                            <td>{currData.email}</td>
                            <td>{currData.telephone}</td>
                            <td>
                                <div className="h-full flex justify-center items-center gap-4">
                                    <button onClick={() => showModal("CONTACT", currData)}>
                                        <HiEye size={14} className="btn btn-square btn-ghost hover:text-blue-500 p-4"/>
                                    </button>
                                    {(userData.role === "admin" || userData.role === "super-admin") && (
                                    <>
                                    <Link to={`/edit-contact/${currData.id}`} disabled>
                                        <HiPencilSquare size={14} className="btn btn-square btn-ghost hover:text-yellow-500 p-4"/>
                                    </Link>
                                    <button onClick={() => showModalConfirm("CONTACT", currData.id)}>
                                        <HiTrash size={14} className="btn btn-square btn-ghost hover:text-red-500 p-4"/>
                                    </button>
                                    </>
                                    )}
                                </div>
                            </td>
                        </tr>
                        )) : (
                        <tr>
                            <td colSpan={7} className="text-center">
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
                            <th colSpan={7}>
                                <Pagination
                                    dataPerPage={dataPerPage}
                                    totalData={filteredData.length}
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

export default TableContacts