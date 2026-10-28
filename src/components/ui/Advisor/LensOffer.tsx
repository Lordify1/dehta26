import { classMap } from "@/components/Tools/Misc"
import React from "react"
import { FaCoins, FaIcons } from "react-icons/fa"



type Props = {
    id: number,
    name: string,
    icon: any,
    description: any,
    price: any,
    lens_value: any
}

const LensOffer = ({id,name,icon,description,price,lens_value}: Props) => {
    return(
        <div
          key={id}
          className={`${classMap.userCard(1)}`}
        >
          <div className="flex flex-col items-center justify-center">
              <h4 className={`${classMap.projectTitle}`}>
                  {name}
              </h4>
            <span className="text-3xl mb-2">{icon}</span>
            <p className="text-sm mb-2">{description}</p>
            <div className="flex flex-col items-center text-sm mb-3">
              <span className="text-[var(--owner)] font-semibold">
               Pay ${price}
              </span>
              <span className="text-[var(--muted-foreground)]">
               Get {lens_value.toLocaleString()} Lens
              </span>
            </div>
            <button
              className={`${classMap.buttonJsx({})}`}
            >
              <FaCoins className="inline mr-1" /> Buy Lens
            </button>
          </div>
        </div>
    )
} 

export default LensOffer