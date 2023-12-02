import {  useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { 
    HiCheck, 
    HiPencilSquare, 
    HiTrash, 
    HiDocumentPlus 
} from "react-icons/hi2"
import Pagination from "./Pagination"
import Alert from "../elements/Alert"
import { useModal } from "../../context/ModalContext"
import { useModalConfirm } from "../../context/ModalConfirmContext"
import { useAlert } from "../../context/AlertContext"
import { createTag, updateTag } from "../../services/TagService"
import ButtonSubmit from "../elements/ButtonSubmit"

const TagsTable = ({title, data}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [dataPerPage, setDataPerPage] = useState(10)
    const [searchKeyword, setSearchKeyword] = useState("")
    const [filteredData, setFilteredData] = useState(data)

    const [loading, setLoading] = useState(false) // loading for button
    const [isLoading, setIsLoading] = useState(true) // loading for load data
    const [sortColumn, setSortColumn] = useState(null)
    const [sortOrder, setSortOrder] = useState("asc")
    const [newTag, setNewTag] = useState("")
    const [editingTag, setEditingTag] = useState(null)
    const [editingTagIndex, setEditingTagIndex] = useState(null)

    const { showModalConfirm } = useModalConfirm()
    const { showErrorAlert, showSuccessAlert } = useAlert()

    useEffect(() => {
        setFilteredData(data.filter((currData) => currData.title.toLowerCase().includes(searchKeyword.toLowerCase()) ))
        setTimeout(() => {
            setIsLoading(false)
        }, 5000)
    }, [searchKeyword, data])

    const handleDataPerPage = (e) => {
        const newDataPerPage = parseInt(e.target.value)
        setDataPerPage(newDataPerPage)

        const newCurrentPage = Math.ceil((currentPage * dataPerPage) / newDataPerPage)
        setCurrentPage(newCurrentPage)
    }

    const indexOfLastData = currentPage * dataPerPage
    const indexOfFirstData = indexOfLastData - dataPerPage
    const currentData = filteredData.slice(indexOfFirstData, indexOfLastData)

    const calculateRowNumber = (index) => {
        return index + 1 + (currentPage - 1) * dataPerPage
    }

    const paginateFront = () => {
        const remainingData = data.length - indexOfLastData
        if (remainingData > 0) {
          setCurrentPage(currentPage + 1)
        }
    }
      
    const paginateBack = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1)
        }
    }

    const handleEditTag = (tag, index) => {
        setEditingTag(tag);
        setEditingTagIndex(index);
    }

    const handleEditInputChange = (e) => {
        const updatedTag = { ...editingTag, title: e.target.value };
        setEditingTag(updatedTag);
    }
      
    const handleSaveEdit = async (id) => {
        setLoading(true)
        const data = {
            title: editingTag.title
        }
        try {
            const response = await updateTag(id, data)
            if (response) {
                setLoading(false)
                showSuccessAlert(response.message)
                setEditingTag(null)
                setEditingTagIndex(null)
                window.scrollTo({ top: 0 })
            }
        } catch (error) {
            setLoading(false)
            showErrorAlert(error.message)
            window.scrollTo({ top: 0 })
        }
      }
      
      
    const handleAddTag = async (e) => {
        e.preventDefault()
        setLoading(true)

        const data = {
            title: newTag
        }

        try {
            const response = await createTag(data)
            if (response) {
                setNewTag("")
                setLoading(false)
                showSuccessAlert(response.message)
                window.scrollTo({ top: 0 })
            }
        } catch (error) {
            setLoading(false)
            showErrorAlert(error.message)
            window.scrollTo({ top: 0 })
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

    return (
        <div data-aos="fade-up" className="w-full prose-lg overflow-x-auto card shadow-lg p-6 bg-base-100">
            <Alert />
            <div className="flex justify-between items-center my-2">
                <h2  className="text-2xl font-semibold">{title}</h2>
                <form onSubmit={handleAddTag} className="flex items-center w-full max-w-lg gap-4">
                    <input 
                    type="text" 
                    className="input input-bordered w-full" 
                    placeholder="Masukkan nama tag..."
                    onChange={(e) => setNewTag(e.target.value)} 
                    value={newTag}
                    required/>
                    <ButtonSubmit disabled={loading}>
                        {loading ? <span className="loading loading-spinner loading-xs"></span> : "Tambah Tag"}
                    </ButtonSubmit>
                 </form>
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
                            <th className="text-left cursor-pointer" onClick={() => handleSort("title")}>
                                Nama Tag
                                {sortColumn === "title" && (
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
                            <td colSpan={6} className="text-center">
                                <p>Memuat...</p>
                            </td>
                        </tr>
                        ) : currentData.length > 0 ? 
                        currentData.map((currData, index) => (
                        <tr key={index}>
                            <th>{calculateRowNumber(index)}</th>
                            <td>
                            {editingTagIndex === index ? (
                            <input
                            type="text"
                            className="input input-bordered w-full max-w-sm"
                            placeholder="Type here"
                            value={editingTag.title}
                            onChange={(e) => handleEditInputChange(e)}
                            />
                            ) : (
                                <div className="w-full max-w-sm">
                                    {currData.title}
                                </div>
                            )}
                            </td>
                            <td>
                                <div className="h-full flex justify-center items-center gap-4">
                                    {editingTagIndex === index ? (
                                    <button onClick={() => handleSaveEdit(currData.id)} disabled={loading}>
                                        
                                        <HiCheck
                                        size={14}
                                        className="btn btn-square btn-ghost hover:text-accent p-4"
                                        />
                                    </button>
                                    ) : (
                                    <button onClick={() => handleEditTag(currData, index)}>
                                        <HiPencilSquare
                                        size={14}
                                        className="btn btn-square btn-ghost hover:text-yellow-500 p-4"
                                        />
                                    </button>
                                    )}
                                    <button>
                                    <HiTrash
                                        size={14}
                                        className="btn btn-square btn-ghost hover:text-red-500 p-4"
                                        onClick={() => showModalConfirm("TAG", currData.id)}
                                    />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        )) : (
                        <tr>
                            <td colSpan={6} className="text-center">
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
                            <th colSpan={6}>
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

export default TagsTable