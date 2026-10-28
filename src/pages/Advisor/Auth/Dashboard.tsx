import react, { useEffect, useState } from "react";
import FounderDashboard from "../Founder/FounderDashboard";
import InvestorDashboard from "../Investor/InvestorDashboard";
import { authCheck } from "@/components/Tools/Misc";
import axios from "axios";
import { advisorUrl } from "@/dapp";
import { useUser } from "@/context/UserContext";

export default function UserDashboard() {
  const [project, setProject] = useState([]);
  const [dbData, setDbData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const { user } = useUser();

  // if(user?.user?.role === 'founder'){
  //     useEffect(() => {
  //         axios.post(`${advisorUrl}/project/get/project`)
  //         .then((res) => {
  //             // console.log(res);
  //             setProject(res?.data?.project);
  //             setSuggestions(res?.data?.suggestions);
  //         })
  //         .catch((err) => console.log(err))
  //     }, [])
  // }

  return user?.role === "founder" ? (
    <FounderDashboard />
  ) : (
    <InvestorDashboard />
  );
}
