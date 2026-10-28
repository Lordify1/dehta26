// resources/js/Components/Header.tsx
import { appUrl, advisorUrl } from "@/dapp";
import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { classMap } from "../Tools/Misc";
import { Link } from "react-router-dom";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-[#0d0f11]/80 backdrop-blur border-b border-[#1e1f22]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-[#3dffc5] font-bold text-xl tracking-wide">
          <img src={`${appUrl}/assets/images/phi/favicon.ico`} alt="" />
        </Link>

        {/* Desktop Nav */}
        {/* <nav className="hidden md:flex gap-8 text-sm text-white">
          <Link to={`${appUrl}/admin/dashboard`} className="hover:text-[#00ffb3] transition">Admin</Link>
          <Link to="/incubator" className="hover:text-[#00ffb3] transition">Incubator</Link>
          <Link to="/about" className="hover:text-[#00ffb3] transition">About</Link>
          <Link to="/contact" className="hover:text-[#00ffb3] transition">Contact</Link>
        </nav> */}

        {/* CTA */}
        <div className="hidden md:flex">
          <Link
            to={advisorUrl}
            // to={appUrl + '/under-construction'}
            className={`${classMap.button("", "", "", "", "right")}`}
          >
            Launch App
          </Link>
        </div>

        {/* Mobile Toggle */}
        {/* <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            {menuOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
          </button>
        </div> */}
        <div className="md:hidden">
          <Link
            to={appUrl + "/under-construction"}
            className={`${classMap.button()}`}
          >
            Launch App
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0d0f11] border-t border-[#1e1f22] px-6 pb-4 space-y-4 text-white">
          <Link to="/platform" className="block hover:text-[#00ffb3]">
            Platform
          </Link>
          <Link to="/incubator" className="block hover:text-[#00ffb3]">
            Incubator
          </Link>
          <Link to="/about" className="block hover:text-[#00ffb3]">
            About
          </Link>
          <Link to="/contact" className="block hover:text-[#00ffb3]">
            Contact
          </Link>
          <Link
            to={appUrl + "/under-construction"}
            className={`${classMap.button()}`}
          >
            Launch App
          </Link>
        </div>
      )}
    </header>
  );
};
