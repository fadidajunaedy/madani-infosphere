import {  useEffect, useState } from "react"
import { useAlert } from "../../context/AlertContext"
import { getUser, updateUser } from "../../services/UserServices"
import ButtonBack from "../../components/elements/ButtonBack"
import ButtonSubmit from "../../components/elements/ButtonSubmit"
import Alert from "../../components/elements/Alert"
import { useParams } from "react-router-dom"
import { dataPosition } from "../../data/dataPosition"
import { useNavigate } from "react-router-dom"

const EditAdmin = () => {
    const [loading, setLoading] = useState(false)

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [position, setPosition] = useState("")
    const [isVerified, setIsVerified] = useState()
    const [status, setStatus] = useState()

    const { showErrorAlert, showSuccessAlert } = useAlert()

    const {id} = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        getUser(id, data => {
            setName(data.name)
            setUsername(data.username)
            setEmail(data.email)
            setPosition(data.position)
            setIsVerified(data.isVerified)
            setStatus(data.status)
        })
    }, [])

    const handleIsVerifiedChange = (value) => {
        setIsVerified(value)
        console.log(value)
    }

    const handleStatusChange = (value) => {
        setStatus(value)
    }

    const handleUpdateUser = async (e) => {
        e.preventDefault()
        setLoading(true)
        const data = {
            name: name,
            username: username,
            email: email,
            position: position,
            isVerified: isVerified,
            status: status
        }

        try {
            const response = await updateUser(id, data)
            if (response) {
                showSuccessAlert(response.message)
                setLoading(false)
                navigate("/admins")
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
                <h1 className="text-2xl font-bold mb-4">Ubah Data Admin</h1>
            </div>
            <form data-aos="fade-up" onSubmit={handleUpdateUser} className="col-span-4 lg:col-span-3 w-full card bg-base-100 py-4 px-6 shadow-lg">
               <Alert />
                <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center my-4">
                    <label className="label">
                        <span className="label-text font-bold">Nama</span>
                    </label>
                    <input type="text" className="input input-bordered w-full lg:max-w-md" onChange={(e) => setName(e.target.value)}  value={name} required/>
                </div>
                <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center my-4">
                    <label className="label">
                        <span className="label-text font-bold">Username</span>
                    </label>
                    <input type="text" className="input input-bordered w-full lg:max-w-md" onChange={(e) => setUsername(e.target.value)}  value={username} required disabled/>
                </div>
                <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center my-4">
                    <label className="label">
                        <span className="label-text font-bold">Email</span>
                    </label>
                    <input type="email" className="input input-bordered w-full lg:max-w-md" onChange={(e) => setEmail(e.target.value)}  value={email} required disabled/>
                </div>
                <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center my-4">
                    <label className="label">
                        <span className="label-text font-bold">Position</span>
                    </label>
                    <select className="input input-bordered w-full lg:max-w-md" onChange={(e) => setPosition(e.target.value)} value={position} required>
                        <option value="">Select a position</option>
                        {dataPosition.map((position, index) => (
                          <option key={index} value={ position }>{position}</option>
                        ))}
                    </select>
                </div>
                <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center my-4">
                    <label className="label">
                        <span className="label-text font-bold">Verifikasi</span>
                    </label>
                    <div className="w-full lg:max-w-md">
                    <label className="label cursor-pointer">
                        <span className="label-text">Valid</span> 
                        <input
                            type="radio"
                            name="isVerified"
                            className="radio checked:bg-green-500"
                            value={true}
                            checked={isVerified === true}
                            onChange={() => handleIsVerifiedChange(true)}
                        />
                    </label>
                    <label className="label cursor-pointer">
                        <span className="label-text">Invalid</span> 
                        <input
                            type="radio"
                            name="isVerified"
                            className="radio checked:bg-red-500"
                            value={false}
                            checked={isVerified === false}
                            onChange={() => handleIsVerifiedChange(false)}
                        />
                    </label>
                    </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center my-4">
                    <label className="label">
                        <span className="label-text font-bold">Status</span>
                    </label>
                    <div className="w-full lg:max-w-md">
                    <label className="label cursor-pointer">
                        <span className="label-text">Aktif</span> 
                        <input
                            type="radio"
                            name="status"
                            className="radio checked:bg-green-500"
                            value={true}
                            checked={status === true}
                            onChange={() => handleStatusChange(true)}
                        />
                    </label>
                    <label className="label cursor-pointer">
                        <span className="label-text">Non-Aktif</span> 
                        <input
                            type="radio"
                            name="status"
                            className="radio checked:bg-red-500"
                            value={false}
                            checked={status === false}
                            onChange={() => handleStatusChange(false)}
                        />
                    </label>
                    </div>
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

export default EditAdmin