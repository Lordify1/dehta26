import React, { useState } from "react"
import { FaRemoveFormat } from "react-icons/fa"
import { classMap } from "../Tools/Misc"
import { useUI } from "@/context/UIContext"


type Props = {
    children: any,
    title: string
}

const Modal = ({title, children}: Props) => {
    const {showModal, setShowModal} = useUI()

    return(
        <>
        <div
        className={`z-100 fixed min-h-full text-primary w-full left-0 right-0 bottom-0 top-0 bg-(--modalBg) ${!showModal ? 'hidden' : 'grid grid-cols-1 lg:flex lg:flex-col'} items-center justify-center fade-in transition-all duration-500 p-2`}>
            <section className="z-1000 lg:w-100 h-100 bg-accent border-border rounded-lg opacity-100 flex flex-col p-3">
                <div className="w-full h-10 border-border flex flex-row justify-between items-center p-2">
                    <p className="text-primary">{title || 'Modal'}</p>
                    <button 
                    onClick={() => setShowModal(false)}
                    className={`text-red-500 text-sm cursor-pointer`}>
                        X
                    </button>
                </div>
                <div className="flex flex-col items-center justify-center">
                    {children}
                </div>
            </section>
        </div>
        </>
    )
}

export default Modal