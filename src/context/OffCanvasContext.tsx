import { createContext, useContext, useState } from "react";

export const OffCanvasContext = createContext({
    showOffCanvas: false,
    setShowOffCanvas: null,
    offData: null,
    setOffData: null,
    OffId: null,
    setOffId: null,
    Offtitle: null,
    SetOfftitle: null,
})

export const OffCanvasProvider = ({children}:{children:any}) => {
    const [showOffCanvas, setShowOffCanvas] = useState(false)
    const [offData, setOffData] = useState(null);
    const [OffId, setOffId] = useState(null);
    const [Offtitle, SetOfftitle] = useState(null);

    return(
        <OffCanvasContext.Provider
        value={{showOffCanvas, setShowOffCanvas, offData, setOffData, OffId, setOffId, Offtitle, SetOfftitle}}
        >
            {children}
        </OffCanvasContext.Provider>
    )
}


export const useOffCanvas = () => useContext(OffCanvasContext)