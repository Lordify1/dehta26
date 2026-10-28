// ProjectDetail.tsx

import { advisorUrl, appName, appUrl } from "@/dapp";
import { RateForm, RatesDiv } from "@/components/Advisor/Forms/RateForm";
import {
  classMap,
  colorMap,
  emptyData,
  emptyResult,
  LensButton,
  LoadingDiv,
} from "@/components/Tools/Misc";
import ProjectCard from "@/components/ui/Advisor/ProjectCard";
import ProjectLike from "@/components/ui/Advisor/ProjectLike";
import Offcanvas from "@/components/ui/Offcanvas";
import { useUser } from "@/context/UserContext";
import LandingLayout from "@/layouts/Advisor/LandingLayout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  FaEye,
  FaHeart,
  FaMinus,
  FaPlus,
  FaSearchDollar,
  FaStar,
  FaFile,
  FaUpload,
  FaCheckCircle,
  FaExclamationCircle,
  FaSpinner,
  FaCircleNotch,
  FaBriefcase,
  FaTwitter,
  FaInstagram,
  FaTiktok,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaDiscord,
  FaTelegram,
  FaReddit,
  FaMedium,
  FaGlobe,
  FaMap,
  FaGithub,
  FaBitcoin,
  FaLink,
  FaBlog,
  FaEnvelope,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import AiAnalysis from "./AiAnalysis";
import AiLensOffcanvas from "@/components/Advisor/AiLensOffcanvas";
import Projects from "./Projects";
import { apiUrl } from "../../App";
import Layout from "../components/Layout";

