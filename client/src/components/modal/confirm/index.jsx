import { useAlert } from "../../../context/AlertContext"
import { useModalConfirm } from "../../../context/ModalConfirmContext"
import { deleteReport } from "../../../services/ReportServices"
import { deleteContact } from "../../../services/contactServices"
import { deleteEventCalendar } from "../../../services/eventCalendarServices"
import { deleteTag } from "../../../services/TagService"
import { deleteUser } from "../../../services/UserServices"
import { useEffect, useState } from "react"

const ModalConfirm = () => {
    const [loading, setLoading] = useState(false)
    const { visible, collection, _id, hideModalConfirm } = useModalConfirm()
    const { showErrorAlert, showSuccessAlert } = useAlert()

    const handleConfirmDelete = async () => {
        setLoading(true)
        try {
            let response
            collection === "REPORT" ? response = await deleteReport(_id) : null
            collection === "CONTACT" ? response = await deleteContact(_id) : null
            collection === "EVENT_CALENDAR" ? response = await deleteEventCalendar(_id) : null
            collection === "USER" ? response = await deleteUser(_id) : null
            collection === "TAG" ? response = await deleteTag(_id) : null

            if (response) {
                setLoading(false)
                hideModalConfirm()
                showSuccessAlert(response.message)
                window.scrollTo({ top: 0 })
            }
            
        } catch (error) {
            setLoading(false)
            showErrorAlert(error.message)
            window.scrollTo({ top: 0 })
        }
    }

    const handleCancelDelete = () => {
        hideModalConfirm()
    }

    return (
        <>
            {visible && (
                <div className="modal sm:modal-middle modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Konfirmasi Hapus</h3>
                        <p className="py-4">Apakah anda yakin ingin menghapus data ini?</p>
                        <div className="modal-action">
                            <form method="dialog">
                                <button type="submit" className="btn bg-[#176B87] text-white" onClick={handleConfirmDelete} disabled={loading}>
                                    {loading ? <span className="loading loading-spinner loading-xs"></span> : "Hapus"}
                                </button>
                                <button type="button" className="btn bg-[#749BC2] text-white ml-4" onClick={handleCancelDelete}>Batal</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ModalConfirm