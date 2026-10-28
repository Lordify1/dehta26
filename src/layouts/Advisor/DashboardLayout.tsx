import React, { useEffect, useState } from "react";
import {
  FaBars,
  FaConnectdevelop,
  FaSearchDollar,
  FaSignOutAlt,
  FaTimes,
  FaWallet,
} from "react-icons/fa";
import { advisorName, advisorUrl, appName, appUrl } from "@/dapp";
import { LoadingDiv, classMap, buttonClass } from "@/components/Tools/Misc";
import { FaGlasses } from "react-icons/fa";
import { founderSidebar } from "@/data/founderSidebarData";
import { investorSidebar } from "@/data/investorSidebarData";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import axios from "axios";
import { apiUrl } from "../../App";
import { FormatAmount, Lens, PresaleBtn } from "../../components/Tools/Misc";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";

type Props = {
  children: React.ReactNode;
  sidebarData: any;
  sidebarDataType: string;
  title?: string;
  classy?: any;
};

const DashboardLayout = ({ children, sidebarData, classy }: Props) => {
  const { user, setRole, setSidebarData, Logout } = useUser();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [sidebar, setSidebar] = useState(sidebarData);
  const location = useLocation();
  const { open } = useAppKit();
  const { isConnected, address } = useAppKitAccount();

  const currentPage = (path: string) => {
    const classes =
      location.pathname === path
        ? "text-(--owner) bg-black rounded-md p-1"
        : "";
    return classes;
  };

  const [lens, setLens] = useState(user?.total_lens || 0);
  const [glasses, setGlasses] = useState(user?.total_glasses || 0);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    if (user?.role === "founder") {
      setSidebar(founderSidebar);
      setSidebarData(founderSidebar);
      setRole(user.role);
    } else if (user?.role === "investor") {
      setSidebar(investorSidebar);
      setSidebarData(investorSidebar);
      setRole(user.role);
    } else {
      setSidebar(founderSidebar);
      setSidebarData(founderSidebar);
      setRole(user?.role);
    }
  }, []);

  return (
    <>
      <div
        className={`flex flex-row min-h-screen text-primary ${classy ? classy : "dbBg"}`}
      >
        {/* SIDEBAR */}
        <aside
          className={`fixed md:static top-0 left-0 z-50 w-56 bg-accent border-r border-border p-6 transform transition-transform duration-200 
            h-screen flex flex-col justify-between 
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
          {/* TOP NAV BUTTONS */}
          <nav className="flex flex-col space-y-4">
            {sidebar?.map(({ label, path, icon }: any, i: number) => (
              <Link
                key={i}
                replace={true}
                to={appUrl + path}
                className={`flex items-center gap-3 hover:bg-background px-4 py-2 rounded-md transition cursor-pointer ${path.includes("buildfi") ? "text-[#39ff6a]" : ""} ${currentPage(path)}`}
              >
                <span className={`${currentPage(path)}`}>{icon}</span>
                <h5 style={{ color: "#39ff6a" }}>{label}</h5>
              </Link>
            ))}
          </nav>

          {/* USER INFO + LENS + LOGOUT */}
          <div className="mt-6 border-t border-border pt-6">
            {/* Lens + Glasses */}
            <div className="flex flex-row gap-2 mb-4">
              <div className={`${classMap.tempBtn} bg-black`}>
                <FaGlasses className="inline mr-1" /> <span>{glasses}</span>
              </div>

              <div className={`${classMap.tempBtn} bg-black`}>
                {Lens()}{" "}
                <span>
                  <FormatAmount amount={lens} />
                </span>
              </div>
            </div>
            {/* Avatar + Username */}
            <div className="flex items-center gap-3">
              <img
                src={user?.avatar || "/logo.svg"}
                className="w-10 h-10 rounded-full object-cover shadow-lg"
              />
              <div className="text-sm font-medium">
                {user?.username || "User"}
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={Logout}
              className="mt-4 flex items-center gap-3 text-red-600 hover:opacity-70 transition ms-2"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT WRAPPER */}
        <div className="flex min-w-0 w-full max-w-full flex-col flex-1 overflow-x-hidden max-h-screen">
          {/* HEADER (Connect + Glass + Lens ONLY) */}
          <header className="bg-accent border-b border-border px-6 py-4 flex w-full items-center justify-between">
            <Link to={`/`} className="w-15">
              <img src={`/logo.svg`} alt="Dehta+Logo" loading="lazy" />
            </Link>

            <div className="flex items-center gap-4">
              <button
                id="apTrigger"
                title={isConnected ? "Wallet connected" : "Connect wallet"}
                onClick={() =>
                  open({ view: isConnected ? "Account" : "Connect" })
                }
                className="text-[#e2b657] transition"
              >
                <FaWallet />
              </button>
              <button
                onClick={Logout}
                className="flex items-center text-red-600 hover:opacity-70 transition"
              >
                <FaSignOutAlt />
              </button>
            </div>
          </header>

          {/* SCROLLABLE PAGE CONTENT */}
          <section className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto p-2 lg:p-3 pb-15 lg:pb-0">
            {children}
          </section>
        </div>

        <PresaleBtn />

        {/* <PayWithDePay amount={0.05}/> */}

        {/* MOBILE BOTTOM NAV */}
        <nav className="fixed bottom-0 left-0 right-0 bg-accent border-t border-border flex justify-around items-center py-3 z-50 shadow-lg md:hidden">
          {sidebar?.map(({ label, path, icon }: any, index: number) => (
            <Link
              key={index}
              replace={true}
              to={appUrl + path}
              className={`flex flex-col items-center text-[#e2b657] transition ${currentPage(path)} `}
            >
              <span className="text-lg">{icon}</span>
              <small className="text-xs" style={{ color: "#39ff6a" }}>
                {label}
              </small>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default DashboardLayout;
