import {  useState, useContext } from "react"
import { createContact } from "../../services/contactServices"
import ButtonBack from "../../components/elements/ButtonBack"
import ButtonSubmit from "../../components/elements/ButtonSubmit"
import ButtonReset from "../../components/elements/ButtonReset"
import Alert from "../../components/elements/Alert"
import { useAlert } from "../../context/AlertContext"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

const CreateContact = () => {
    const [loading, setLoading] = useState(false)

    const [name, setName] = useState("")
    const [institution, setInstitution] = useState("")
    const [email, setEmail] = useState("")
    const [city, setCity] = useState("")
    const [telephone, setTelephone] = useState("")
    const [position, setPosition] = useState("")
    const [category, setCategory] = useState("")
    const [classification, setClassification] = useState("")
    
    const { showErrorAlert, showSuccessAlert } = useAlert()
    const navigate = useNavigate()
    const { userData } = useContext(AuthContext)

    const handleResetForm = () => {
       setName("")
       setInstitution("")
       setEmail("")
       setCity("")
       setTelephone("")
       setPosition("")
       setCategory("")
       setClassification("")

        window.scrollTo({ top: 0 })
    }

    const handleSubmitReport = async (e) => {
        e.preventDefault()
        setLoading(true)

        const data = {
            name: name,
            institution: institution,
            email: email,
            city: city,
            telephone: telephone,
            position: position,
            category: category,
            classification: classification,
            createdUser: userData.username
        }

        try {
            const response = await createContact(data)
            if (response) {
                showSuccessAlert(response.message)
                setLoading(false)
                navigate("/direktori-kontak")
            }
        } catch (error) {
            showErrorAlert(error.message)
            setLoading(false)
            window.scrollTo({ top: 0 })
        }
    }
    
    return (
        <div className="grid lg:grid-cols-4 gap-2 prose-lg">
            <div data-aos="fade-right" className="col-span-4 mb-4 lg:col-span-1 w-full">
                <h1 className="text-2xl font-bold mb-4">Tambah Kontak</h1>
            </div>
            <form data-aos="fade-up" onSubmit={handleSubmitReport} className="col-span-4 lg:col-span-3 w-full card bg-base-100 py-4 px-6 shadow-lg">
               <Alert />
                <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center my-4">
                    <label className="label">
                        <span className="label-text font-bold">Nama</span>
                    </label>
                    <input type="text" className="input input-bordered w-full lg:max-w-md" onChange={(e) => setName(e.target.value)}  value={name} required/>
                </div>
                <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center my-4">
                    <label className="label">
                        <span className="label-text font-bold">Institusi</span>
                    </label>
                    <input type="text" className="input input-bordered w-full lg:max-w-md" onChange={(e) => setInstitution(e.target.value)}  value={institution} required/>
                </div>
                <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center my-4">
                    <label className="label">
                        <span className="label-text font-bold">Email</span>
                    </label>
                    <input type="email" className="input input-bordered w-full lg:max-w-md" onChange={(e) => setEmail(e.target.value)}  value={email} required/>
                </div>
                <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center my-4">
                    <label className="label">
                        <span className="label-text font-bold">Kota/Negara</span>
                    </label>
                    <input type="text" className="input input-bordered w-full lg:max-w-md" onChange={(e) => setCity(e.target.value)}  value={city} required/>
                </div>
                <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center my-4">
                    <label className="label">
                        <span className="label-text font-bold">Nomor Telephone</span>
                    </label>
                    <input type="number" className="input input-bordered w-full lg:max-w-md" onChange={(e) => setTelephone(e.target.value)}  value={telephone} required/>
                </div>
                <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center my-4">
                    <label className="label">
                        <span className="label-text font-bold">Jabatan</span>
                    </label>
                    <input type="text" className="input input-bordered w-full lg:max-w-md" onChange={(e) => setPosition(e.target.value)}  value={position} required/>
                </div>
                <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center my-4">
                    <label className="label">
                        <span className="label-text font-bold">Kategori</span>
                    </label>
                    <select className="select select-bordered w-full lg:max-w-md" onChange={(e) => setCategory(e.target.value)}  value={category} required>
                        <option value="">Pilih satu</option>
                        <option value="cso">CSO</option>
                        <option value="media">Media</option>
                        <option value="pemerintah-daerah">Pemerintah Daerah</option>
                        <option value="pemerintah-pusat">Pemerintah Pusat</option>
                        <option value="donor">Donor</option>
                        <option value="pemerintah-asing">Pemerintah Asing</option>
                        <option value="akademisi">Akademisi</option>
                        <option value="private-sector">Private Sector</option>
                        <option value="sobat-madani">Sobat Madani</option>
                    </select>
                </div>
                <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center my-4">
                    <label className="label">
                        <span className="label-text font-bold">Klasifikasi</span>
                    </label>
                    <input type="text" className="input input-bordered w-full lg:max-w-md" onChange={(e) => setClassification(e.target.value)}  value={classification} required/>
                </div>
                <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center my-4">
                    <label className="label">
                        <span className="label-text font-bold">Diupload oleh</span>
                    </label>
                    <input type="text" className="input input-bordered w-full lg:max-w-md"  value={userData.username} required disabled/>
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

export default CreateContact