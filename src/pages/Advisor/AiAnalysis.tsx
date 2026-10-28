import { appUrl } from "@/dapp";
import { Loading } from "@/components/Tools/Misc";
import axios from "axios";
import { useEffect, useState } from "react";

type Props = {};

const AiAnalysis = ({}: Props) => {
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const aiData = async () => {
    try {
      const res = await axios.post(`${appUrl}/testForAiData`);
      console.log(res);
      setIsLoading(false);
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    aiData();
  }, []);

  return (
    <>
      <input type="text" name="" id="" />
    </>
  );
};

export default AiAnalysis;
