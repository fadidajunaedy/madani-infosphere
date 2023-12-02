import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { updateProfile, changePassword, getUserLogin } from "../../services/AuthServices"
import { useAlert } from "../../context/AlertContext"
import Alert from "../../components/elements/Alert"
import { HiEye, HiEyeSlash } from "react-icons/hi2"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as yup from "yup"
import ButtonBack from "../../components/elements/ButtonBack"
import ButtonSubmit from "../../components/elements/ButtonSubmit"
import { dataPosition } from "../../data/dataPosition"

const Profile = () => {
    const [loading, setLoading] = useState(false)

    const { userData } = useContext(AuthContext)

    const [name, setName] = useState(userData.name)
    const [username, setUsername] = useState(userData.username)
    const [email, setEmail] =useState(userData.email)
    const [position, setPosition] = useState(userData.position)
    const [role, setRole] = useState(userData.role)

    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const { showSuccessAlert, showErrorAlert } = useAlert()

    const handleGetProfile = async () => {
        try {
            const response = await getUserLogin()
            setName(response.name)
            setUsername(response.username)
            setEmail(response.email)
            setPosition(response.position)
            setRole(response.role)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        handleGetProfile()
    }, [userData])

    const handleUpdateProfile = async (e) => {
        e.preventDefault()
        setLoading(true)

        const data = {
            name: name,
            username: username,
            email: email,
            position: position,
            role: role
        }

        try {
            const response = await updateProfile(data)
            if (response.message) {
                showSuccessAlert(response.message)
                window.scrollTo({ top: 0 })
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            showErrorAlert(error.message)
            setLoading(false)

        }
    }

    return (
        <div data-aos="fade-up" className="prose-lg">
            <div className="card w-full bg-base-100 py-4 px-6 shadow-lg">
                <Alert />
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Profile</h2>
                    <ButtonBack />
                </div>
                <div className="divider my-1"></div>
                <form onSubmit={handleUpdateProfile}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Name</span>
                            </label>
                            <input type="text" className="input input-bordered w-full" onChange={(e) => setName(e.target.value)} value={name} required/>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Username</span>
                            </label>
                            <input type="text" className="input input-bordered w-full" onChange={(e) => setUsername(e.target.value)} value={username} required disabled/>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Email</span>
                            </label>
                            <input type="email" className="input input-bordered w-full" onChange={(e) => setEmail(e.target.value)} value={email} required disabled/>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Position</span>
                            </label>
                            <select className="select select-bordered" onChange={(e) => setPosition(e.target.value)} value={position} required disabled>
                            <option value="">Select a position</option>
                                {dataPosition.map((position, index) => (
                                <option key={index} value={ position }>{position}</option>
                                ))}
                            </select>
                        </div>
                    </div>      
                    <ButtonSubmit type="submit" className="mt-8 mb-8 float-right" disabled={loading}>
                        {loading ? <span className="loading loading-spinner loading-xs"></span> : "Ubah"}
                    </ButtonSubmit>
                </form>
                <div className="divider my-1"></div>
                <h3 className="text-xl font-bold">Change Password</h3>
                <Formik
                    initialValues={{
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: ""
                    }}
                    onSubmit={async (values, { resetForm }) => {
                    setLoading(true)
                    try {
                        const response = await changePassword(values)
                        if (response.message) {
                            resetForm()
                            setLoading(false)
                            window.scrollTo({ top: 0 })
                            showSuccessAlert(response.message)
                        }
                    } catch (error) {
                        window.scrollTo({ top: 0 })
                        showErrorAlert(error.message)
                        setLoading(false)
                    }
                    }}
                    validationSchema={yup.object().shape({
                    currentPassword: yup.string()
                        .required("Password Sebelumnya harus diisi"),
                    newPassword: yup.string()
                        .required("Password baru harus diisi")
                        .matches(
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\]\{\}\\\|\;\:\'\"\,\<\.\>\/\?\~\`])(?=.{8,})/,
                        "Password baru harus terdiri dari minimal 8 karakter, satu huruf besar, satu huruf kecil, satu angka, dan satu karakter khusus"
                    ),
                    confirmPassword: yup.string()
                    .oneOf([yup.ref('newPassword'), null], 'Konfirmasi Password harus sama dengan Password Baru')
                })}>
                    <Form>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="form-control w-full col-span-3 md:col-span-1">
                                <label className="label">
                                    <span className="label-text font-bold">Password Sebelumnya</span>
                                </label>
                                <div className="flex items-center gap-2">
                                    <div className="input-group mb-2">
                                        <Field type={showCurrentPassword ? "text" : "password"} name="currentPassword" className="w-full input input-bordered"/>
                                        <button type="button" className="btn btn-square" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                                            {showCurrentPassword ? <HiEyeSlash size={18}/> : <HiEye size={18}/>}
                                        </button>
                                    </div>
                                </div>
                                <ErrorMessage name="currentPassword" component="div" className="text-red-500 text-xs italic py-1"/>
                            </div>
                            <div className="form-control w-full col-span-3 md:col-span-1">
                                <label className="label">
                                    <span className="label-text font-bold">Password Baru</span>
                                </label>
                                <div className="flex items-center gap-2">
                                    <div className="input-group mb-2">
                                        <Field type={showNewPassword ? "text" : "password"} name="newPassword" className="w-full input input-bordered"/>
                                        <button type="button" className="btn btn-square" onClick={() => setShowNewPassword(!showNewPassword)}>
                                            {showNewPassword ? <HiEyeSlash size={18}/> : <HiEye size={18}/>}
                                        </button>
                                    </div>
                                </div>
                                <ErrorMessage name="newPassword" component="div" className="text-red-500 text-xs italic py-1"/>
                            </div>
                            <div className="form-control w-full col-span-3 md:col-span-1">
                                <label className="label">
                                    <span className="label-text font-bold">Konfirmasi Password</span>
                                </label>
                                <div className="flex items-center gap-2">
                                    <div className="input-group mb-2">
                                        <Field type={showConfirmPassword ? "text" : "password"} name="confirmPassword" className="w-full input input-bordered" />
                                        <button type="button" className="btn btn-square" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                            {showConfirmPassword ? <HiEyeSlash size={18}/> : <HiEye size={18}/>}
                                        </button>
                                    </div>
                                </div>
                                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs italic py-1"/>
                            </div>
                        </div>
                        <ButtonSubmit type="submit" className="mt-8 mb-8 float-right" disabled={loading}>
                            {loading ? <span className="loading loading-spinner loading-xs"></span> : "Ubah Password"}
                    </ButtonSubmit>
                    </Form>
                </Formik>
               
            </div>
        </div>
    )
}

export default Profile