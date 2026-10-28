import { createContext, useContext, useState } from "react"

export const UIContext = createContext({
    showModal: false,
    setShowModal: null
})


export const UIProvider = ({children}) => {
    const [showModal, setShowModal] = useState(false);


    return(
        <UIContext.Provider
        value={{ showModal, setShowModal }}
        >
            {children}
        </UIContext.Provider>
    )
}

export const useUI = () => useContext(UIContext);