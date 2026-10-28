import React, { useState } from "react"
import {faq} from "@/data/indexData"
import { classMap, SlideRight } from "../../components/Tools/Misc"
import { FaMinus, FaPlus } from "react-icons/fa";



const FAQ = () => {

    const [hidden, setHidden] = useState({
        one: false,
        two: true,
        three: true,
        four: true,
        five: true,
        six: true,
        seven: true
      });
    
    const hideOrNot = (section: keyof typeof hidden) => {
        return hidden[section] ? 'hidden' : '';
    };
    
    const toggleIcon = (section: keyof typeof hidden) => {
        return hidden[section] ? <FaPlus className={`text-primary`} /> : <FaMinus className={`text-black`}/>;
    };

    const toggleView = (section: keyof typeof hidden) => {
        setHidden((prev) => ({
        ...prev,
        [section]: !prev[section]
        }));
    };

      

    return(
    <section
      id="faq"
      className="relative text-(--primary) py-10 px-6 sm:px-16 overflow-hidden"
    >
      <div className="grid grid-cols-1 gap-4 mx-auto max-w-7xl">
        <h1 className="text-3xl lg:text-6xl mb-4">Frequently Asked Questions</h1>
        {faq.map((it:any, ind:any) => {
            return(
              <SlideRight delay={7} threshold={0.70}>
                <div className={`${classMap.indexFaqCard()} ${hidden[it.key] === true ? '' : 'bg-(--owner)'} transition-all transform-content duration-300`}>
                    <section className="flex flex-row justify-between items-center p-2">
                        <h4 className={`text-2xl lg:text-4xl ${hidden[it.key] === true ? 'text-primary' : 'text-black'}`}>{it.label}</h4>
                        <button
                          onClick={() => toggleView(it.key)}
                          title="Toggle description"
                        >
                          {toggleIcon(it.key)}
                        </button>
                    </section>
                    <section className={`text-black ${hideOrNot(it.key)} p-2`}>
                        <span>{it.text}</span>
                    </section>
                </div>
              </SlideRight>
            )
        })}
      </div>
    </section>
    )
}


export default FAQ