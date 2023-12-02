import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { login } from "../../services/AuthServices"
import { useNavigate, useLocation } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from "formik"
import { HiEye, HiEyeSlash } from "react-icons/hi2"
import * as yup from "yup"
import { useAlert } from '../../context/AlertContext'
import Alert from '../../components/elements/Alert'
import ButtonSubmit from '../../components/elements/ButtonSubmit'

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    
    const { showErrorAlert, showSuccessAlert } = useAlert()

    const navigate = useNavigate()

    const location = useLocation();
    const logoutMessage = location.state && location.state.logoutMessage
    const loginMessage = location.state && location.state.loginMessage
    
    useEffect(() => {
        if (loginMessage) {
            showSuccessAlert(loginMessage)
            navigate("/login", { state: {} })
        }
        if (logoutMessage) {
            showSuccessAlert(logoutMessage)
            navigate("/login", { state: {} })
        }
    }, [])
    return (
        <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        onSubmit={async (values, { resetForm }) => {
            setLoading(true)
            try {
                const response = await login(values)
                resetForm()
                setLoading(false)
                if (response.success) {
                    showSuccessAlert(response.message)
                    navigate("/")
                } else {
                    showSuccessAlert(response.message)
                }
            } catch (error) {
                showErrorAlert(error.message)
                setLoading(false)
            }
        }}
        validationSchema={yup.object().shape({
          email: yup.string()
            .required("Email harus diisi")
            .email("Email tidak valid"),
          password: yup.string()
            .required("Password harus diisi")
            .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\]\{\}\\\|\;\:\'\"\,\<\.\>\/\?\~\`])(?=.{8,})/,
            "Password harus terdiri dari setidaknya 8 karakter, satu huruf besar, satu huruf kecil, satu angka, dan satu karakter khusus"
          )
        })}>
            <div className="min-h-screen bg-base-300 flex justify-center items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 max-w-6xl mx-auto rounded-lg overflow-hidden">
                    <div className="p-12 bg-[#176B87] text-white drop-shadow-lg h-full w-full prose-none flex flex-col justify-center gap-6">
                        <h1 className="text-4xl font-bold">Senang bertemu denganmu lagi</h1>
                        <h2 className="text-2xl font-normal">Masuk dengan informasi yang kamu masukkan saat pendaftaran</h2>
                    </div>
                    <div className="card w-full rounded-lg md:rounded-none shadow-2xl h-full bg-base-100">
                        <div className="card-body flex flex-col justify-center">
                            <Alert />
                            <Form className='flex flex-col justify-center gap-2'>
                                <h1 className="font-semibold text-2xl hidden md:block">Masuk</h1>
                                {/* {location.state && location.state.message && <p>{location.state.message}</p>} */}
                                <div className="divider py-0 my-1"></div>
                                <div className="form-control mb-2">
                                    <Field name="email" type="email" className="w-full input input-bordered" placeholder="Email"/>
                                    <ErrorMessage name="email" component="p" className="text-red-500 text-xs italic pt-1"/>
                                </div>
                                <div className="form-control mb-2">
                                    <div className="input-group mb-2">
                                        <Field name="password" type={showPassword ? "text" : "password"} className="w-full input input-bordered" placeholder="Password"/>
                                        <button type="button" className="btn btn-square" onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <HiEyeSlash size={18}/> : <HiEye size={18}/>}
                                        </button>
                                    </div>
                                    <ErrorMessage name="password" component="p" className="text-red-500 text-xs italic pt-1"/>
                                </div>
                                <div className="flex justify-between items-center gap-4 mb-2 mt-6">
                                    <Link to="/forgot-password" className="label-text link link-hover text-sm">Lupa Password ?</Link>
                                    <ButtonSubmit type="submit" disabled={loading}>
                                        {loading ? <span className="loading loading-spinner loading-xs"></span> : "Masuk"}
                                    </ButtonSubmit>
                                </div>
                            </Form>
                            <div className="form-control">
                                <span className="label-text text-center">Tidak punya akun? <Link to="/register" className="link link-hover">Daftar</Link></span>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </Formik>
        
    )
}

export default Login