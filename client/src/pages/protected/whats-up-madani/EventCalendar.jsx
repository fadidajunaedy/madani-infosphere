import { useEffect, useState } from "react"
import CalendarView from "../../../components/CalendarView"
import { useModal } from "../../../context/ModalContext"
import { getEventCalendars } from "../../../services/eventCalendarServices"
import Modal from "../../../components/modal/index"
import ModalConfirm from "../../../components/modal/confirm"

const EventCalendar = () => {
    const [events, setEvents] = useState([])
    const { showModalInputEventCalendar, showModalEventsCalendarPerDay } = useModal()

    useEffect(() => {
        getEventCalendars(eventCalendar => {
            setEvents(eventCalendar)
        })
    }, [events])

    const addNewEvent = () => {
        showModalInputEventCalendar()
    }

    const openDayDetail = (date) => {
        showModalEventsCalendarPerDay(date)
    }

    return (
        <>
            <Modal />
            <ModalConfirm />
            <CalendarView 
                calendarEvents={events}
                addNewEvent={addNewEvent}
                openDayDetail={openDayDetail}
            />
        </>
    )
}

export default EventCalendar