import { appName, appUrl } from "@/dapp";
import { classMap, emptyResult } from "@/components/Tools/Misc";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Not Found - {appName}</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center h-[100vh] bg-background">
        {emptyResult("PAGE NOT FOUND")}
        <Link
          to={`${appUrl}/`}
          replace={true}
          className={`${classMap.buttonJsx({})}`}
        >
          Return Home
        </Link>
      </div>
    </>
  );
};

export default NotFound;
