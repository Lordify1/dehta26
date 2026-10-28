import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { apiUrl, appUrl } from "@/dapp";
import { founderSidebar } from "@/data/founderSidebarData";
import { investorSidebar } from "@/data/investorSidebarData";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  // 🔐 auth state
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  // 🚀 boot-only loader (initial app hydration)
  const [isBooting, setIsBooting] = useState(true);

  // 🔄 action loader (logout, manual refresh, etc)
  const [userLoading, setUserLoading] = useState(false);

  // 📦 extras
  const [sidebarData, setSidebarData] = useState(null);
  const [project, setProject] = useState([]);

  const syncSidebar = (role) => {
    if (!role) return setSidebarData(null);
    setSidebarData(role === "founder" ? founderSidebar : investorSidebar);
  };

  const hydrateUser = async () => {
    try {
      await axios.get(`${apiUrl}/sanctum/csrf-cookie`, {
        withCredentials: true,
      });

      const isAuth = await axios.post(
        `${apiUrl}/api/auth-check`,
        {},
        { withCredentials: true },
      );

      if (!isAuth?.data) return;

      const res = await axios.post(
        `${apiUrl}/api/user`,
        {},
        { withCredentials: true },
      );

      if (res?.data) {
        setUser(res.data);
        setRole(res.data.role || null);
        syncSidebar(res.data.role);
      }
    } catch (err) {
      setUser(null);
      setRole(null);
      setSidebarData(null);
    } finally {
      // ❗ only ends once on app boot
      setIsBooting(false);
    }
  };

  useEffect(() => {
    hydrateUser();
  }, []);

  const getUser = async () => {
    setUserLoading(true);
    try {
      const res = await axios.post(
        `${apiUrl}/api/user`,
        {},
        { withCredentials: true },
      );

      if (res?.data) {
        setUser(res.data);
        setRole(res.data.role || null);
        syncSidebar(res.data.role);
      }
    } catch (err) {
      setUser(null);
      setRole(null);
      setSidebarData(null);
    } finally {
      setUserLoading(false);
    }
  };

  const Logout = async () => {
    setUserLoading(true);
    try {
      await axios.post(`${apiUrl}/api/logout`, {}, { withCredentials: true });

      setUser(null);
      setRole(null);
      setSidebarData(null);
      window.location.href = appUrl;
    } catch (err) {
      console.error(err);
    } finally {
      setUserLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        role,
        sidebarData,
        project,
        isBooting,
        userLoading,
        setUser,
        setRole,
        setSidebarData,
        syncSidebar,
        getUser,
        Logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
