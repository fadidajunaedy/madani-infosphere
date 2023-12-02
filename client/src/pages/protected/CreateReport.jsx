import { useContext, useState, useEffect, useRef } from "react"
// import SelectCategory from "../../components/elements/SelectCategory"
// import SelectSubCategory from "../../components/elements/SelectSubCategory"
import SelectTags from "../../components/elements/SelectTags"
import { createReport } from "../../services/ReportServices"
import ButtonBack from "../../components/elements/ButtonBack"
import ButtonReset from "../../components/elements/ButtonReset"
import ButtonSubmit from "../../components/elements/ButtonSubmit"
import Alert from "../../components/elements/Alert"
import { useAlert } from "../../context/AlertContext"
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import useQuery from "../../hooks/useQuery"
// import io from 'socket.io-client'

const CreateReport = () => {
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState("")
    // const [category, setCategory] = useState("")
    // const [subCategory, setSubCategory] = useState("")
    const [description, setDescription] = useState("")
    const [tags, setTags] = useState([])
    const [file, setFile] = useState("")
    const [relatedProgram, setRelatedProgram] = useState("")
    const [linkFile, setLinkFile] = useState("")
    const [year, setYear] = useState("")

    const inputFileRef = useRef(null);
    const [fileType, setFileType] = useState("file")
    const [fileError, setFileError] = useState(null)
    
    const { showErrorAlert, showSuccessAlert } = useAlert()
    const { userData } = useContext(AuthContext)

    const navigate = useNavigate()
    const query = useQuery()

    const category = query.get("category")
    const subcategory = query.get("subcategory")
    
    // const socket = io("http://localhost:4000")

    const handleResetForm = () => {
        setTitle("");
        // setCategory("");
        // setSubCategory("");
        setDescription("")
        setTags([]);
        setFile(null);
        setLinkFile("")
        setYear("");
        setRelatedProgram("")

        window.scrollTo({ top: 0 })
    }

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

    const handleSubmitReport = async (e) => {
        e.preventDefault()
        setLoading(true)

        const data = {
            title: title,
            category: category,
            subcategory: subcategory,
            description: description,
            tags: tags,
            file: file,
            linkFile: linkFile,
            relatedProgram: relatedProgram,
            year: year,
            createdUser: userData.username,
        }

        // const isEmpty = Object.entries(data).every(([key, val]) => {
        //     if (key === 'file' || key === 'linkFile') {
        //         return true; // Key 'file' atau 'linkFile' tidak perlu dicek di sini
        //     } else {
        //         if (val !== null && val !== undefined && val !== "") {
        //             return // Nilai lainnya tidak boleh kosong
        //         }
        //     }
        //     return true;
        // });
          
        // const isFileAndLinkFileEmpty = data.file == "" && data.linkFile == "";
          
        // if (isEmpty || isFileAndLinkFileEmpty) {
        //     setLoading(false)
        //     window.scrollTo({ top: 0 })
        //     return
        // }

        try {
            const response = await createReport(data)
            if (response) {
                showSuccessAlert(response.message)
                setLoading(false)
                navigate(`/${subcategory}`)
            }
            // socket.emit("createData", data)
        } catch (error) {
            showErrorAlert(error.message)
            setLoading(false)
            window.scrollTo({ top: 0 })
        }
    }
    
    return (
        <div className="grid lg:grid-cols-4 gap-2 prose-lg">
            <div data-aos="fade-right" className="col-span-4 mb-4 lg:col-span-1 w-full">
                <h1 className="text-2xl font-bold mb-4">Tambah Data</h1>
                <p className="lead">Tambahkan File berdasarkan Kategori dan Tags</p>
            </div>
            <form data-aos="fade-up" onSubmit={handleSubmitReport} className="col-span-4 lg:col-span-3 w-full card bg-base-100 py-4 px-6 shadow-lg">
               <Alert />
                {/* <SelectCategory  handleChangeOption={(e) => setCategory(e.target.value)} valueEdit={category} position={userData.position} role={userData.role} /> */}
                {/* <SelectSubCategory handleChangeOption={(e) => setSubCategory(e.target.value)} category={category}  position={userData.position} role={userData.role}/> */}
                <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center my-4">
                    <label className="label">
                        <span className="label-text font-bold">Judul File</span>
                    </label>
                    <input type="text" className="input input-bordered w-full lg:max-w-md" onChange={(e) => setTitle(e.target.value)}  value={title}required placeholder="Silahkan Masukan Judul File"/>
                </div>
                <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center my-4">
                    <label className="label">
                        <span className="label-text font-bold">Deskripsi</span>
                    </label>
                    <textarea className="textarea textarea-bordered w-full lg:max-w-md" onChange={(e) => setDescription(e.target.value)} value={description} placeholder="Silahkan Masukan Deskripsi"></textarea>
                </div>
                <div className="w-full flex flex-col lg:flex-row justify-between my-4">
                    <label className="label">
                        <span className="label-text font-bold">Tags</span>
                    </label>
                    <SelectTags handleChangeOption={(e) => {
                        const selectedTags = e.map(option => option.value);
                        setTags(selectedTags)
                        console.log(selectedTags)
                    }} valueEdit={tags} />
                </div>
                
                {(subcategory === "peraturan-dan-regulasi" || subcategory === "db-tabular" || subcategory === "db-spasial") && (
                <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center my-4">
                    <label className="label">
                        <span className="label-text font-bold">Program Terkait</span>
                    </label>
                    <select className="select select-bordered w-full lg:max-w-md" onChange={(e) => setRelatedProgram(e.target.value)} value={relatedProgram} required>
                        <option value="">Pilih Program Terkait</option>
                        <option value="hutan-dan-iklim">Hutan dan Iklim</option>
                        <option value="komoditas-berkelanjutan">Komoditas Berkelanjutan</option>
                        <option value="pembangunan-hijau">Pembangunan Hijau</option>
                        <option value="bioenergi">Bioenergi</option>
                    </select>
                </div>
                )}

                <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center my-4">
                    <label className="label">
                        <span className="label-text font-bold">File</span>
                    </label>
                    <div className="w-full lg:max-w-md flex flex-col items-center gap-4">
                        <div className="w-full flex items-center gap-4">
                            <input 
                            type="file"
                            accept=".txt, .md, .docx, .doc, .png, .jpg, .jpeg, .gif, .ppt, .pptx, .pdf, .csv, .xls, .xlsx"
                            className="file-input file-input-bordered w-full" 
                            ref={inputFileRef}
                            required={fileType === "file"}
                            disabled={fileType === "link"}
                            onChange={handleFileChange}/>
                            <input type="radio" name="file-input" className="radio"
                            checked={fileType === "file"}
                            onChange={() => {
                                setFileType("file")
                                setLinkFile("")
                            }}/>
                        </div>
                        {fileError && (
                        <div className="w-full text-left text-red-500 text-xs italic py-1">
                            {fileError}
                        </div>
                        )}
                    </div>
                </div>
                
                <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center my-4">
                    <label className="label">
                        <span className="label-text font-bold">Link File</span>
                    </label>
                    <div className="w-full lg:max-w-md flex items-center gap-2">
                        <input type="url" className="input input-bordered w-full" 
                        placeholder="https://" 
                        onChange={(e) => setLinkFile(e.target.value)} 
                        required={fileType === "link"}
                        disabled={fileType === "file"}
                        value={linkFile}/>
                        <input type="radio" name="file-input" className="radio"
                        checked={fileType === "link"}
                        onChange={() => {
                            setFileType("link")
                            setFile(null)
                            setFileError("")
                            inputFileRef.current.value = null;
                        }}/>
                    </div>
                </div>
                {subcategory !== "peraturan-dan-regulasi" && (
                <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center my-4">
                    <label className="label">
                        <span className="label-text font-bold">Tahun</span>
                    </label>
                    <select className="select select-bordered w-full lg:max-w-md" onChange={(e) => setYear(e.target.value)} value={year} required>
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
                        <span className="label-text font-bold">Di Upload Oleh</span>
                    </label>
                    <input type="text" className="input input-bordered w-full lg:max-w-md" value={userData.username} required disabled/>
                </div>
                <div className="w-full flex justify-end gap-2 items-center my-4">
                    <ButtonBack marginButton="mb-0"/>
                    <ButtonReset onClick={handleResetForm}>
                        Reset
                    </ButtonReset>
                    <ButtonSubmit type="submit" disabled={loading}>
                        {loading ? <span className="loading loading-spinner loading-xs"></span> : "Tambah"}
                    </ButtonSubmit>
                </div>
            </form>
        </div>
    )
}

export default CreateReport