const ProjectDetail = () => {
  const { user } = useUser();

  // console.log(user)

  const { id, slug } = useParams();

  const [project, setProject] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [hidden, setHidden] = useState({
    description: false,
    problem: false,
    solution: false,
    team: false,
    summary: false,
    founder: false,
  });

  const links = [
    { name: "Twitter", icon: React.createElement(FaTwitter) },
    { name: "Instagram", icon: React.createElement(FaInstagram) },
    { name: "Tiktok", icon: React.createElement(FaTiktok) },
    { name: "Facebook", icon: React.createElement(FaFacebook) },
    { name: "Linkedin", icon: React.createElement(FaLinkedin) },
    { name: "Youtube", icon: React.createElement(FaYoutube) },
    { name: "Discord", icon: React.createElement(FaDiscord) },
    { name: "Telegram", icon: React.createElement(FaTelegram) },
    { name: "Reddit", icon: React.createElement(FaReddit) },
    { name: "Medium", icon: React.createElement(FaMedium) },
    { name: "Website", icon: React.createElement(FaGlobe) },
    { name: "Whitepaper", icon: React.createElement(FaGlobe) },
    { name: "Roadmap", icon: React.createElement(FaMap) },
    { name: "Github", icon: React.createElement(FaGithub) },
    { name: "BitcoinTalk", icon: React.createElement(FaBitcoin) },
    { name: "CoinMarketCap", icon: React.createElement(FaLink) },
    { name: "CoinGecko", icon: React.createElement(FaLink) },
    { name: "BlockChain Explorer", icon: React.createElement(FaLink) },
    { name: "NFT Marketplace", icon: React.createElement(FaLink) },
    { name: "Email", icon: React.createElement(FaEnvelope) },
    { name: "Blog", icon: React.createElement(FaBlog) },
    { name: "Podcast", icon: React.createElement(FaMap) },
    { name: "Forum", icon: React.createElement(FaMap) },
  ];

  const fetchProject = async () => {
    const data = await axios.post(`${apiUrl}/api/project/get/${id}/${slug}`);
    setProject(data.data.project);
    // console.log(data.data?.project?.aiAnalysis);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProject();
  }, []);

  const user_id = user ? user?.id : null;
  const guest = user ? false : true;

  const isOwner = project?.user_id === user?.id;
  const isDraft = project?.status === "draft" ? true : false;

  if (!isOwner && isDraft) window.location.href = appUrl + "/404";

  const toggleView = (section: keyof typeof hidden) => {
    setHidden((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const hideOrNot = (section: keyof typeof hidden) => {
    return hidden[section] ? "hidden" : "";
  };

  const toggleIcon = (section: keyof typeof hidden) => {
    return hidden[section] ? <FaPlus /> : <FaMinus />;
  };

  return (
    <Layout>
      <Helmet>
        <title>
          {`${project?.name || ""} -`} {appName}
        </title>
      </Helmet>
      <div
        className={`w-full fade-in transition-opacity duration-500 min-h-screen bg-background text-primary px-4 py-5 mt-20`}
      >
        {isDraft && (
          <div
            className={`w-full min:h-10 p-2 text-center bg-(--warning) flex items-center text-secondary justify-center mb-2`}
          >
            <h6 className="text-sm">
              Viewing as <b>Draft</b>. Your project is not visible to others.
              Toggle the button on your project card on your dashboard to
              publish it
            </h6>
          </div>
        )}
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 👉 Left Column (Comments & Engagement) */}
          <div className="lg:col-span-3 order-2 lg:order-1 space-y-4">
            {isLoading ? (
              <div className="w-full">
                <LoadingDiv />
              </div>
            ) : (
              <ProjectLike
                likes={project?.likes_count}
                project_id={project?.id}
                user_id={user_id}
                guest={guest}
                user={user}
                auth={user?.user}
                slug={project?.slug}
              />
            )}

            {/* Rate Form */}
            {!isOwner ? (
              isLoading ? (
                <div className="w-full">
                  <LoadingDiv height="h-40" />
                </div>
              ) : (
                <RateForm projectID={project?.id} showBtn={true} auth={user} />
              )
            ) : null}

            {/* Ratings  */}
            {isLoading ? (
              <div className="w-full">
                <LoadingDiv height="h-40" />
              </div>
            ) : (
              <RatesDiv id={project?.id} />
            )}
          </div>

          {/* 🎯 Center Column (Project Details) */}
          <div className="lg:col-span-6 order-1 space-y-6">
            {/* 🧭 HEADER */}
            {isLoading ? (
              <div className="w-full">
                <LoadingDiv height="h-25" />
              </div>
            ) : (
              <div
                className={`${classMap.pageSection()} border border-border transition-all duration-300`}
              >
                <div className="flex flex-row lg:flex-row lg:items-center space-y-3 lg:space-y-0 space-x-4">
                  <img
                    src={project.logo || "/logo.svg"}
                    alt="Project Logo"
                    className="rounded-full w-20 h-20 object-cover border-2 border-accent shadow-md transitions duration-300"
                  />
                  <div className="flex-1">
                    <h2
                      className={`${classMap.cardTitle()} text-2xl font-bold`}
                    >
                      {project.name}
                    </h2>
                    <h5 className="text-sm text-primary mt-1">
                      {project.short_pitch || ""}
                    </h5>
                    <p className="text-sm text-primary mt-1">
                      {project.industry} · {project.stage} · {project.rating}
                      <FaStar className={classMap.inlineIcon()} />
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Links  */}
            {isLoading ? (
              <div className="w-full">
                <LoadingDiv />
              </div>
            ) : (
              <div
                className={`${classMap.pageSection()} p-1 min:h-10 transition-all duration-300 hover:border-border`}
              >
                <div className={`${classMap.sectionInfo()}`}>
                  <div className="flex flex-row">
                    {project.links && project.links.length > 0
                      ? project.links.map((item, index) => {
                          const match = links.find(
                            (link) => link.name === item.platform,
                          );
                          const matchingLink = match
                            ? match.icon
                            : item.platform;

                          return (
                            <Link
                              key={index}
                              className="inline mr-2 text-lg"
                              to={item.link}
                              target="_blank"
                            >
                              {matchingLink}
                            </Link>
                          );
                        })
                      : emptyData("No Links Yet")}
                  </div>
                </div>
              </div>
            )}

            {/* 📝 DESCRIPTION */}
            {isLoading ? (
              <div className="w-full">
                <LoadingDiv height="h-40" />
              </div>
            ) : (
              <div
                className={`${classMap.pageSection()} transition-all duration-300 hover:border-border`}
              >
                <div className={classMap.sectionHeaderDiv()}>
                  <h1 className={classMap.sectionHeader()}>Description</h1>
                  <button
                    onClick={() => toggleView("description")}
                    className={classMap.tooltipBtn()}
                    title="Toggle description"
                  >
                    {toggleIcon("description")}
                  </button>
                </div>
                <div
                  className={`${classMap.sectionInfo()} ${hideOrNot("description")}`}
                >
                  <p className="text-sm text-primary leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            )}

            {/* 🧍 FOUNDER */}
            {isLoading ? (
              <div className="w-full">
                <LoadingDiv height="h-40" />
              </div>
            ) : (
              <div
                className={`${classMap.pageSection()} hover:border-border transition`}
              >
                <div className={classMap.sectionHeaderDiv()}>
                  <h1 className={classMap.sectionHeader()}>Founder</h1>
                  <button
                    onClick={() => toggleView("founder")}
                    className={classMap.tooltipBtn()}
                    title="Toggle founder"
                  >
                    {toggleIcon("founder")}
                  </button>
                </div>
                {project?.founder ? (
                  <div
                    className={`flex items-center space-x-3 mt-3 ${hideOrNot("founder")}`}
                  >
                    <img
                      src={
                        project.founder.picture
                          ? project.founder.picture
                          : "/logo.svg"
                      }
                      alt={project.founder.name}
                      className="rounded-full w-12 h-12 border border-gray-600 hover:border-[#00ffb3] transition overflow-hidden"
                    />
                    <div>
                      <p className="font-semibold">{project.founder.name}</p>
                      <p className="text-sm text-primary">
                        {project.founder.description}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-primary italic mt-2">
                    Founder info not available.
                  </p>
                )}
              </div>
            )}

            {/* 🧾 PROBLEMS */}
            {/* 🛑 PROBLEMS */}
            {isLoading ? (
              <div className="w-full">
                <LoadingDiv height="h-40" />
              </div>
            ) : (
              <div
                className={`${classMap.pageSection()} hover:border-[#ff4d4f]/40`}
              >
                <div className={classMap.sectionHeaderDiv()}>
                  <h1 className={`${classMap.sectionHeader()} text-red-500`}>
                    Problem{project?.problems?.length > 1 ? "s" : ""}
                  </h1>
                  <button
                    onClick={() => toggleView("problem")}
                    className={classMap.tooltipBtn()}
                    title="Toggle problem"
                  >
                    {toggleIcon("problem")}
                  </button>
                </div>
                <div
                  className={`${classMap.sectionInfo()} ${hideOrNot("problem")}`}
                >
                  {project?.problems?.length > 0 ? (
                    <ul className="space-y-4">
                      {project.problems.map((item, i) => (
                        <li
                          key={item.id || i}
                          className={`${classMap.userCard()} flex items-start text-start gap-3 bg-red-900/2 rounded-md p-3 shadow`}
                        >
                          <span className="text-2xl text-red-400 mt-1">!</span>
                          <div>
                            <span className="block text-sm text-primary">
                              {item.problem}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-primary italic">
                      No problems listed.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* 💡 SOLUTIONS */}
            {isLoading ? (
              <div className="w-full">
                <LoadingDiv height="h-40" />
              </div>
            ) : (
              <div className={`${classMap.pageSection()} hover:border-border`}>
                <div className={classMap.sectionHeaderDiv()}>
                  <h1 className={classMap.sectionHeader()}>
                    Solution{project?.solutions?.length > 1 ? "s" : ""}
                  </h1>
                  <button
                    onClick={() => toggleView("solution")}
                    className={classMap.tooltipBtn()}
                    title="Toggle solution"
                  >
                    {toggleIcon("solution")}
                  </button>
                </div>
                <div
                  className={`${classMap.sectionInfo()} ${hideOrNot("solution")}`}
                >
                  {project?.solutions?.length > 0 ? (
                    <ul className="space-y-4">
                      {project.solutions.map((item, i) => (
                        <li
                          key={item.id || i}
                          className={`${classMap.userCard()} flex items-start gap-3 bg-[#1a2a1a] p-3 shadow`}
                        >
                          <span className="text-2xl mt-1 text-green-400">
                            ✔
                          </span>
                          <div>
                            <span className="block text-sm text-primary">
                              {item.solution}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-primary italic">
                      No solutions provided yet.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* 👥 TEAM */}
            {isLoading ? (
              <div className="w-full">
                <LoadingDiv height="h-40" />
              </div>
            ) : (
              <div className={`${classMap.pageSection()} hover:border-border`}>
                <div className={classMap.sectionHeaderDiv()}>
                  <h1 className={classMap.sectionHeader()}>Team</h1>
                  <button
                    onClick={() => toggleView("team")}
                    className={classMap.tooltipBtn()}
                    title="Toggle team"
                  >
                    {toggleIcon("team")}
                  </button>
                </div>
                <div
                  className={`${classMap.sectionInfo()} ${hideOrNot("team")}`}
                >
                  <p className={`${classMap.info()}`}>
                    {project.team_overview || "Team overview not added."}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {project?.team?.length > 0 ? (
                      project.team.map((member, key) => (
                        <div
                          key={key}
                          className="flex items-center space-x-3 bg-background border border-border rounded-md p-3 hover:border-[var(--owner)] transition"
                        >
                          {/* <img
                          src={member.picture ? member.picture : "https://placehold.co/40x40"}
                          alt={member.name}
                          className="rounded-full w-10 h-10"
                        /> */}
                          <div>
                            <p className="font-semibold">
                              {member.name}{" "}
                              <span className="text-sm text-primary">
                                | {member.role}
                              </span>
                            </p>
                            <p className="text-sm text-primary">
                              {member.description}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-primary italic">
                        No team members listed yet.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 📝 SUMMARY */}
            {isLoading ? (
              <div className="w-full">
                <LoadingDiv height="h-40" />
              </div>
            ) : (
              <div className={`${classMap.pageSection()} hover:border-border`}>
                <div className={classMap.sectionHeaderDiv()}>
                  <h1 className={classMap.sectionHeader()}>Summary</h1>
                  <button
                    onClick={() => toggleView("summary")}
                    className={classMap.tooltipBtn()}
                    title="Toggle summary"
                  >
                    {toggleIcon("summary")}
                  </button>
                </div>
                <div
                  className={`${classMap.sectionInfo()} ${hideOrNot("summary")}`}
                >
                  <div className="grid grid-cols-1 gap-2 text-sm text-primary">
                    <div
                      className={`${classMap.userCard()} ${classMap.hoverAnimate()}`}
                    >
                      <h1 className={`${classMap.cardTitle}`}>
                        Target Market:
                      </h1>
                      <span>{project.target_market || "N/A"}</span>
                    </div>
                    <div
                      className={`${classMap.userCard()} ${classMap.hoverAnimate()}`}
                    >
                      <h1 className={`${classMap.cardTitle}`}>
                        Business Model:
                      </h1>
                      <span>{project.business_model || "N/A"}</span>
                    </div>
                    <div
                      className={`${classMap.userCard()} ${classMap.hoverAnimate()}`}
                    >
                      <h1 className={`${classMap.cardTitle}`}>
                        Financial Summary:
                      </h1>
                      <span>{project.financials_summary || "N/A"}</span>
                    </div>
                    <div
                      className={`${classMap.userCard()} ${classMap.hoverAnimate()}`}
                    >
                      <h1 className={`${classMap.cardTitle}`}>Tech Stack:</h1>
                      <span>{project.tech_stack || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 🤝 Right Column (Similar Projects) */}
          <div className="lg:col-span-3 order-3 lg:order-3 space-y-4">
            {isLoading ? (
              <div className="w-full">
                <LoadingDiv height="h-50" />
              </div>
            ) : (
              <div className={`${classMap.pageSection()}`}>
                <h1 className={`${classMap.sectionHeader()}`}>
                  Similar Projects
                </h1>
                {project.similar && project.similar.length > 0
                  ? project.similar.map((item, index) => {
                      return (
                        <ProjectCard
                          key={item.id}
                          {...item}
                          userId={user?.id}
                          authUserId={item?.user_id}
                          more={item?.id}
                        />
                      );
                    })
                  : emptyResult("No Similar Project Found")}
              </div>
            )}
          </div>
          {/* <LensButton projectName={project.name}/> */}
          <Offcanvas title={`Project Analysis`}>
            <AiLensOffcanvas
              projectId={project.id}
              projectName={project.name}
              lensData={project.aiAnalysis}
            />
          </Offcanvas>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectDetail;
