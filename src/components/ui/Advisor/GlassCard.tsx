import { classMap } from "@/components/Tools/Misc"
import { useUI } from "@/context/UIContext"
import React, { useState } from "react"
import { FaCoins, FaDollarSign, FaSearchDollar } from "react-icons/fa"
import Modal from "../Modal"
import { Link } from "react-router-dom"

type Props = {
    id: number,
    rarity: string,
    name: string,
    slug: any,
    description: string,
    lens_cost: any,
    cost: any,
    icon: any,
    showBtn?: boolean,
    showPrice?: boolean,
    color: any
}

type SelectedGlass = {
    id: number,
    rarity: string,
    name: string,
    description: string,
    lens_cost: any,
    cost: any,
    icon: any
}

const GlassCard = ({id,slug,rarity,name,description,lens_cost,icon,color,cost, showBtn = true, showPrice = true}:Props) => {
    const { setShowModal } = useUI();

    return(
        <>
        <div
          key={id}
          className="shadow-2xl flex flex-col items-center justify-center w-full max-w-6xl mx-auto rounded-2xl bg-white p-2"
        >
          <div className="flex flex-col items-center justify-center text-center">
            <div className={`${color ? `bg-${color}` : 'bg-(--owner)'} rounded-lg p-3 mb-3 flex items-center justify-center`}>
              <img src={`${icon}`}
              className="w-50 h-50 object-contain mx-auto"
              alt={icon} />
            </div>
            <h4 className="font-semibold text-lg truncate w-full">
              {name}
            </h4>
            {showPrice && (
                <div className="flex items-center gap-2 mb-1 text-sm text-gray-700">
                <FaDollarSign className="text-[var(--owner)]" />
                <span>{cost?.toLocaleString()}</span>
                </div>
            )}
            {showBtn && (
            <Link
            to={`/tradfi`}
            className={`${classMap.button()}`}
            >
              <FaSearchDollar className="inline mr-1" /> Buy Glass
            </Link>
            )}
          </div>
        </div>
        </>
    )
}

export default GlassCard