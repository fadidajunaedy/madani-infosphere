import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Loader from '../common/Loader'
import Header from './Header'
import Sidebar from './Sidebar'
import routes from '../routes'
import {  AuthProvider } from '../context/AuthContext'
import { ModalProvider } from '../context/ModalContext'
import { ModalConfirmProvider } from '../context/ModalConfirmContext'
import Page404 from '../pages/protected/Page404'
import { checkToken } from '../services/AuthServices'

const DefaultLayout = () => {
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    
    const handleCheckToken = async () => {
        const response = await checkToken();
        if (response.error) {
            return navigate("/login", { state: { loginMessage: "Login terlebih dahulu" } });
        }
    }

    useEffect(() => {
        handleCheckToken()
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000)

        return () => clearTimeout(timer)
    }, [])
    return (
        <>
            <AuthProvider>
            <div className="drawer drawer-mobile lg:drawer-open p-0">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <Header />
                <div className="drawer-content overflow-x-hidden bg-base-200 pt-[10vh]">
                    <div className="px-6 py-6 min-h-[90vh] overflow-x-hidden">
                            <ModalProvider>
                                <ModalConfirmProvider>
                                    { loading ? (
                                        <Loader />
                                    ) : (
                                        <Routes>
                                            {
                                                routes.map((route, key) => {
                                                    return(
                                                        <Route
                                                            key={key}
                                                            exact={true}
                                                            path={`${route.path}`}
                                                            element={<route.component />}
                                                        />
                                                    )
                                                })
                                            }

                                            {/* Redirecting unknown url to 404 page */}
                                            <Route path="*" element={<Page404 />} />
                                        </Routes>
                                    )}
                                </ModalConfirmProvider>
                            </ModalProvider>
                    </div>
                </div> 
                <Sidebar />
            </div>
            </AuthProvider>        

        </>
    )
}

export default DefaultLayout