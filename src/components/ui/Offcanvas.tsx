import React, { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import { OffCanvasContext } from "@/context/OffCanvasContext";
import { classMap } from "../Tools/Misc";

export default function Offcanvas({ title, children, width = "w-full md:w-[400px]" }: {title:string, children:any, width?:string}) {
  const { showOffCanvas, setShowOffCanvas } = useContext(OffCanvasContext);
  const [fullView, setFullView] = useState(false);

  return (
    <div
      className={`${classMap.dehtaBorder()} fixed inset-0 z-9999999999999 transition-all duration-50 ${
        showOffCanvas ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-50  ${
          showOffCanvas ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setShowOffCanvas(false)}
      />

      {/* Slide-in panel */}
      <div
        className={`fixed left-0 top-0 h-full  bg-accent shadow-2xl transition-transform duration-50 rounded-4xl ${
          showOffCanvas ? "translate-x-0" : "translate-x-full"
        } ${width} overflow-y-auto p-6`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-primary truncate w-70">{title}</h2>
          {/* <div className="flex flex-row"> */}
            <button
            onClick={() => setShowOffCanvas(false)}
            className="text-primary hover:text-red-500 transition"
          >
            <IoClose size={26} />
          </button>
          {/* <button>
          </button>
          </div> */}
        </div>
        <div className="text-primary">{children}</div>
      </div>
    </div>
  );
}
