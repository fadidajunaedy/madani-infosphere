import { createContext, useContext, useReducer } from 'react';

export const ModalConfirmContext = createContext();

export const useModalConfirm = () => useContext(ModalConfirmContext);

const initialState = {
  visible: false,
  collection: null,
  _id: null
};

const modalReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_MODAL_CONFIRM':
      return { visible: true, collection: action.payload.collection, _id: action.payload._id };
    case 'HIDE_MODAL_CONFIRM':
      return initialState;
    default:
      return state;
  }
}

export const ModalConfirmProvider = ({ children }) => {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  const showModalConfirm = (collection, _id) => {
    dispatch({ type: 'SHOW_MODAL_CONFIRM', payload: {collection, _id} });
  }

  const hideModalConfirm = () => {
    dispatch({ type: 'HIDE_MODAL_CONFIRM' });
  }

  return (
    <ModalConfirmContext.Provider value={{...state, showModalConfirm, hideModalConfirm }}>
      {children}
    </ModalConfirmContext.Provider>
  );
};
