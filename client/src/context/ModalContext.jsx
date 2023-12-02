import { createContext, useContext, useReducer } from 'react'

export const ModalContext = createContext()

export const useModal = () => useContext(ModalContext)

const initialState = {
  visible: false,
  modalType: null,
  collection: null,
  data: null,
}

const modalReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return { visible: true, modalType: "VIEW_DETAIL", collection: action.payload.collection, data: action.payload.data }
    case 'SHOW_MODAL_VIEW_EVENT_CALENDAR_PER_DAY':
      return { visible: true, modalType: "EVENT_CALENDAR_PER_DAY", data: action.payload }
    case 'SHOW_MODAL_INPUT_EVENT_CALENDAR':
      return { visible: true, modalType: "INPUT_EVENT_CALENDAR" }
    case 'SHOW_MODAL_EDIT_EVENT_CALENDAR':
      return { visible: true, modalType: "EDIT_EVENT_CALENDAR", data: action.payload }
    case 'HIDE_MODAL':
      return initialState
    default:
      return state
  }
}

export const ModalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  const showModal = (collection, data) => {
    dispatch({ type: 'SHOW_MODAL', payload: {collection, data} })
  }

  const showModalEventsCalendarPerDay = (data) => {
    dispatch({ type: 'SHOW_MODAL_VIEW_EVENT_CALENDAR_PER_DAY', payload: data })
  }

  const showModalInputEventCalendar = () => {
    dispatch({ type: 'SHOW_MODAL_INPUT_EVENT_CALENDAR' })
  }

  const showModalEditEventCalendar = (data) => {
    dispatch({ type: 'SHOW_MODAL_EDIT_EVENT_CALENDAR', payload: data })
  }

  const hideModal = () => {
    dispatch({ type: 'HIDE_MODAL' })
  }

  return (
    <ModalContext.Provider value={{...state, showModal, showModalEventsCalendarPerDay, showModalInputEventCalendar, showModalEditEventCalendar, hideModal}}>
      {children}
    </ModalContext.Provider>
  );
};
