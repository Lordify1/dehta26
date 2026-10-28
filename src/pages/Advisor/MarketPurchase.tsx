import { Helmet } from "react-helmet-async";
import { advisorUrl, appName, appUrl } from "@/dapp";
import {
  ComingSoon,
  DehtaConstruct,
  emptyData,
  Loading,
  LoadingDiv,
} from "../../components/Tools/Misc";
import DashboardLayout from "../../layouts/Advisor/DashboardLayout";
import { useUser } from "@/context/UserContext";
import axios from "axios";
import { apiUrl } from "../../App";
import { useEffect, useState } from "react";
import { FaDollarSign, FaSearchDollar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import GlassCard from "../../components/ui/Advisor/GlassCard";
import { toast } from "react-toastify";

const MarketPurchase = () => {
  const { user, role, sidebarData } = useUser();
  const { item, slug } = useParams();
  const [glasses, setGlasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedGlass, setSelectedGlass] = useState(null);
  const [product, setProduct] = useState([]);

  const getItem = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/market/get/${item}/${slug}`);

      console.log(res);
      setProduct(res.data);
      setIsLoading(false);
    } catch (err) {
      toast.error("Error Fetching Glass. Refresh Page");
      console.log(err);
    }
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <>
      <Helmet>
        <title>
          {`${product && product.name}`} - {appName}
        </title>
      </Helmet>
      <DashboardLayout
        user={user}
        sidebarData={sidebarData}
        sidebarDataType={`${role}`}
        classy={"bg-background"}
      >
        {isLoading ? (
          <LoadingDiv />
        ) : (
          item === "glass" && (
            <section className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center w-full space-y-6"></section>
          )
        )}
      </DashboardLayout>
    </>
  );
};

export default MarketPurchase;
