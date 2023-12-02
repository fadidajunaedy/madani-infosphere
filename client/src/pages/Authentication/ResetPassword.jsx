import { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom"
import { checkIdAndTokenResetPassword, resetPassword } from "../../services/AuthServices"
import { useNavigate } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from "formik"
import { HiEye, HiEyeSlash } from "react-icons/hi2"
import * as yup from "yup"
import { useAlert } from '../../context/AlertContext'
import Alert from '../../components/elements/Alert'
import ButtonSubmit from '../../components/elements/ButtonSubmit'

const ResetPassword = () => {
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(true)
    const [error, setError] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const {showErrorAlert, showSuccessAlert} = useAlert()

    const navigate = useNavigate()
    const {id, token} = useParams()

    const handleCheckIdAndToken = async (id, token) => {
        const data = {
            userId: id,
            token: token
        }
        
        try {
            const response = await checkIdAndTokenResetPassword(data)
            if (response) {
                setStatus(true)
            }
        } catch (error) {
            setStatus(false);
            if (error.response && error.response.status === 400) {
                setError({ code: 400, message: error.message });
            } else if (error.response && error.response.status === 404) {
                setError({ code: 404, message: error.message });
            } else {
                setError({ code: 500, message: "An error occurred" });
            }
        }
    }

    useEffect(() => {
        handleCheckIdAndToken(id, token)
    }, [])
    
    if (status === false) {
        return (
            <div className="flex flex-col justify-center items-center gap-2 bg-base-100 min-h-screen min-w-full prose">
                <div className='text-6xl font-bold'>{error.code}</div>
                <div className='text-6xl font-bold mb-4'>{error.message}</div>
                <Link to="/login" className="btn btn-primary">Halaman Masuk</Link>
            </div>
        );
    }

    return (
        <Formik
        initialValues={{
            password: "",
            confirmPassword: ""
        }}
        onSubmit={async (values, { resetForm }) => {
            setLoading(true)
            try {
                const response = await resetPassword(id, token, values)
                if (response) {
                    setLoading(false)
                    resetForm()
                    showSuccessAlert(response.message)
                    setTimeout(() => {
                        navigate("/login")
                    }, 3000)
                }

            } catch (error) {
                showErrorAlert(error.message)
            }
        }}
        validationSchema={yup.object().shape({
          password: yup.string()
            .required("Password is required")
            .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\]\{\}\\\|\;\:\'\"\,\<\.\>\/\?\~\`])(?=.{8,})/,
            "Password harus terdiri dari setidaknya 8 karakter, satu huruf besar, satu huruf kecil, satu angka, dan satu karakter khusus"
          ),
          confirmPassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
        })}>
            <div className="min-h-screen bg-base-300 flex justify-center items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 max-w-6xl mx-auto rounded-lg overflow-hidden">
                    <div className="p-12 bg-[#176B87] text-white drop-shadow-lg h-full w-full prose-none flex flex-col justify-center gap-6">
                        {/* <img src={LogoMadani} alt="Logo Madani" className="text-left w-52"/>  */}
                        <h1 className="text-4xl font-bold">Masukkan Password baru mu</h1>
                        <h2 className="text-2xl font-normal">Masukkan Password barumu dan jangan sampai lupa</h2>
                    </div>
                    <div className="card w-full rounded-lg md:rounded-none shadow-2xl h-full bg-base-100">
                        <div className="card-body flex flex-col justify-center">
                            <Alert />
                            <Form className='flex flex-col justify-center gap-2'>
                                <h1 className="font-semibold text-2xl">Masukkan password baru</h1>
                                <div className="divider py-0 my-1"></div>
                                <div className="form-control mb-2">
                                    <div className="input-group mb-2">
                                        <Field name="password" type={showPassword ? "text" : "password"} className="w-full input input-bordered" placeholder="Password"/>
                                        <button type="button" className="btn btn-square" onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <HiEyeSlash size={18}/> : <HiEye size={18}/>}
                                        </button>
                                    </div>
                                    <ErrorMessage name="password" component="p" className="text-red-500 text-xs italic pt-1"/>
                                </div>
                                <div className="form-control mb-2">
                                    <div className="input-group mb-2">
                                        <Field name="confirmPassword" type={showConfirmPassword ? "text" : "password"} className="w-full input input-bordered" placeholder="Confirm Password"/>
                                        <button type="button" className="btn btn-square" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                        {showConfirmPassword ? <HiEyeSlash size={18}/> : <HiEye size={18}/>}
                                        </button>
                                    </div>
                                    <ErrorMessage name="confirmPassword" component="p" className="text-red-500 text-xs italic pt-1"/>
                                </div>
                                <div className="form-control mb-2 mt-6">
                                    <ButtonSubmit type="submit" disabled={loading}>
                                        {loading ? <span className="loading loading-spinner loading-xs"></span> : "Reset Password"}
                                    </ButtonSubmit>
                                </div>
                            </Form>
                        </div> 
                    </div>
                </div>
            </div>
        </Formik>
        
    )
}

export default ResetPassword