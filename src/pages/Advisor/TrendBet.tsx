import { appName, appUrl } from "@/dapp";
import TrendBetCreatorForm from "@/components/Advisor/Forms/TrendBetCreatorForm";
import {
  classMap,
  emptyData,
  LoadingDiv,
  TrendCreateBtn,
} from "@/components/Tools/Misc";
import TrendCard from "@/components/ui/Advisor/TrendCard";
import TrendDetail from "@/components/ui/Advisor/TrendDetail";
import Offcanvas from "@/components/ui/Offcanvas";
import { useMisc } from "@/context/MiscContext";
import { useOffCanvas } from "@/context/OffCanvasContext";
import { useUser } from "@/context/UserContext";
import DashboardLayout from "@/layouts/Advisor/DashboardLayout";
import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  FaChartLine,
  FaPen,
  FaPlusCircle,
  FaRegCalendarPlus,
  FaSearch,
} from "react-icons/fa";
import {
  DehtaConstruct,
  emptyResult,
  TrendCarousel,
} from "../../components/Tools/Misc";
import { Link } from "react-router-dom";

const TrendBet = () => {
  const { user, role, sidebarData, userTrends } = useUser();
  const {
    selectedTrend,
    setSelectedTrend,
    trends,
    isLoading,
    setIsLoading,
    getTrends,
  } = useMisc();
  // const [userTrends, setUserTrends] = useState([]);
  const { setShowOffCanvas, OffId, Offtitle, setOffId, SetOfftitle } =
    useOffCanvas();
  const [search, setSearch] = useState("");
  const [displayedTrends, setDisplayedTrends] = useState([]);
  const [limit, setLimit] = useState(20);
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntro(false), 1000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    // setUserTrends(user?.trends)

    getTrends();

    if (!trends) return;
    setIsLoading(false);

    const filtered = trends.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.body.toLowerCase().includes(search.toLowerCase()),
    );

    setDisplayedTrends(filtered.slice(0, limit));

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300
      ) {
        setLimit((prev) => prev + 10);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [search, limit, trends, selectedTrend]);

  return (
    <>
      <Helmet>
        <title>TrendBet - {appName}</title>
      </Helmet>
      {isLoading ? (
        <DashboardLayout
          user={user}
          sidebarData={sidebarData}
          sidebarDataType={`${role}`}
          classy="trendBg"
        >
          <LoadingDiv layout={[[3], [2], [1]]} height="h-20" />
        </DashboardLayout>
      ) : (
        <>
          <DashboardLayout
            user={user}
            sidebarData={sidebarData}
            sidebarDataType={`${role}`}
            classy="trendBg"
          >
            <div className="flex flex-col">
              {intro ? (
                <div className="flex min-h-[55vh] items-center justify-center">
                  <img src="/logo.svg" alt="Dehta" className="heat-logo" />
                </div>
              ) : (
                <>
                  <div className="z-board">
                    <div className="z-arm upper">
                      {user?.trendbet_role === "creator" ? (
                        <button
                          className="text-left"
                          onClick={() => {
                            setOffId("CreateTrend");
                            setShowOffCanvas(true);
                            SetOfftitle("Create Trend");
                          }}
                        >
                          <p className="text-2xl font-semibold">
                            Create a trend
                          </p>
                          <p className="mt-1 text-sm text-white/70">
                            Post a trend for others to vote on.
                          </p>
                        </button>
                      ) : (
                        <>
                          <p className="text-2xl font-semibold">
                            Purchase an NFT to create a trend
                          </p>
                          <Link
                            to="/tradfi"
                            className="mt-2 inline-block text-[#d6ff3a] underline"
                          >
                            Buy NFT
                          </Link>
                        </>
                      )}
                    </div>
                    <div className="z-arm lower">
                      <p className="text-2xl font-semibold">
                        Vote other people's trends
                      </p>
                      <p className="mt-1 text-sm text-white/70">
                        Participate in active trends created by others.
                      </p>
                    </div>
                  </div>
                  {user?.trendbet_role === "creator" && (
                    <section className={`flex flex-col p-3 rounded-2xl`}>
                      <div className="mb-3">
                        <div className="flex flex-row">
                          <h1 className="text-3xl lg:text-5xl">Your Trends</h1>
                        </div>
                        <small>View the Progress of Trends you Created</small>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 w-full p-3">
                        {userTrends && userTrends.length > 0 ? (
                          userTrends.length === 1 ? (
                            <TrendCard
                              {...userTrends[0]}
                              data={userTrends[0]}
                            />
                          ) : (
                            <div className="col-span-4 w-full">
                              <TrendCarousel trends={userTrends} />
                            </div>
                          )
                        ) : (
                          <div className="flex flex-col col-span-4 w-full opacity-50">
                            {emptyResult("Your Trends will Show Here")}
                          </div>
                        )}
                      </div>
                    </section>
                  )}

                  <section className={"flex flex-col mt-2"}>
                    <div className="w-full flex items-center gap-2 bg-white/10 p-3 rounded-xl mb-4">
                      <FaSearch className="text-xl opacity-50" />
                      <input
                        type="text"
                        placeholder="Search Trends..."
                        className="bg-transparent outline-none flex-1"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full p-3">
                      {isLoading ? (
                        <LoadingDiv layout={[[1]]} height="h-30" />
                      ) : displayedTrends && displayedTrends.length > 0 ? (
                        displayedTrends.map((trend, key) => {
                          return (
                            <TrendCard
                              {...trend}
                              data={trend}
                              clickFunction={() => {
                                setSelectedTrend([]);
                              }}
                            />
                          );
                        })
                      ) : (
                        <div className="flex flex-col col-span-4 w-full opacity-50">
                          {emptyData("No Trend to Bet On Yet")}
                        </div>
                      )}
                    </div>
                  </section>
                </>
              )}
            </div>
          </DashboardLayout>
          {/* {<TrendCreateBtn/>} */}

          {/* Create Trend  */}
          <Offcanvas
            title={Offtitle}
            width={`${OffId === "viewTrend" && "lg:w-[500px] w-full"}`}
          >
            {OffId === "CreateTrend" && <TrendBetCreatorForm />}
            {OffId === "viewTrend" &&
              selectedTrend &&
              selectedTrend.length > 0 && <TrendDetail data={selectedTrend} />}
          </Offcanvas>
          {/* View Trend  */}
        </>
      )}
    </>
  );
};

export default TrendBet;
