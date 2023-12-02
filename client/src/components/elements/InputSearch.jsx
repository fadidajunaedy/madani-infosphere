import { Link } from "react-router-dom"
import { 
    HiDocumentPlus 
} from "react-icons/hi2"
const InputSearch = ({
    title, 
    userData,
    category, 
    filterCategory, 
    filterText, 
    onFilter
}) => {
    return (
            <div className="w-full grid grid-cols-2 mb-6">
                <h2 className="text-2xl font-semibold text-left my-0" >{title}</h2>
                    {(
                        (userData.role === "super-admin" || userData.role === "admin" || userData.position === "Executive Director" || userData.position === "Deputy Director") || 
                        (userData.position === "HRGA" && (filterCategory === "weekly-update" || filterCategory === "sop-hrga" || filterCategory === "catatan-rapat")) || 
                        (userData.position === "Finance" && (filterCategory === "sop-keuangan" || filterCategory === "catatan-rapat")) || 
                        (userData.position === "Comms" && (filterCategory === "sop-komunikasi" || filterCategory === "siaran-pers" || filterCategory === "infografik" || filterCategory === "catatan-rapat" || filterCategory === "laporan-sosmed")) ||
                        ((userData.position === "Program Manager" || userData.position === "Biofuel" || userData.position === "Klima" || userData.position === "Green Development" || userData.position === "Komodo") && (filterCategory === "hutan-dan-iklim" || filterCategory === "komoditas-berkelanjutan" || filterCategory === "pembangunan-hijau" || filterCategory === "bioenergi" || filterCategory === "catatan-rapat")) ||
                        (userData.position === "Knowledge Management" && (filterCategory === "rencana-strategis" || filterCategory === "publikasi-internal" || filterCategory === "materi-literasi" || filterCategory === "peraturan-dan-regulasi" || filterCategory === "db-tabular" || filterCategory === "db-spasial" || filterCategory === "media-monitoring" || filterCategory === "catatan-rapat"))
                    ) && (  
                        <div className="flex justify-end items-center gap-4 mb-4">
                            <Link to={`/create-report?category=${category}&subcategory=${filterCategory}`} className="btn btn-primary rounded-lg"><HiDocumentPlus />Tambah Data</Link>
                        </div>
                    )}
                <input 
                    type="text"
                    placeholder="Filter..."
                    className="input input-bordered w-full max-w-lg col-start-2"
                    value={filterText}
                    onChange={onFilter}
                />
            </div>

    )
}

export default InputSearch