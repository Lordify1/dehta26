import { Helmet } from "react-helmet-async";
import { appName } from "@/dapp";
import DashboardLayout from "../../layouts/Advisor/DashboardLayout";
import { useUser } from "@/context/UserContext";
import { Desk } from "@/components/tradfi/desk";
import "./tradfi.css";

const Market = () => {
  const { user, role, sidebarData } = useUser();

  return (
    <>
      <Helmet>
        <title>TradFi - {appName}</title>
      </Helmet>
      <DashboardLayout
        user={user}
        sidebarData={sidebarData}
        sidebarDataType={`${role}`}
        classy={"bg-background"}
      >
        <div className="tradfi-root" style={{ zoom: 0.78, maxWidth: "100%" }}>
          <Desk />
        </div>
      </DashboardLayout>
    </>
  );
};

export default Market;
