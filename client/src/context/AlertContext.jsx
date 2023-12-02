import { createContext, useContext, useReducer } from "react"

export const AlertContext = createContext()

export const useAlert = () => {
    return useContext(AlertContext)
}

const initialState = {
    visible: false,
    status: "",
    message: ""
}

const alertReducer = (state, action) => {
    switch (action.type) {
        case "SHOW_SUCCESS_ALERT":
          return { visible: true, status: "success", message: action.payload };
        case "SHOW_ERROR_ALERT":
          return { visible: true, status: "error", message: action.payload };
        case "HIDE_ALERT":
          return { visible: false, status: "", message: "" };
        default:
          return state;
      }
}

export const AlertProvider = ({ children }) => {
    const [state, dispatch] = useReducer(alertReducer, initialState)

    const showSuccessAlert = (message) => {
        dispatch({ type: "SHOW_SUCCESS_ALERT", payload: message });
    }

    const showErrorAlert = (message) => {
        dispatch({ type: "SHOW_ERROR_ALERT", payload: message });
    }
    
    const hideAlert = () => {
        dispatch({ type: "HIDE_ALERT" });
    }

    return (
        <AlertContext.Provider
          value={{ ...state, showSuccessAlert, showErrorAlert, hideAlert }}
        >
          {children}
        </AlertContext.Provider>
      )
}