import { useState, useContext } from "react"
import { CALENDAR_EVENT_STYLE } from "../../../data/calendarEventStyle"
import { useAlert } from "../../../context/AlertContext"
import { createEventCalendar } from "../../../services/eventCalendarServices"
import { useModal } from "../../../context/ModalContext"
import { AuthContext } from "../../../context/AuthContext"
import ButtonSubmit from "../../elements/ButtonSubmit"
import ButtonReset from "../../elements/ButtonReset"
import ButtonClose from "../../elements/ButtonClose"

const THEME_BG = CALENDAR_EVENT_STYLE

const CreateEventCalendar = ({handleHiddenModal}) => {
    const [loading, setLoading] = useState(false)

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [theme, setTheme] = useState("")
    const [startDate, setStartDate] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endDate, setEndDate] = useState("")
    const [endTime, setEndTime] = useState("")

    const [selectedTheme, setSelectedTheme] = useState('')

    const { showErrorAlert, showSuccessAlert } = useAlert()

    const { hideModal } = useModal()

    const { userData } = useContext(AuthContext)

    const handleReset = () => {
        setTitle("")
        setDescription("")
        setTheme("")
        setStartDate("")
        setStartTime("")
        setEndDate("")
        setEndTime("")
    }
    
    const handleSelectChange = (e) => {
        setSelectedTheme(e.target.value)
        setTheme(e.target.value)
    }

    const handleSubmitEventCalendar = async (e) => {
        e.preventDefault()
        setLoading(true)

        const data = {
            title: title,
            description: description,
            theme: theme,
            startDate: startDate,
            startTime: startTime,
            endDate: endDate,
            endTime: endTime,
            createdUser: userData.username
        }

        try {
            const response = await createEventCalendar(data)
            if (response) {
                setLoading(false)
                hideModal()
                showSuccessAlert(response.message)
                window.scrollTo({ top: 0 })
            }
        } catch (error) {
            setLoading(false)
            showErrorAlert(error.message)
            window.scrollTo({ top: 0 })
        }
    }

    return (
        <div className="modal sm:modal-middle modal-open prose">
                <div className="modal-box prose">
                    <h2>Tambah Event</h2>
                    <form onSubmit={handleSubmitEventCalendar}>
                        <div className="form-control w-full mb-4">
                            <label className="label">
                                <span className="label-text font-semibold">Nama Event</span>
                            </label>
                            <input type="text" placeholder="Masukan Nama Event" className="input input-bordered w-full" onChange={(e) => setTitle(e.target.value)} value={title} required/>
                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label">
                                <span className="label-text font-semibold">Deskripsi</span>
                            </label>
                            <textarea className="textarea textarea-bordered h-24 w-full" placeholder="Silahkan Masukan Detail Event" onChange={(e) => setDescription(e.target.value)} value={description} required></textarea>
                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label">
                                <span className="label-text font-semibold flex justify-center items-center gap-2">
                                    Kategori<span className={`indicator-item badge ${THEME_BG[selectedTheme]}`}></span> 
                                </span>
                            </label>
                            <select className="select select-bordered"  onChange={handleSelectChange} required>
                                <option>Select one theme color</option>
                                {Object.entries(THEME_BG).map(([key, value]) => (
                                    <option key={key} value={key} className={value}>
                                        {key}
                                    </option>
                            ))}
                            </select>
                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label">
                                <span className="label-text font-semibold">Waktu Mulai</span>
                            </label>
                            <div className="flex gap-4">
                            <input type="date" placeholder="Type here" className="input input-bordered w-full" onChange={(e) => setStartDate(e.target.value)} value={startDate} required/>
                            <input type="time" placeholder="Type here" className="input input-bordered w-full" onChange={(e) => setStartTime(e.target.value)} value={startTime} required/>
                            </div>
                        </div>
                        <div className="form-control w-full mb-4">
                            <label className="label">
                                <span className="label-text font-semibold">Waktu Berakhir</span>
                            </label>
                            <div className="flex gap-4">
                            <input type="date" placeholder="Type here" className="input input-bordered w-full" onChange={(e) => setEndDate(e.target.value)} value={endDate} required/>
                            <input type="time" placeholder="Type here" className="input input-bordered w-full" onChange={(e) => setEndTime(e.target.value)} value={endTime} required/>
                            </div>
                        </div>
                        <div className="modal-action">
                            <ButtonClose onClick={handleHiddenModal}>
                                Tutup
                            </ButtonClose>
                            <ButtonReset onClick={handleReset}>
                                Reset
                            </ButtonReset>
                            <ButtonSubmit type="submit" disabled={loading}>
                                {loading ? <span className="loading loading-spinner loading-xs"></span> : "Tambah"}
                            </ButtonSubmit>
                        </div>
                    </form>
                </div>
            </div>
    )
}

export default CreateEventCalendar