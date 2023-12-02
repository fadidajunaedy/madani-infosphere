import moment from "moment";
import { useEffect, useState, useContext } from "react";
import { CALENDAR_EVENT_STYLE } from "../../../data/calendarEventStyle";
import { HiEye, HiPencilSquare, HiTrash } from "react-icons/hi2";
import { useModal } from "../../../context/ModalContext";
import { getEventCalendars } from "../../../services/eventCalendarServices";
import { useModalConfirm } from "../../../context/ModalConfirmContext";
import { AuthContext } from "../../../context/AuthContext";
import ButtonClose from "../../elements/ButtonClose";

const THEME_BG = CALENDAR_EVENT_STYLE;

const EventsPerDay = ({ data, handleHiddenModal }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [filteredEvents, setFilteredEvents] = useState([])
  const [endDates, setEndDates] = useState([])

  const { userData } = useContext(AuthContext)

  useEffect(() => {
    setIsLoading(true)
    getEventCalendars((eventCalendar) => {
      const filtered = eventCalendar.filter((event) => event.startDate === data)
      const endDate = eventCalendar.filter((event) => event.endDate === data)
      setFilteredEvents(filtered)
      setEndDates(endDate)
    }, [data])
    setIsLoading(false)
  }, [filteredEvents]);

  const { showModal, showModalEditEventCalendar } = useModal();
  const { showModalConfirm } = useModalConfirm();

  return (
    <>
      <div className="modal sm:modal-middle modal-open">
        <div className="modal-box prose">
          <h3 className="mb-6">{moment(data).format("MMMM Do YYYY")}</h3>
          <div className="flex flex-col gap-4">
          {isLoading ? (
              <div className="flex justify-center items-center p-4 font-semibold text-xl mb-2 rounded-lg">Memuat...</div>
            ) : filteredEvents && filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center ${THEME_BG[event.theme]} p-4 rounded-lg overflow-hidden`}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-xl mb-2">{event.title.substring(0, 20) + (event.title.length > 20 ? "..." : "")}</span>
                    <span className="text-sm">
                      {moment(event.startDate).format("MMMM Do YYYY")} - {moment(event.endDate).format("MMMM Do YYYY")}
                    </span>
                  </div>
                  <div className="flex justify-center items-center">
                    <button>
                      <HiEye size={14} className="btn btn-square btn-ghost p-4" onClick={() => showModal("EVENT_CALENDAR", event)} />
                    </button>
                    {event.createdUser === userData.username || userData.role === "admin" || userData.role === "super-admin" ? (
                    <button>
                      <HiPencilSquare size={14} className="btn btn-square btn-ghost p-4" onClick={() => showModalEditEventCalendar(event.id)} />
                    </button>
                    ) : null}
                    {event.createdUser === userData.username || userData.role === "admin" || userData.role === "super-admin" ? (
                    <button>
                      <HiTrash size={14} className="btn btn-square btn-ghost p-4" onClick={() => showModalConfirm("EVENT_CALENDAR", event.id)} />
                    </button>
                    ) : null}
                  </div>
                </div>
              ))
            ) : (endDates.length <= 0) && (
              <div className="flex justify-center items-center p-4 font-semibold text-xl mb-2 rounded-lg">Tidak ada Event</div>
            )}

            {/* {endDates && endDates.length > 0 && (
              endDates.map((event, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center bg-base-200 p-4 rounded-lg overflow-hidden`}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-xl mb-2">End of {event.title.substring(0, 20) + (event.title.length > 20 ? "..." : "")}</span>
                    <span className="text-sm">
                      Berakhir pada {event.endTime}
                    </span>
                  </div>
                </div>
              ))
            )} */}
          </div>
          <div className="modal-action">
            <ButtonClose onClick={handleHiddenModal}>
              Tutup
            </ButtonClose>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventsPerDay;
