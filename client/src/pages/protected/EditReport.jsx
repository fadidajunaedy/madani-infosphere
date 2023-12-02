import { useContext, useEffect, useState } from "react"
import SelectCategory from "../../components/elements/SelectCategory"
import SelectSubCategory from "../../components/elements/SelectSubCategory"
import SelectTags from "../../components/elements/SelectTags"
import { getReport, updateReport } from "../../services/ReportServices"
import Alert from "../../components/elements/Alert"
import { useAlert } from "../../context/AlertContext"
import { AuthContext } from "../../context/AuthContext"
import { useNavigate, useParams } from "react-router-dom"
import ButtonBack from "../../components/elements/ButtonBack"
import ButtonSubmit from "../../components/elements/ButtonSubmit"

const EditReport = () => {
    const [loading, setLoading] = useState(false)

    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [subCategory, setSubCategory] = useState("")
    const [description, setDescription] = useState("")
    const [tags, setTags] = useState([])
    const [file, setFile] = useState(null)
    const [currentFile, setCurrentFile] = useState("")
    const [relatedProgram, setRelatedProgram] = useState("")
    const [currentLinkFile, setCurrentLinkFile] = useState("")
    const [linkFile, setLinkFile] = useState("")
    const [year, setYear] = useState("")
    const [createdUser, setCreatedUser] = useState("")

    const [fileType, setFileType] = useState("file")
    const [fileError, setFileError] = useState(null)

    const { showErrorAlert, showSuccessAlert } = useAlert()
    const { userData } = useContext(AuthContext)

    const navigate = useNavigate()

    const { id } = useParams()

    useEffect(() => {
        window.scrollTo({ top: 0 })
        getReport(id, data => {
            setTitle(data.title)
            setCategory(data.category)
            setSubCategory(data.subcategory)
            setDescription(data.description)
            setTags(data.tags)
            setYear(data.year)
            setCreatedUser(data.createdUser)
            setFile(data.file)
            setCurrentFile(data.file)
            setLinkFile(data.linkFile)
            setCurrentLinkFile(data.linkFile)
            setRelatedProgram(data.relatedProgram)
        })
    }, [])

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
    
        const allowedFileTypes = ['txt', 'md', 'docx', 'doc', 'png', 'jpg', 'jpeg', 'gif', 'ppt', 'pptx', 'pdf', 'csv', 'xls', 'xlsx']
        const uploadedFileType = selectedFile.name.split('.').pop()
    
        if (!allowedFileTypes.includes(uploadedFileType)) {
            setFile(null)
            setFileError('Tipe file tidak valid. Hanya file dengan tipe ' + allowedFileTypes.join(', ') + ' diperbolehkan.')
        } else {
            const maxSizeInBytes = 20 * 1024 * 1024; // batasan ukuran: 20MB
            if (selectedFile.size > maxSizeInBytes) {
                setFile(null)
                setFileError('Ukuran file terlalu besar. Maksimal ukuran yang diizinkan adalah 20MB.')
            } else {
                setFile(selectedFile)
                setFileError(null)
            }
        }
    }

    const handleUpdateReport = async (e) => {
        e.preventDefault()
        setLoading(true)

        const data = {
            id: id,
            title: title,
            category: category,
            subcategory: subCategory,
            description: description,
            tags: tags,
            file: file,
            linkFile: linkFile,
            relatedProgram: relatedProgram,
            year: year,
            createdUser: createdUser,
        }

        try {
            const response = await updateReport(id, data)
            setLoading(false)
            if (response) {
                showSuccessAlert(response.message)
                navigate(`/${subCategory}`)
            }
        } catch (error) {
            setLoading(false)
            showErrorAlert(error.message)
            window.scrollTo({ top: 0 })
        }
    }

    return (
        <div className="grid lg:grid-cols-4 gap-2 prose-lg">
            <div data-aos="fade-right" className="col-span-4 mb-4 lg:col-span-1 w-full">
                <h1 className="text-2xl font-semibold mb-4">Edit Data</h1>
                <p className="lead">Edit Data berdasarkan Kategori dan Tag</p>
            </div>
            <form data-aos="fade-up" onSubmit={handleUpdateReport} className="col-span-4 lg:col-span-3 w-full card bg-base-100 py-4 px-6 shadow-lg">
               <Alert />
                
                {/* <SelectCategory  handleChangeOption={(e) => setCategory(e.target.value)} valueEdit={category} position={userData.position} role={userData.role} />
                <SelectSubCategory handleChangeOption={(e) => setSubCategory(e.target.value)} valueEdit={subCategory} position={userData.position} role={userData.role} category={category}/> */}
                <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center my-4">
                    <label className="label">
                        <span className="label-text font-bold">Judul</span>
                    </label>
                    <input type="text" className="input input-bordered w-full md:max-w-md" onChange={(e) => setTitle(e.target.value)}  value={title} required/>
                </div>
                <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center my-4">
                    <label className="label">
                        <span className="label-text font-bold">Deskripsi</span>
                    </label>
                    <textarea className="textarea textarea-bordered w-full md:max-w-md" onChange={(e) => setDescription(e.target.value)} value={description} required></textarea>
                </div>
                <div className="w-full flex flex-col md:flex-row justify-between md:items-center my-4">
                    <label className="label">
                        <span className="label-text font-bold">Tags</span>
                    </label>
                    <SelectTags handleChangeOption={(e) => {
                        const selectedTags = e.map(option => option.value);
                        setTags(selectedTags)
                        console.log(selectedTags)
                    }} valueEdit={tags}/>
                </div>
                
                {(subCategory === "peraturan-dan-regulasi" || subCategory === "db-tabular" || subCategory === "db-spasial") && (
                <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center my-4">
                    <label className="label">
                        <span className="label-text font-bold">Program Terkait</span>
                    </label>
                    <select className="select select-bordered w-full md:max-w-md" onChange={(e) => setRelatedProgram(e.target.value)} value={relatedProgram} required>
                        <option value="">Select Related Program</option>
                        <option value="hutan-dan-iklim">Hutan dan Iklim</option>
                        <option value="komoditas-berkelanjutan">Komoditas Berkelanjutan</option>
                        <option value="pembangunan-hijau">Pembangunan Hijau</option>
                        <option value="bioenergi">Bioenergi</option>
                    </select>
                </div>
                )}
    
               
                <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center my-4">
                    <label className="label">
                        <span className="label-text font-bold">File / LinkFile</span>
                    </label>
                
                        {currentFile && (
                        <div className="w-full lg:max-w-md flex flex-col gap-4">
                            <label className="label">
                                <span className="label-text">{currentFile}</span>
                            </label>
                            <div className="w-full flex items-center gap-4">
                                <input 
                                type="file"
                                className="file-input file-input-bordered w-full"
                                accept=".txt, .md, .docx, .doc, .png, .jpg, .jpeg, .gif, .ppt, .pptx, .pdf, .csv, .xls, .xlsx"
                                onChange={handleFileChange}/>
                            </div>
                            {fileError && (
                            <div className="w-full text-left text-red-500 text-xs italic py-1">
                                {fileError}
                            </div>
                            )}
                        </div>
                        )}

                        {currentLinkFile && (
                        <div className="w-full lg:max-w-md flex flex-col gap-4">
                            <label className="label">
                                <a className="label-text link">{currentLinkFile.substring(0, 20) + (currentLinkFile.length > 20 ? "..." : "")}</a>
                            </label>
                            <div className="w-full flex items-center gap-4">
                                <input type="url" className="input input-bordered w-full"  
                                onChange={(e) => setLinkFile(e.target.value)} value={linkFile} required/>
                            </div>
                        </div>
                        )}
                </div>
                {subCategory !== "peraturan-dan-regulasi" && (
                <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center my-4">
                    <label className="label">
                        <span className="label-text font-bold">Tahun</span>
                    </label>
                    <select className="select select-bordered w-full md:max-w-md" onChange={(e) => setYear(e.target.value)} value={year} required>
                        <option value="">Pilih Tahun</option>
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                        <option value="2030">2030</option>
                        <option value="2031">2031</option>
                        <option value="2032">2032</option>
                        <option value="2033">2033</option>
                    </select>
                </div>
                )}
                <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center my-4">
                    <label className="label">
                        <span className="label-text font-bold">Diupload Oleh</span>
                    </label>
                    <input type="text" className="input input-bordered w-full md:max-w-md" value={userData.username} required disabled/>
                </div>
                <div className="w-full flex justify-end gap-2 items-center my-4">
                    <ButtonBack marginButton="mb-0"/>
                    <ButtonSubmit type="submit" disabled={loading}>
                        {loading ? <span className="loading loading-spinner loading-xs"></span> : "Ubah"}
                    </ButtonSubmit>
                </div>
            </form>
        </div>
    )
}

export default EditReport