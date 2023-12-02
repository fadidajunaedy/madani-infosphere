import moment from "moment"
import { useEffect, useState } from "react"
import { HiChevronDoubleLeft, HiChevronDoubleRight, HiOutlineCalendar } from "react-icons/hi2"
import { CALENDAR_EVENT_STYLE } from "../data/calendarEventStyle"
import Alert from "./elements/Alert"
import ButtonSubmit from "./elements/ButtonSubmit"

const THEME_BG = CALENDAR_EVENT_STYLE

const CalendarView = ({calendarEvents, addNewEvent, openDayDetail}) => {

    const today = moment().startOf('day')
    const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const colStartClasses = [
      "",
      "col-start-2",
      "col-start-3",
      "col-start-4",
      "col-start-5",
      "col-start-6",
      "col-start-7",
  ]

    const [firstDayOfMonth, setFirstDayOfMonth] = useState(moment().startOf('month'))
    const [events, setEvents] = useState([])
    const [currMonth, setCurrMonth] = useState(() => moment(today).format("MMM-yyyy"));

    useEffect(() => {
        setEvents(calendarEvents)
    }, [calendarEvents])

    const allDaysInMonth = ()=> {
        let start = moment(firstDayOfMonth).startOf('week')
        let end = moment(moment(firstDayOfMonth).endOf('month')).endOf('week')
        var days = []
        var day = start
        while (day <= end) {
            days.push(day.toDate())
            day = day.clone().add(1, 'd')
        }
        return days
    }

    const getEventsStartDate = (date) => {
        let filteredEvents = events.filter((e) => {return moment(date).isSame(moment(e.startDate), 'day') } )
        if(filteredEvents.length > 3){
            let originalLength = filteredEvents.length
            filteredEvents = filteredEvents.slice(0, 3)
            filteredEvents.push({title : `${originalLength - 3} more`, theme : "MORE"})
        }
        return filteredEvents
    }
    
    const getEventsEndDate = (date) => {
        let filteredEvents = events.filter((e) => {return moment(date).isSame(moment(e.endDate), 'day') } )
        if(filteredEvents.length > 1){
            let originalLength = filteredEvents.length
            filteredEvents = filteredEvents.slice(0, 1)
            filteredEvents.push({title : `${originalLength - 1} more`, theme : "MORE"})
        }
        return filteredEvents
    }

    const openAllEventsDetail = (date, theme) => {
        if(theme != "MORE")return 1
        openDayDetail(moment(date).format("YYYY-MM-DD"))
    }

    const isToday = (date) => {
        return moment(date).isSame(moment(), 'day');
    }

    const isDifferentMonth = (date) => {
        return moment(date).month() != moment(firstDayOfMonth).month() 
    }

    const getPrevMonth = (event) => {
        const firstDayOfPrevMonth = moment(firstDayOfMonth).add(-1, 'M').startOf('month');
        setFirstDayOfMonth(firstDayOfPrevMonth)
        setCurrMonth(moment(firstDayOfPrevMonth).format("MMM-yyyy"));
    };

    const getCurrentMonth = (event) => {
        const firstDayOfCurrMonth = moment().startOf('month');
        setFirstDayOfMonth(firstDayOfCurrMonth)
        setCurrMonth(moment(firstDayOfCurrMonth).format("MMM-yyyy"));
    };

    const getNextMonth = (event) => {
        const firstDayOfNextMonth = moment(firstDayOfMonth).add(1, 'M').startOf('month');
        setFirstDayOfMonth(firstDayOfNextMonth)
        setCurrMonth(moment(firstDayOfNextMonth).format("MMM-yyyy"));
    };

    return (
        <>
            <div data-aos="fade-up" className="w-full bg-base-100 p-4 rounded-lg prose-sm">
                <Alert />
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="w-full md:w-auto flex flex-row items-center justify-between gap-2 sm:gap-4 mb-6 md:mb-0">
                        <button className="btn btn-ghost" onClick={getCurrentMonth}>                
                            Bulan ini
                        </button>
                        <button className="btn btn-ghost"  onClick={getPrevMonth}>
                            <HiChevronDoubleLeft className="w-5 h-5"/>
                        </button>
                        <p className="font-semibold w-48 text-center">
                            {moment(firstDayOfMonth).format("MMMM yyyy").toString()}
                        </p>
                        <button className="btn btn-ghost" onClick={getNextMonth}>
                            <HiChevronDoubleRight className="w-5 h-5"/>
                        </button>
                    </div>
                    <ButtonSubmit type="button" onClick={addNewEvent}><HiOutlineCalendar /> Tambah Event</ButtonSubmit>

                </div>
                <div className="my-4 divider" />
                <div className="grid grid-cols-7 gap-6 sm:gap-12 place-items-center">
                {weekdays.map((day, key) => {
                    return (
                    <div  className="text-xs capitalize" key={key}>
                        {day}
                    </div>
                    );
                })}
                </div>

                    
                <div className="grid grid-cols-7 mt-1  place-items-center">
                {allDaysInMonth().map((day, idx) => {
                    return (
                    <div key={idx} className={colStartClasses[moment(day).day().toString()] + " border border-solid w-full flex flex-col h-32"}>
                        <p className={`inline-block flex items-center  justify-center h-8 w-8 rounded-full mx-1 mt-1 text-sm cursor-pointer hover:bg-base-300 prose-none ${isToday(day) && " bg-blue-100 dark:bg-blue-400 dark:hover:bg-base-300 dark:text-white"} ${isDifferentMonth(day) && "text-slate-400 dark:text-slate-600"}`} onClick={() => openDayDetail(moment(day).format("YYYY-MM-DD"))}> { moment(day).format("D") }</p>
                        {
                            getEventsStartDate(day).map((e, k) => {
                                return <span key={k} onClick={() => openAllEventsDetail(day, e.theme)} className={`text-xs px-2 mt-1 truncate ${THEME_BG[e.theme]}`}>{e.title}</span>
                            })
                            
                        }
                        {/* {
                            getEventsEndDate(day).map((e, k) => {
                                return <span key={k} onClick={() => openAllEventsDetail(day, e.theme)} className={`text-xs px-2 mt-1 truncate ${THEME_BG[e.theme]}`}>end of {e.title}</span>
                            })
                            
                        } */}
                    </div>
                    );
                })}
                </div>
            </div>
        </>
    )
}

export default CalendarView