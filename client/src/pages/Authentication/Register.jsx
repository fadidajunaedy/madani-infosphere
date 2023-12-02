import { Link } from "react-router-dom"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as yup from "yup"
import { useState } from "react"
import { register } from "../../services/AuthServices"
import { HiEye, HiEyeSlash } from "react-icons/hi2"
import Alert from "../../components/elements/Alert"
import { useAlert } from "../../context/AlertContext"
import {dataPosition} from "../../data/dataPosition"
import ButtonSubmit from "../../components/elements/ButtonSubmit"

const Register = () => {
    const [loading, setLoading] = useState(false)

    const [showPassword, setShowPassword] = useState(false)

    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const { showErrorAlert, showSuccessAlert } = useAlert()

    return (
      <Formik
        initialValues={{
          name: "",
          username: "",
          email: "",
          position: "",
          password: "",
          confirmPassword: ""
        }}
        onSubmit={async (values, { resetForm }) => {
          setLoading(true)
          try {
            const response = await register(values)
            resetForm()
            showSuccessAlert(response.message)
            setLoading(false)
          } catch (error) {
            showErrorAlert(error.message)
            setLoading(false)
          }
        }}
        validationSchema={yup.object().shape({
          name: yup.string()
            .required("Nama harus diisi")
            .min(3, "Nama harus minimal 3 karakter")
            .max(36, "Nama tidak dapat melebihi 36 karakter"),
          username: yup.string()
            .required("Username harus diisi")
            .min(3, "Username harus minimal 3 karakter")
            .max(24, "Username tidak dapat melebihi 24 karakter"),
          email: yup.string()
            .required("Email harus diisi")
            .email("Email tidak valid"),
          position: yup.string()
            .required("Jabatan harus diisi")
            .min(3, "Jabatan harus minimal 3 karakter")
            .max(24, "Jabatan tidak dapat melebihi 24 karakter"),
          password: yup.string()
            .required("Password harus diisi")
            .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\]\{\}\\\|\;\:\'\"\,\<\.\>\/\?\~\`])(?=.{8,})/,
            "Password harus terdiri dari setidaknya 8 karakter, satu huruf besar, satu huruf kecil, satu angka, dan satu karakter khusus"
          ),
          confirmPassword: yup.string()
            .oneOf([yup.ref('password'), null], 'Password harus sama')
        })}
        >
          <div className="min-h-screen bg-base-300 flex justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 max-w-6xl mx-auto rounded-lg overflow-hidden">
              <div className="p-12 bg-[#176B87] text-white drop-shadow-lg h-full w-full prose-none flex flex-col justify-center gap-6">
                <h1 className="text-4xl font-bold">Senang bertemu denganmu</h1>
                <h2 className="text-2xl font-normal">Masukkan informasi kamu untuk mendaftar</h2>
              </div>
              <div className="card w-full rounded-lg md:rounded-none shadow-2xl h-full bg-base-100">
                <div className="card-body flex flex-col justify-center">
                  <Alert />
                  <Form className='flex flex-col justify-center gap-2'>
                    <h1 className="font-semibold text-2xl">Daftar Terlebih Dahulu</h1>
                    <div className="divider py-0 my-1"></div>
                    <div className="form-control mb-2">
                      <Field name="name" type="text" className="input input-bordered" placeholder="Name"/>
                      <ErrorMessage name="name" component="div" className="text-red-500 text-xs italic py-1"/>
                    </div>
                    <div className="form-control mb-2">
                      <Field name="username" type="text" className="input input-bordered" placeholder="Username"/>
                      <ErrorMessage name="username" component="div" className="text-red-500 text-xs italic py-1"/>
                    </div>        
                    <div className="form-control mb-2">
                      <Field name="email" type="email" className="input input-bordered" placeholder="Email"/>
                      <ErrorMessage name="email" component="div" className="text-red-500 text-xs italic py-1"/>
                    </div>
                    <div className="form-control mb-2">
                      <Field as="select" name="position" className="select select-bordered">
                        <option value="">Pilih Jabatan</option>
                        {dataPosition.map((position, index) => (
                          <option key={index} value={ position }>{position}</option>
                        ))}
                      </Field>
                      <ErrorMessage name="position" component="div" className="text-red-500 text-xs italic py-1"/>
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
                    <div className="form-control mb-2">
                      <div className="input-group mb-2">
                        <Field name="confirmPassword" type={showConfirmPassword ? "text" : "password"} className="w-full input input-bordered" placeholder="Konfirmasi Password"/>
                        <button type="button" className="btn btn-square" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                          {showConfirmPassword ? <HiEyeSlash size={18}/> : <HiEye size={18}/>}
                        </button>
                      </div>
                      <ErrorMessage name="confirmPassword" component="p" className="text-red-500 text-xs italic pt-1"/>
                    </div>        
                    <div className="form-control mb-2 mt-6">
                      <ButtonSubmit type="submit" disabled={loading}>
                        {loading ? <span className="loading loading-spinner loading-xs"></span> : "Daftar"}
                      </ButtonSubmit>
                    </div>
                  </Form>
                  <div className="form-control">
                    <span className="label-text text-center">Sudah punya akun? <Link to="/login" className="link link-hover">Masuk</Link></span>
                  </div>
                </div> 
              </div>
            </div>
          </div>
          
      </Formik>
    )
}

export default Register