import { useEffect, useState } from "react"
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { emailVerification } from "../../services/AuthServices"

const Verification = () => {
    const [loading, setLoading] = useState(true)
    const [verificationStatus, setVerificationStatus] = useState(false)
    const [statusMessage, setStatusMessage] = useState("")

    const {id, verificationToken } = useParams()
    
    const handleVerification = async () => {
        try {
            const response = await emailVerification(id, verificationToken)
            if (response) {
                setVerificationStatus(true)
                setStatusMessage(response.message)
                setLoading(false)
            }
        } catch (error) {
            console.log(error.message)
            setVerificationStatus(false)
            setStatusMessage(error.message)
            setLoading(false)
        }
    }
    useEffect(() => {
        handleVerification()
    }, [])
    return (
            <div className="flex flex-col justify-center items-center gap-2 bg-base-100 min-h-screen prose-lg">
                {loading ? 
                    <span className="loading loading-dots loading-lg"></span>
                : (
                verificationStatus ? (
                <>
                    <AiOutlineCheckCircle size={240} className="text-green-500"/>
                    <h2>{statusMessage}</h2>
                    <Link to="/login" className="btn bg-[#2AA39E] hover:bg-[#45c4bf] text-white">Kembali ke halaman Masuk</Link>
                </>
                ) : (
                <>
                    <AiOutlineCloseCircle size={240} className="text-red-500"/>
                    <h2>{statusMessage}</h2>
                    <Link to="/login" className="btn bg-[#2AA39E] hover:bg-[#45c4bf] text-white">Kembali ke halaman Masuk</Link>
                </>
                )
                )}
            </div>
    )
}

export default Verification