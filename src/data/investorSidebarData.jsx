import { FaBriefcase, FaHome, FaUser, FaSignOutAlt, FaStore, FaWallet, FaChartLine, FaDollarSign } from "react-icons/fa";


export const investorSidebar = [
    { 
      label: "Dashboard",
      path: "/dashboard",
      icon: <FaHome className="text-[#e2b657]"/>
    },
    { 
      label: "Buildfi",
      path: "/buildfi",
      icon: <FaBriefcase className="text-[#e2b657]"/> 
    },
    { 
      label: "TrendBet",
      path: "/trendbet",
      icon: <FaChartLine className="text-[#e2b657]"/> 
    },
    {
      label: "TradFi",
      path: "/tradfi",
      icon: <FaStore className="text-[#e2b657]"/>,
      seperate: true,
    },
    {
      label: "EarnFi",
      path: "/earnfi",
      icon: <FaDollarSign className="text-[#e2b657]"/>,
      seperate: true,
    },
    {
      label: "Profile",
      path: "/profile",
      icon: <FaUser className="text-[#e2b657]"/>,
      seperate: true,
      first: true
    }
  ];
