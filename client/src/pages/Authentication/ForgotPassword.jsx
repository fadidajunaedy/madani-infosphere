import { useState } from 'react'
import { Link } from "react-router-dom"
import { forgotPassword } from "../../services/AuthServices"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as yup from "yup"
import { useAlert } from '../../context/AlertContext'
import Alert from '../../components/elements/Alert'
import ButtonSubmit from '../../components/elements/ButtonSubmit'

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false)
    const { showErrorAlert, showSuccessAlert } = useAlert()
      
    return (
        <Formik
        initialValues={{
          email: "",
        }}
        onSubmit={async (values, { resetForm }) => {
            setLoading(true)
            try {
                const response = await forgotPassword(values)
                if (response) {
                    setLoading(false)
                    resetForm()
                    showSuccessAlert(response.message)
                }
            } catch (error) {
                setLoading(false)
                showErrorAlert(error.message)
            }
        }}
        validationSchema={yup.object().shape({
          email: yup.string()
            .required("Email is required")
            .email("Invalid email"),
        })}>
            <div className="min-h-screen bg-base-300 flex justify-center items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 max-w-6xl mx-auto rounded-lg overflow-hidden">
                    <div className="p-12 bg-[#176B87] text-white drop-shadow-lg h-full w-full prose-none flex flex-col justify-center gap-6">
                        <h1 className="text-4xl font-bold">Kamu lupa kata sandi mu ?</h1>
                        <h2 className="text-2xl font-normal">Silahkan masukan email mu di sini</h2>
                    </div>
                    <div className="card w-full rounded-lg md:rounded-none shadow-2xl h-full bg-base-100">
                        <div className="card-body flex flex-col justify-center">
                            <Alert />
                            <Form className='flex flex-col justify-center gap-2'>
                                <h1 className="font-semibold text-2xl">Masukkan Email</h1>
                                <div className="divider py-0 my-1"></div>
                                <div className="form-control mb-2">
                                    <Field name="email" type="email" className="w-full input input-bordered" placeholder="Email"/>
                                    <ErrorMessage name="email" component="p" className="text-red-500 text-xs italic pt-1"/>
                                </div>
                                <div className="form-control mb-2 mt-6">
                                    <ButtonSubmit type="submit" disabled={loading}>
                                        {loading ? <span className="loading loading-spinner loading-xs"></span> : "Kirim"}
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

export default ForgotPassword