import moment from "moment"
import { CALENDAR_EVENT_STYLE } from "../../../data/calendarEventStyle"
import { HiArrowUturnLeft } from "react-icons/hi2"
import { useModal } from "../../../context/ModalContext"
import ButtonClose from "../../elements/ButtonClose"

const THEME_BG = CALENDAR_EVENT_STYLE

const EventCalendar = ({data, handleHiddenModal}) => {
    const { showModalEventsCalendarPerDay } = useModal()
    const handleBack = () => {
        showModalEventsCalendarPerDay(moment(data.startDate).format("YYYY-MM-DD"))
    }
    return (
        <div className="modal sm:modal-middle modal-open">
            <div className="modal-box prose">
                
                <table className="table-fixed" >
                    <thead>
                        <tr>
                            <td colSpan={2}>
                                <h3 className="text-2xl font-bold mb-2">Detail Event</h3>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Nama Event</th>
                            <td className="break-words">
                                {data.title}
                            </td>
                        </tr>
                        <tr>
                            <th>Deskripsi</th>
                            <td className="break-words">
                                <p className="break-words">{data.description}</p>
                            </td>
                        </tr>
                        <tr>
                            <th>Kategori</th>
                            <td className="break-words">{data.theme}&nbsp;<span className={`${THEME_BG[data.theme]} px-2 rounded-full`}></span></td>
                        </tr>
                        <tr>
                            <th>Tanggal Mulai</th>
                            <td className="break-words">{moment(data.startDate).format('dddd, D MMMM YYYY')}</td>
                        </tr>
                        <tr>
                            <th>Waktu Mulai</th>
                            <td className="break-words">{data.startTime}</td>
                        </tr>
                        <tr>
                            <th>Tanggal Berakhir</th>
                            <td className="break-words">{moment(data.endDate).format('dddd, D MMMM YYYY')}</td>
                        </tr>
                        <tr>
                            <th>Waktu Berakhir</th>
                            <td className="break-words">{data.endTime}</td>
                        </tr>
                        <tr>
                            <th>Diupload oleh</th>
                            <td className="break-words">{data.createdUser}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="modal-action">
                    <ButtonClose onClick={handleBack}>
                        <HiArrowUturnLeft /> Kembali
                    </ButtonClose>
                    <ButtonClose onClick={handleHiddenModal}>
                        Tutup
                    </ButtonClose>
                </div>
            </div>
        </div>
    )
}

export default EventCalendar