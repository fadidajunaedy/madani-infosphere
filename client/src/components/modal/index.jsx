import { useModal } from "../../context/ModalContext"
import Report from "./view/Report"
import Contact from "./view/Contact"
import EventCalendar from "./view/EventCalendar"
import EventsPerDay from "./view/EventsPerDay"
import CreateEventCalendar from "./form/CreateEventCalendar"
import EditEventCalendar from "./form/EditEventCalendar"

const Modal = () => {
    const { visible, modalType, collection, data, hideModal } = useModal()
    
    const handleHiddenModal = () => {
        hideModal()
    }

    return (
        <>
            {collection === "REPORT" && visible && (
                <Report data={data} handleHiddenModal={handleHiddenModal} />
            )}
            
            {collection === "CONTACT" && visible && (
                <Contact data={data} handleHiddenModal={handleHiddenModal} />
            )}
            
            {collection === "EVENT_CALENDAR" && visible && (
                <EventCalendar data={data} handleHiddenModal={handleHiddenModal} />
            )}

            {modalType === "EVENT_CALENDAR_PER_DAY" && visible && (
                <EventsPerDay data={data} handleHiddenModal={handleHiddenModal} />
            )}

            {modalType === "INPUT_EVENT_CALENDAR" && visible && (
                <CreateEventCalendar handleHiddenModal={handleHiddenModal} />
            )}
            
            {modalType === "EDIT_EVENT_CALENDAR" && visible && (
                <EditEventCalendar data={data} handleHiddenModal={handleHiddenModal} />
            )}
        </>
  )
}

export default Modal