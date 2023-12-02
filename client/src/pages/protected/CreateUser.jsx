import {  useState } from "react"
import { useAlert } from "../../context/AlertContext"
import { HiEye, HiEyeSlash } from "react-icons/hi2"
import { register } from "../../services/AuthServices"
import ButtonBack from "../../components/elements/ButtonBack"
import ButtonReset from "../../components/elements/ButtonReset"
import ButtonSubmit from "../../components/elements/ButtonSubmit"
import Alert from "../../components/elements/Alert"
import { dataPosition } from "../../data/dataPosition"
import { useNavigate } from "react-router-dom"

const CreateUser = () => {
    const [loading, setLoading] = useState(false)

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [position, setPosition] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isVerified, setIsVerified] = useState(false)
    const [status, setStatus] = useState(false)
    
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")
    const { showErrorAlert, showSuccessAlert } = useAlert()

    const navigate = useNavigate()

    const handleResetForm = () => {
        setName("")
        setUsername("")
        setEmail("")
        setPosition("")
        setPassword("")
        setConfirmPassword("")
        setIsVerified(false)
        setStatus(false)
        setPasswordError("")

        window.scrollTo({ top: 0 })
    }

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\]\{\}\\\|\;\:\'\"\,\<\.\>\/\?\~\`])(?=.{8,})/;
        return passwordRegex.test(password);
    }

    const handleIsVerifiedChange = (value) => {
        setIsVerified(value === "true")
    }

    const handleStatusChange = (value) => {
        setStatus(value === "true")
    }

    const handleSubmitUser = async (e) => {
        e.preventDefault()

        setLoading(true)
        if (!validatePassword(password)) {
            setPasswordError(
              "Password harus terdiri dari setidaknya 8 karakter, satu huruf besar, satu huruf kecil, satu angka, dan satu karakter khusus"
            )
            setLoading(false)
            return
        } else {
            setPasswordError("")
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError(
                "Password dan Konfirmasi Password harus sama"
            )
            setLoading(false)
            return
        } else {
            setConfirmPasswordError("")
        }

        const data = {
            name: name,
            username: username,
            email: email,
            position: position,
            password: password,
            isVerified: isVerified,
            status: status
        }

        try {
            const response = await register(data)
            if (response) {
                showSuccessAlert(response.message)
                setLoading(false)
                navigate("/users")
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
                <h1 className="text-2xl font-bold mb-4">Tambah User</h1>
            </div>
            <form data-aos="fade-up" onSubmit={handleSubmitUser} className="col-span-4 lg:col-span-3 w-full card bg-base-100 py-4 px-6 shadow-lg">
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
                    <input type="text" className="input input-bordered w-full lg:max-w-md" onChange={(e) => setUsername(e.target.value)}  value={username} required />
                </div>
                <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center my-4">
                    <label className="label">
                        <span className="label-text font-bold">Email</span>
                    </label>
                    <input type="email" className="input input-bordered w-full lg:max-w-md" onChange={(e) => setEmail(e.target.value)}  value={email} required/>
                </div>
                <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center my-4">
                    <label className="label">
                        <span className="label-text font-bold">Jabatan</span>
                    </label>
                    <select className="input input-bordered w-full lg:max-w-md" onChange={(e) => setPosition(e.target.value)} value={position} required>
                        <option value="">Pilih Jabatan</option>
                        {dataPosition.map((position, index) => (
                          <option key={index} value={ position }>{position}</option>
                        ))}
                    </select>
                </div>
                <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center my-4">
                    <label className="label">
                        <span className="label-text font-bold">Password</span>
                    </label>
                    <div className="w-full lg:max-w-md flex flex-col items-center gap-4">
                        <div className="input-group mb-2">
                            <input type={showPassword ? "text" : "password"} className="w-full input input-bordered" onChange={(e) => setPassword(e.target.value)}  value={password} required/>
                            <button type="button" className="btn btn-square" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <HiEyeSlash size={18}/> : <HiEye size={18}/>}
                            </button>
                        </div>
                        {passwordError && (
                        <div className="text-red-500 text-xs italic py-1">{passwordError}</div>
                        )}
                    </div>
                </div>
                <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center my-4">
                    <label className="label">
                        <span className="label-text font-bold">Konfirmasi Password</span>
                    </label>
                    <div className="w-full lg:max-w-md flex flex-col items-start gap-4">
                        <div className="input-group mb-2">
                            <input type={showConfirmPassword ? "text" : "password"} className="w-full input input-bordered" onChange={(e) => setConfirmPassword(e.target.value)}  value={confirmPassword} required/>
                            <button type="button" className="btn btn-square" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? <HiEyeSlash size={18}/> : <HiEye size={18}/>}
                            </button>
                        </div>
                        {confirmPasswordError && (
                            <div className="text-red-500 text-xs italic py-1">{confirmPasswordError}</div>
                        )}
                    </div>
                </div>
                
                <div className="w-full flex flex-col lg:flex-row justify-between lg:items-center my-4">
                    <label className="label">
                        <span className="label-text font-bold">Verifikasi</span>
                    </label>
                    <div className="w-full lg:max-w-md">
                        <label className="label cursor-pointer">
                            <span className="label-text">Valid</span> 
                            <input type="radio" name="isVerified" className="radio checked:bg-green-500" value="true"
                            checked={isVerified === true}
                            onChange={(e) => handleIsVerifiedChange(e.target.value)}/>
                        </label>
                        <label className="label cursor-pointer">
                            <span className="label-text">Invalid</span> 
                            <input type="radio" name="isVerified" className="radio checked:bg-red-500" value="false"
                            checked={isVerified === false}
                            onChange={(e) => handleIsVerifiedChange(e.target.value)} />
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
                            <input type="radio" name="status" className="radio checked:bg-green-500" value="true"
                            checked={status === true}
                            onChange={(e) => handleStatusChange(e.target.value)}/>
                        </label>
                        <label className="label cursor-pointer">
                            <span className="label-text">Non-Aktif</span> 
                            <input type="radio" name="status" className="radio checked:bg-red-500" value="false"
                            checked={status === false}
                            onChange={(e) => handleStatusChange(e.target.value)} />
                        </label>
                    </div>
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

export default CreateUser