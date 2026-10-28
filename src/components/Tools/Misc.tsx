import { advisorUrl, appUrl } from "@/dapp";
import { Link } from "react-router-dom";
import { Empty } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaBatteryEmpty,
  FaCircle,
  FaCircleNotch,
  FaGgCircle,
  FaPen,
  FaRegStar,
  FaSalesforce,
  FaSearchDollar,
  FaStar,
  FaTools,
} from "react-icons/fa";
import { IoCopy, IoStar, IoStarOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { useRef } from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Sparkles } from "lucide-react";
import { OffCanvasContext } from "@/context/OffCanvasContext";
import Offcanvas from "../ui/Offcanvas";
import TrendBetCreatorForm from "../Advisor/Forms/TrendBetCreatorForm";
import { apiUrl } from "../../App";
import useEmblaCarousel from "embla-carousel-react";
import TrendCard from "../ui/Advisor/TrendCard";
import SendRequest from "./SendRequest";

type InfoMessageProps = {
  message: string;
};

// tailwind components end

export const formClass =
  "bg-[#1b1b1b] border border-gray-700 text-white p-2 rounded-md";
export const buttonClass =
  "bg-[#00ffb3] hover:bg-[#a76e3d] hover:text-white text-black font-semibold py-2 px-4 rounded-2xl transitions duration-200";
export const inputClass = (width = "w-full") => {
  return `${width} bg-[#232323] border border-gray-600 text-white p-2 rounded-md focus:outline-none focus:${colorMap.border_primary}`;
};
export const labelClass = "block text-sm font-medium text-gray-300 mb-1";
export const cardClass = (col?: any) => {
  return `bg-accent flex border border-border rounded-lg shadow-md p-4${col ? ` col-span-${col}` : ""} text-center m-1 min-h-50 items-start`;
};
export const linkClass =
  "text-[#3dffc5] hover:underline hover:text-[#d8fff3] transitions duration-200";
export const errorClass = "text-red-500 text-sm mt-1";
export const successClass = "text-green-500 text-sm mt-1";
export const sectionClass = "mb-6";
export const headingClass = "text-xl font-bold text-white mb-2";
export const textareaClass =
  "bg-[#232323] border border-gray-600 text-white p-2 rounded-md w-full min-h-[80px] focus:outline-none focus:border-[#3dffc5]";
export const selectClass =
  "bg-[#232323] border border-gray-600 text-white p-2 rounded-md focus:outline-none focus:border-[#3dffc5]";
export const iconButtonClass =
  "p-2 rounded-full hover:bg-gray-700 transitions duration-200 text-gray-300";
export const dividerClass = "border-t border-gray-700 my-4";
export const smallTextClass = "text-xs text-gray-400";
export const modalClass =
  "fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50";
export const modalContentClass =
  "bg-[#232323] rounded-lg p-6 shadow-lg border border-gray-700";
export const tableClass =
  "min-w-full bg-[#232323] border border-gray-700 rounded-md";
export const tableHeaderClass = "bg-[#1b1b1b] text-gray-300 font-semibold";
export const tableCellClass = "px-4 py-2 border-b border-gray-700";
export const badgeClass = (type: string) => {
  return `inline-block px-2 py-1 rounded ${type === "success" ? "bg-[#0d6b52]" : "bg-red-700"} text-white text-xs font-semibold`;
};
export const disabledClass = "opacity-50 cursor-not-allowed";
export const containerDiv =
  "container inline-flex border border-gray-500 rounded-lg p-2 bg-[#1b1b1b]";
export const hoverClass = (color: string) => {
  return `hover:bg-${color}-500`;
};
export const projectCardClass =
  "bg-[#1e1e1e] border border-gray-700 rounded-lg p-4 text-white hover:shadow-lg transition";
export const projectTitleClass = "text-lg font-semibold mb-1";
export const projectMetaClass = "text-sm text-gray-400";
export const tagClass =
  "bg-[#0d6b52] text-white text-xs rounded-full px-2 py-1 mr-1";
export const centerFocus = (extra: string = "null") => {
  return `${extra} min-h-screen bg-[#0f0f0f] text-white flex flex-col items-center justify-center px-4 py-8`;
};
export const projectInfo = () => {
  return `border border-1 hover:border-[#00ffb3] rounded-md hover:rounded hover:text-white hover:opacity-100 m-1 p-2 transitions duration-200`;
};

export const ItemView = (
  item: string,
  data: string[] | number[] | string | number | undefined,
): React.ReactElement => {
  if (Array.isArray(data)) {
    if (item === "Attachments") {
      if (data.length > 0) {
        return (
          <div className="space-y-4">
            <div className="flex flex-col">
              {data.map((record: any, key: number) => {
                const ext =
                  typeof record === "string"
                    ? record.split(".").pop()?.toLowerCase()
                    : "";
                let icon = "";
                switch (ext) {
                  case "pdf":
                    icon = "📄";
                    break;
                  case "doc":
                  case "docx":
                    icon = "📝";
                    break;
                  case "xlsx":
                    icon = "📊";
                    break;
                  case "ppt":
                    icon = "📈";
                    break;
                  case "txt":
                    icon = "📃";
                    break;
                  case "gif":
                    icon = "🖼️";
                    break;
                  default:
                    icon = "📎";
                }
                return (
                  <a
                    key={key}
                    href={`${appUrl}/${record}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 mb-2 text-[#3dffc5] hover:underline"
                  >
                    {icon} {record}
                  </a>
                );
              })}
            </div>
          </div>
        );
      } else {
        return (
          <div className="space-y-4">
            <div className="flex flex-col">
              <p>No attachments available.</p>
            </div>
          </div>
        );
      }
    } else if (item === "Images") {
      if (data.length > 0) {
        return (
          <div className="space-y-4">
            <div className="flex flex-col">
              {data.map((record: any, key: number) => (
                <img
                  key={key}
                  src={`${appUrl}/${record}`}
                  alt=""
                  className="max-w-xs rounded mb-2"
                />
              ))}
            </div>
          </div>
        );
      } else {
        return (
          <div className="space-y-4">
            <div className="flex flex-col">
              <p>There are no Images in this Newsletter</p>
            </div>
          </div>
        );
      }
    }
  } else if (typeof data === "string" || typeof data === "number") {
    return (
      <div className="space-y-4">
        {typeof data === "string" ? (
          <span dangerouslySetInnerHTML={{ __html: data }} />
        ) : (
          <span>{data}</span>
        )}
      </div>
    );
  } else {
    return (
      <div className="space-y-4">
        <div className="flex flex-col">
          <p>No data available.</p>
        </div>
      </div>
    );
  }
};

// styles.ts

// tailwind components end

export const guestCheck = (auth: any, destination: string = "/dashboard") => {
  if (auth) {
    toast.success("You are signed in");
    return <Navigate to={destination} replace />;
  }
};

export const authCheck = (auth: any, destination: string = "/login") => {
  if (!auth) {
    toast.error("Login to Continue");
    return <Navigate to={destination} replace />;
  }
};

export const TimeAgo = (timestamp: any) => {
  const [relativeTime, setRelativeTime] = useState();

  try {
    const getTimeAgo = (time: any) => {
      const now = new Date();
      const past = new Date(time);
      console.log(past);
      const diff = Math.floor((now - past) / 1000);

      console.log(diff);

      if (diff < 60) return diff + " s ago";
      if (diff < 3600) return Math.floor(diff / 60) + " mins ago";
      if (diff < 86400) return Math.floor(diff / 3600) + " hs ago";
      if (diff < 2592000) return Math.floor(diff / 86400) + " ds ago";
      if (diff < 31104000) return Math.floor(diff / 2592000) + " mo ago";
    };

    useEffect(() => {
      setRelativeTime(getTimeAgo(timestamp));

      const interval = setInterval(() => {
        setRelativeTime(getTimeAgo(timestamp));
      }, 60000);
    }, [timestamp]);
  } catch (err) {
    console.log(err);
  }

  return <span>{relativeTime}</span>;
};

export const colorMap = {
  bg_primary: "bg-[#00ffb3]",
  bg_secondary: "bg-[#a76e3d]",
  bg_dark: "bg-[#0d0f11]",
  bg_muted: "bg-[oklch(0.556 0 0)]",
  text_primary: "text-[#00ffb3]",
  text_secondary: "text-[#a76e3d]",
  text_dark: "text-[#0d0f11]",
  text_muted: "text-[oklch(0.556 0 0)]",
  text_danger: "text-[var(--danger)]",
  border_primary: "border-[#00ffb3]",
  border_secondary: "border-[#a76e3d]",
  border_dark: "border-[#0d0f11]",
  border_danger: "border-[var(--danger)]",
};
//

export const emptyResult = (text: string) => {
  return (
    <div className="flex flex-col col-span-3 items-center justify-center w-full">
      <Empty
        description={<span className="text-primary">{text}</span>}
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    </div>
  );
};

export const emptyData = (text: string) => {
  return (
    <div className="flex flex-col col-span-3 items-center justify-center w-full">
      <Empty
        description={<span className="text-primary">{text}</span>}
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    </div>
  );
};

const roundedCondition = (direction: string) => {
  switch (direction) {
    case "left":
      return "rounded-l-2xl rounded-e-none";
      break;
    case "right":
      return "rounded-l-none rounded-e-2xl";
      break;
    case "down":
      return "rounded-l-none rounded-e-none rounded-b-2xl";
      break;
    case "":
      return "rounded-2xl";
      break;
    default:
      return "rounded-2xl";
      break;
  }
};

export const classMap = {
  subText: "text-white/80 text-lg sm:text-xl max-w-xl text-center",

  heroText:
    "text-white font-black text-5xl sm:text-6xl tracking-tight drop-shadow-xl",

  glassCard: (padding = "p-5") =>
    `backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.05)] text-white ${padding}`,

  glassEffect: (padding = "p-3", rounded = "rounded-4xl") =>
    `col-span-1 backdrop-blur-xl bg-white/5 border border-white/10 ${rounded} text-white ${padding}`,

  label: () => "flex text-white text-sm font-semibold mb-1 mt-1 items-center",

  input: (
    width = "w-full",
  ) => `${width} bg-white/10 backdrop-blur-sm border border-white/20
    rounded-xl p-3 text-white placeholder-white/40 focus:outline-none
    focus:border-[var(--owner)] transition-all`,

  select: (width = "w-full") => `
  ${width}
  bg-white/10 backdrop-blur-sm
  border border-white/20
  rounded-xl p-3 pr-10
  text-white
  focus:outline-none focus:border-[var(--owner)]
  transition-all

  appearance-none
  cursor-pointer

  bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='white'%3E%3Cpath d='M5.25 7.5L10 12.25L14.75 7.5' /%3E%3C/svg%3E")]
  bg-no-repeat bg-[right_0.75rem_center]
  bg-[length:1rem]
`,

  // index styling
  dehtaBorder: () => "border-2 border-[#616161]",

  // glassEffect: () => 'px-4 py-1 rounded-full bg-white/10 backdrop-blur-md',

  indexCard: () =>
    `${classMap.dehtaBorder()} text-primary rounded-3xl p-4 bg-gradient-to-b from-[#333333] via-[#000000] to-[#000000] duration-300 w-full`,

  iconBigPadding: () =>
    `backdrop-blur-xl bg-white/5 border border-white/10 p-3 rounded-md text-white`,

  dehtaCard: () =>
    `flex flex-col ${classMap.dehtaBorder("whiteBorder")} backdrop-blur-sm rounded-t-3xl rounded-b-md p-4 my-2 bg-gradient-to-b from-(--ceo) via-(--tbg) to-(--transparent)`,

  indexFaqCard: () =>
    `${classMap.dehtaBorder()} flex flex-col text-primary rounded-md w-full p-4`,

  form: "bg-[var(--accent)] border border-[var(--border)] text-[var(--primary)] p-3 rounded-md",

  h1: `text-2xl font-bold text-primary`,

  button: (
    bg?: string,
    hover?: string,
    text?: string,
    textsize?: string,
    direction: string = "left",
  ) =>
    `
  rounded-md
  px-4 py-2
  font-extrabold
  text-black
  bg-[radial-gradient(circle_at_center,#22c55e_0%,#16a34a_45%,#065f46_100%)]
  hover:bg-[radial-gradient(circle_at_center,#4ade80_0%,#22c55e_45%,#14532d_100%)]
  transition-all
  duration-300
  ${hover ?? ""}
  `,

  buttonJsx: ({
    bg,
    hover,
    text,
    textsize,
    direction = "down",
  }: {
    bg?: string;
    hover?: string;
    text?: string;
    textsize?: string;
    direction?: string;
  }) =>
    `${bg ? bg : "bg-transparent"} 
    ${hover ? `hover:${hover}` : "hover:bg-[var(--hover)]"} 
    ${text ? text : "text-[var(--primary)]"} 
    border-2 border-[var(--ceo)] 
    ${textsize || ""} font-semibold py-2 px-4 
    ${direction && roundedCondition(direction)} 
    hover:rounded-none transition duration-500`,

  // input: (width = "w-full") => `${width} ${classMap.dehtaBorder('white')} rounded-2xl p-2 transition-all focus:outline-none bg-gradient-to-b placeholder-muted from-[var(--tbg)] via-[var(--tbg)] to-[var()]`,

  // label: () => "block text-(--primary) mb-2",

  card: (col?: number | string) =>
    `bg-[var(--card)] flex border border-[var(--border)] rounded-lg shadow-md p-4${col ? ` col-span-${col}` : ""} text-center m-1 min-h-50 items-center text-[var(--card-foreground)]`,

  link: "text-[var(--owner)] hover:underline hover:text-[var(--primary)] transition duration-200",

  error: "text-[var(--destructive)] text-sm mt-1",

  success: "text-green-500 text-sm mt-1",

  section:
    "bg-black/50 flex items-center justify-between p-5 rounded-xl w-full transition-all duration-300 shadow-lg backdrop-blur-sm",

  heading: "text-xl font-bold text-[var(--primary)] mb-2",

  textarea:
    "bg-[var(--accent-foreground)] border border-[var(--border)] text-[var(--accent)] p-2 rounded-md w-full min-h-[80px] focus:outline-none focus:border-[var(--accent-foreground)]",

  list: () => "",

  iconButton:
    "p-2 rounded-full hover:bg-[var(--muted)] transition duration-200 text-[var(--muted-foreground)]",

  divider: "border-t border-[var(--border)] my-4",

  smallText: "text-xs text-[var(--muted-foreground)]",

  modal:
    "fixed inset-0 bg-[var(--background)] bg-opacity-60 flex items-center justify-center z-50",

  modalContent:
    "bg-[var(--popover)] rounded-lg p-6 shadow-lg border border-[var(--border)] text-[var(--popover-foreground)]",

  table: "min-w-full bg-[var(--card)] border border-[var(--border)] rounded-md",

  tableHeader: "bg-[var(--card)] text-[var(--muted-foreground)] font-semibold",

  tableCell: "px-4 py-2 border-b border-[var(--border)]",

  badge: (type: "success" | "error" = "success") =>
    `inline-block px-2 py-1 rounded ${
      type === "success" ? "bg-[var(--owner)]" : "bg-[var(--destructive)]"
    } text-[var(--primary-foreground)] text-xs font-semibold`,

  disabled: "opacity-50 cursor-not-allowed",

  container:
    "container inline-flex border border-[var(--border)] rounded-lg p-2 bg-[var(--background)]",

  hover: (color: string = "owner") => `hover:bg-[var(--${color})]`,

  inlineIcon: (color: string = "text-[var(--owner)]") => `inline mb-1 ${color}`,

  projectCard:
    "bg-[var(--card)] border border-[var(--border)] rounded-lg p-4 text-[var(--card-foreground)] hover:shadow-lg transition",

  projectTitle: "text-lg font-semibold mb-1",

  projectMeta: "text-sm text-[var(--muted-foreground)]",

  tag: "bg-[var(--owner)] text-[var(--primary-foreground)] text-xs rounded-full px-2 py-1 mr-1",

  centerFocus: (extra: string = "") =>
    `${extra} min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col items-center justify-center px-4 py-8`,

  projectInfo:
    "border border-[var(--border)] hover:border-[var(--owner)] rounded-md hover:rounded hover:text-[var(--primary)] hover:opacity-100 m-1 p-1 transition duration-200",

  pageSection: () => "bg-[var(--accent)] p-4 rounded-md shadow",

  sectionHeader: () => `text-lg font-semibold text-[var(--owner)]`,

  sectionHeaderDiv: (color: string = "bg-[var(--muted)]") =>
    `flex items-center justify-between ${color}/2 p-2 rounded-sm mb-3 border border-[var(--border)] hover:border-[var(--owner)] text-[var(--owner)]`,

  sectionInfo: () => `p-2 mt-3 mb-3`,

  commentBox: (sender: boolean = true, responder: boolean = false) => {
    // You can add logic here for different comment box styles
    return `bg-[var(--muted)] border border-[var(--border)] rounded-md p-2 text-[var(--foreground)]`;
  },

  hoverBg: () => `hover:bg-[var(--owner)]`,

  hoverAnimate: () =>
    `hover:rounded hover:border-[var(--owner)] hover:text-[var(--primary)] hover:w-[99%] hover:opacity-100 m-1 p-1 transition duration-500`,

  hoverImg: () => `hover:w-[99%] transition duration-500`,

  tooltip: () =>
    `absolute left-0 bottom-full -translate-x-1/8 ml-2 w-47 p-2 text-[0.3em] border rounded shadow-md opacity-0 group-hover:opacity-100 group-hover:bg-[var(--muted)] group-hover:text-[var(--primary)] group-focus-within:opacity-100 group-focus-within:bg-[var(--muted)] group-focus-within:text-[var(--primary)] transition-opacity duration-200 z-100 pointer-events-none`,

  cardTitle: () =>
    `text-xl font-semibold text-[var(--owner)] cursor-pointer inline`,

  tooltipBtn: () =>
    `${classMap.iconButton}, inline text-[var(--muted-foreground)] italic bg-transparent hover:bg-transparent cursor-pointer`,

  userCard: (col: any = 1, height: number = 30, className: string = "") =>
    `bg-[var(--accent)] border border-[var(--border)] rounded-lg shadow-md p-4 md:col-span-${col} lg:col-span-${col} text-center m-1 min-h-${height} items-start ${className} hover:shadow-xl hover:border-[var(--owner)] transition-all duration-300`,

  info: () => `pt-2 pb-2 opacity-50`,

  animPulse: () => `animate-pulse transition-all duration-1000`,

  tempBtn: `flex items-center justify-start p-2 border rounded-2xl border-[var(--ceo)] bg-muted text-primary m-1 hover:border-[var(--owner)]`,
};

export const viewProject = async (project_id: any, user_id: any) => {
  const resp = await axios.post(`${advisorUrl}/project/view`, {
    project_id: project_id,
    user_id: user_id,
  });
};

export const likeProject = async (
  project_id: any,
  user_id: any,
  guest: boolean,
) => {
  if (guest) {
    // router.visit(`${advisorUrl}/login`)
  } else {
    const resp = await axios.post(`${apiUrl}/api/project/like`, {
      project_id: project_id,
      user_id: user_id,
      guest: guest,
      lens: 20,
    });
  }
};

export const random = (max: any) => {
  const rand = Math.random().toString(36).substring(2, max);
  return rand;
};

export const getData = async (url, id, method = "post") => {
  const data = await (method == "get"
    ? axios.get(`${apiUrl}/api/${url}/${id ? id : ""}`)
    : axios.post(`${apiUrl}/api/${url}/${id ? id : ""}`));

  return data;
};

export const postData = async (url, id = "", method = "post") => {
  const data = await (method == "get"
    ? axios.get(`${apiUrl}/api/${url}${id ? "/" + id : ""}`)
    : axios.post(`${apiUrl}/api/${url}${id ? "/" + id : ""}`));

  return data;
};

export const NotAuth = ({ action = "Continue" }) => {
  return (
    <div className={`${classMap.pageSection()}`}>
      <small className="text-gray-400 text-sm">
        <Link to={`${advisorUrl}/login`} className={classMap.link}>
          Register
        </Link>{" "}
        or{" "}
        <Link to={`${advisorUrl}/login`} className={classMap.link}>
          Login
        </Link>{" "}
        to {action}
      </small>
    </div>
  );
};

export const hiddenNotAuth = ({ children }) => {
  return <Link to={`${advisorUrl}/login`}>{children}</Link>;
};

export const toJson = (data) => {
  let jsonConvert = [];
  try {
    jsonConvert = data ? JSON.parse(data) : {};
  } catch (e) {
    console.log(e);
  }

  return jsonConvert;
};

export const GetIndexData = async (url) => {
  try {
    const response = await axios.post(url);
    return response.data;
  } catch (error) {
    console.error("Error getting data", error);
    throw error;
  }
};

export const stringToJson = (data: string) => {
  if (!data) return [];

  const tagsArray = data.split(",").map((tag) => tag.trim());
  const tagsJSON = JSON.stringify(tagsArray);
  const parsedTags = JSON.parse(tagsJSON);
  return parsedTags;
};

export const sendPostRequest = async (url: string, data: []) => {
  try {
    const resp = await axios.post(apiUrl + url, data);
    return resp.data.message;
  } catch (err) {
    return err;
  }
};

export const stages = [
  { label: "Idea", key: "idea" },
  { label: "Pre-seed", key: "pre-seed" },
  { label: "Seed", key: "seed" },
  { label: "Early Stage", key: "early" },
  { label: "Growth", key: "growth" },
  { label: "Expansion", key: "expansion" },
  { label: "Mature", key: "mature" },
  { label: "Exit", key: "exit" },
];

export const Loading = () => (
  <div className="flex items-center justify-center w-full h-full min-h-[120px]">
    <FaCircleNotch
      className="animate-spin text-5xl text-[var(--owner)] transitions duration-500"
      aria-label="Loading..."
    />
    <span className="sr-only">Loading...</span>
  </div>
);

export const starShow = (stars: any) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) =>
        star <= stars ? (
          <FaStar
            key={star}
            className={`text-[var(--owner)] text-sm border-border`}
          />
        ) : (
          <FaRegStar
            key={star}
            className="text-sm text-primary border-border"
          />
        ),
      )}
    </div>
  );
};

// ✅ Flexible LoadingDiv Component
export const LoadingDiv = ({
  layout = [1], // e.g. [2, 1] = 2 divs on top row, 1 below
  height = "h-14",
  rounded = "rounded-lg",
}: {
  layout?: (number | number[])[];
  height?: string;
  rounded?: string;
}) => {
  // 🌀 Shimmer styles
  const shimmer = `relative overflow-hidden bg-accent ${rounded} border border-border`;
  const shimmerInner =
    "absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-[var(--owner)] to-transparent";
  const shimmerAnim = `
    @keyframes shimmer {
      100% { transform: translateX(100%); }
    }
    .animate-shimmer {
      animation: shimmer 1.5s infinite linear;
      transform: translateX(-100%);
    }
  `;

  // 🧠 Helper to render one row of shimmer blocks
  const renderRow = (columns: number | number[], rowIndex: number) => {
    if (Array.isArray(columns)) {
      // e.g. [7,3] => 70% / 30% split
      const total = columns.reduce((a, b) => a + b, 0);
      return (
        <div key={rowIndex} className="flex flex-row md:flex-row gap-3 w-full">
          {columns.map((width, i) => (
            <div
              key={i}
              className={`${shimmer} ${height}`}
              style={{ flex: width / total }}
            >
              <div className={shimmerInner} />
            </div>
          ))}
        </div>
      );
    } else {
      // e.g. 3 => 3 equal shimmer blocks
      return (
        <div
          key={rowIndex}
          className={`grid grid-cols-1 sm:grid-cols-${columns} gap-3 w-full`}
        >
          {Array.from({ length: columns }).map((_, i) => (
            <div key={i} className={`${shimmer} ${height}`}>
              <div className={shimmerInner} />
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <style>{shimmerAnim}</style>
      {layout.map((row, index) => renderRow(row, index))}
    </div>
  );
};

export const ImageUploadDiv = ({
  onChange,
  value,
  label = "Upload Image",
  className = "",
  accept = "image/*",
  height = "h-32",
  width = "w-full",
  rounded = "rounded-lg",
  preview = true,
  uploadUrl, // 👈 New prop for upload endpoint
  deleteUrl,
  path, // 👈 New prop for delete endpoint (optional)
}: {
  onChange: (url: string | null) => void;
  value?: string | null;
  label?: string;
  className?: string;
  accept?: string;
  height?: string;
  width?: string;
  rounded?: string;
  preview?: boolean;
  uploadUrl: string;
  deleteUrl?: string;
  path?: string;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = React.useState(false);

  const handleFileUpload = async (file: File) => {
    try {
      setIsUploading(true);

      // 🧼 If there's an old image and deleteUrl is provided, delete it first
      if (value && deleteUrl) {
        try {
          await axios.post(deleteUrl, { filePath: value });
        } catch (err) {
          console.warn("⚠️ Failed to delete old image:", err);
        }
      }

      // 🚀 Upload new file
      const formData = new FormData();
      formData.append("file", file);
      formData.append("path", path);

      const res = await axios.post(uploadUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.url) {
        onChange(res.data.url); // 👈 Send URL back to parent form
      } else {
        console.error("No URL returned from backend");
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center border-2 border-dashed border-border bg-accent cursor-pointer ${height} ${width} ${rounded} ${className} hover:border-border transition`}
      onClick={() => !isUploading && inputRef.current?.click()}
      tabIndex={0}
      role="button"
      aria-label={label}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileUpload(file);
        }}
      />

      {isUploading ? (
        <LoadingBar />
      ) : preview && value ? (
        <img
          src={value}
          alt="Preview"
          className={`object-contain max-h-28 mb-2 ${rounded}`}
          style={{ maxWidth: "90%" }}
        />
      ) : (
        <span className="text-(--placeholder) text-sm flex flex-col items-center">
          <svg
            width="32"
            height="32"
            fill="none"
            className="mb-1 text-[var(--ceo)]"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 16v-8m0 0l-4 4m4-4l4 4M4 20h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {label}
        </span>
      )}
    </div>
  );
};

export const advisorPostData = async ({ url }: { url: any }) => {
  const [data, setData] = useState([]);

  try {
    const res = await axios(`${advisorUrl}${url}`);
    setData(res.data);
  } catch (err) {
    console.log(err);
  }

  return data;
};

export const LensButton = ({ projectName }: { projectName?: string }) => {
  const { setShowOffCanvas } = useContext(OffCanvasContext);
  const [hide, setHide] = useState(false);
  const [opacity, setOpacity] = useState(false);

  setTimeout(() => {
    setHide(true);
    setOpacity(true);
  }, 10000);

  return (
    <button
      onClick={() => setShowOffCanvas(true)}
      onMouseOver={() => {
        (setHide(false), setOpacity(false));
      }}
      className={`fixed bottom-6 right-6 flex items-center gap-2 bg-[var(--owner)] text-white px-4 py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-500 z-[10000] ${opacity && "opacity-50"}`}
    >
      <FaSearchDollar className="w-5 h-5" />
      {!hide && (
        <span className="font-medium">
          Lens {projectName ? projectName : ""}
        </span>
      )}
    </button>
  );
};

export const TrendCreateBtn = () => {
  const { setShowOffCanvas, setOffId, SetOfftitle } =
    useContext(OffCanvasContext);
  const [hide, setHide] = useState(false);
  const [opacity, setOpacity] = useState(false);

  setTimeout(() => {
    setHide(true);
    setOpacity(true);
  }, 10000);

  return (
    <>
      <button
        onClick={() => {
          setOffId("CreateTrend");
          setShowOffCanvas(true);
          SetOfftitle("Create Trend");
        }}
        onMouseOver={() => {
          (setHide(false), setOpacity(false));
        }}
        className={`flex lg:hidden fixed bottom-6 mb-10 right-6 items-center gap-2 bg-(--owner) text-white px-4 py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-500 z-10000 ${opacity && "opacity-100"}`}
      >
        <FaPen className="w-5 h-5" />
        {!hide && <span className="font-medium">Create Trend</span>}
      </button>
    </>
  );
};

export const PresaleIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-black animate-ping repeat-infinite delay-1000 hover:animate-none"
    >
      <path d="M12 2v20M2 12h20" />
      <path d="M7 7h10v10H7z" />
    </svg>
  );
};

export const PresaleBtn = () => null;

// --- Utility to clean and parse AI response safely ---
export const parseAIResponse = (responseData: any) => {
  try {
    // Step 1: If it's a stringified JSON, parse it first
    let parsed =
      typeof responseData === "string"
        ? JSON.parse(responseData)
        : responseData;

    // Step 2: If it has "data" key (like from DB), parse that too
    if (parsed?.data && typeof parsed.data === "string") {
      parsed = JSON.parse(parsed.data);
    }

    // Step 3: If it has raw_text, extract the JSON block
    if (parsed?.raw_text) {
      const jsonMatch = parsed.raw_text.match(/```json([\s\S]*?)```/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[1]);
      }
    }

    return parsed;
  } catch (err) {
    console.error("❌ Error parsing AI response:", err);
    return null;
  }
};

export const ProgressBar = ({
  current,
  destination,
}: {
  current: number;
  destination: number;
}) => {
  // Handle weird values
  const safeCurrent = Number(current) || 0;
  const safeDest = Number(destination) || 1; // avoid divide-by-zero

  const percent = Math.min((safeCurrent / safeDest) * 100, 100);

  return (
    <div className="w-full bg-white/10 rounded-md h-7 p-1">
      <div
        className="bg-[var(--owner)] animate-pulse h-5 rounded-md transition-all duration-1000"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
};

// export const TrendData = {
//   id: id
// }

// animations

// Improved fade/slide animations + reusable AnimatedReveal component
// Replaces the previous FadeInAnim selection

type RevealDirection = "up" | "down" | "left" | "right" | "none";

interface AnimatedRevealProps {
  children: React.ReactNode;
  delay?: number; // ms
  duration?: number; // ms
  distance?: number; // px
  direction?: RevealDirection;
  threshold?: number; // intersection threshold
  rootMargin?: string;
  once?: boolean; // if true, will not hide after leaving viewport
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Generic AnimatedReveal - fade + slide from any direction
 */
export const AnimatedReveal = ({
  children,
  delay = 0,
  duration = 700,
  distance = 16,
  direction = "up",
  threshold = 0.12,
  rootMargin = "0px",
  once = true,
  className = "",
  style = {},
}: AnimatedRevealProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once && node) observer.unobserve(node);
        } else {
          if (!once) setVisible(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => {
      try {
        observer.unobserve(node);
        observer.disconnect();
      } catch (e) {
        /* noop */
      }
    };
  }, [threshold, rootMargin, once]);

  // compute initial transform based on direction
  let initialTransform = "translate3d(0, 0, 0)";
  switch (direction) {
    case "up":
      initialTransform = `translate3d(0, ${distance}px, 0)`;
      break;
    case "down":
      initialTransform = `translate3d(0, -${distance}px, 0)`;
      break;
    case "left":
      initialTransform = `translate3d(${distance}px, 0, 0)`;
      break;
    case "right":
      initialTransform = `translate3d(-${distance}px, 0, 0)`;
      break;
    case "none":
    default:
      initialTransform = `translate3d(0, ${Math.max(4, Math.floor(distance / 2))}px, 0)`;
      break;
  }

  const combinedStyle: React.CSSProperties = {
    transitionProperty: "opacity, transform",
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: "cubic-bezier(.2,.8,.2,1)",
    transitionDelay: `${delay}ms`,
    opacity: visible ? 1 : 0,
    transform: visible ? "translate3d(0,0,0)" : initialTransform,
    willChange: "transform, opacity",
    ...style,
  };

  return (
    <div ref={ref} className={className} style={combinedStyle}>
      {children}
    </div>
  );
};

/**
 * Backwards-compatible 'FadeInAnim with small default distance and parameters
 */
export const FadeInAnim = ({
  children,
  delay = 0,
  duration = 700,
  className = "",
  threshold = 0.12,
  once = true,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}) => {
  return (
    <AnimatedReveal
      direction="none"
      delay={delay}
      duration={duration}
      distance={8}
      threshold={threshold}
      once={once}
      className={className}
    >
      {children}
    </AnimatedReveal>
  );
};

/**
 * Convenience slide components
 */
export const SlideUp = (props: Omit<AnimatedRevealProps, "direction">) => (
  <AnimatedReveal {...props} direction="up" />
);

export const SlideDown = (props: Omit<AnimatedRevealProps, "direction">) => (
  <AnimatedReveal {...props} direction="down" />
);

export const SlideLeft = (props: Omit<AnimatedRevealProps, "direction">) => (
  <AnimatedReveal {...props} direction="left" />
);

export const SlideRight = (props: Omit<AnimatedRevealProps, "direction">) => (
  <AnimatedReveal {...props} direction="right" />
);

/**
 * Staggered container for animating lists with a waterfall delay
 * children should be an array of React elements
 */
export const StaggeredList = ({
  children,
  baseDelay = 40,
  direction = "up",
  duration = 700,
  distance = 16,
  threshold = 0.12,
  once = true,
  className = "",
}: {
  children: React.ReactNode[] | React.ReactNode;
  baseDelay?: number; // ms added per index
  direction?: RevealDirection;
  duration?: number;
  distance?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
}) => {
  const items = Array.isArray(children) ? children : [children];
  return (
    <div className={className}>
      {items.map((child, i) => (
        <AnimatedReveal
          key={i}
          direction={direction}
          delay={i * baseDelay}
          duration={duration}
          distance={distance}
          threshold={threshold}
          once={once}
          style={{ display: "block" }}
        >
          {child}
        </AnimatedReveal>
      ))}
    </div>
  );
};

export const DehtaConstruct = ({
  height,
  classy,
}: {
  height: any;
  classy: any;
}) => {
  return (
    <div
      className={`${classMap.dehtaBorder()} flex flex-col items-center justify-center bg-accent text-white w-full opacity-50 rounded-2xl ${height} ${classy}`}
    >
      <FaTools className="text-3xl lg:text-4xl" />
      <p className="text-3xl lg:text-4xl">Under Construction</p>
    </div>
  );
};

export const bgClass = (position: any) => {
  switch (position) {
    case "dashboard":
      return "herobg";
      break;
    default:
      break;
  }
};

export const Lens = () => {
  return <img src={"/logo.svg"} className="w-7 p-0 m-0" alt="" />;
};

export const ComingSoonIcon = () => {
  return <Sparkles className="w-6 h-6 text-[var(--owner)] animate-pulse" />;
};

export const ComingSoon = () => {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 p-8 mt-6 w-full rounded-xl 
                    bg-black/60 backdrop-blur-2xl border border-white/10"
    >
      <ComingSoonIcon />
      <p className="text-lg font-semibold text-white tracking-wide">
        Coming Soon
      </p>
      <span className="text-xs text-gray-400">Something worth the wait</span>
    </div>
  );
};

export const UnderConstruction = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-6 text-center">
      <FaTools className="w-8 h-8 text-[var(--owner)] animate-pulse" />

      <h2 className="text-lg font-semibold">Page under construction</h2>

      <p className="text-sm opacity-80">
        We’re cooking something nice behind the scenes.
      </p>

      <p className="text-xs opacity-60">
        Check back soon. Future you will approve.
      </p>
    </div>
  );
};

export function TrendCarousel({ trends }) {
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    align: "start",
  });

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {trends.map((trend, i) => (
          <div
            key={i}
            className="min-w-[95%] md:min-w-[50%] lg:min-w-[25%] p-2"
          >
            <TrendCard {...trend} data={trend} />
          </div>
        ))}
      </div>
    </div>
  );
}

export const LoadingBar = () => {
  return (
    <div className="flex items-center w-full justify-center">
      <FaCircleNotch className="text-1xl h-6 text-center opacity-60 text-(--primary) animate-spin transitions duration-500 " />
    </div>
  );
};

export const EllipsisDropdown = ({ children }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-ref" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="text-white hover:text-gray-800 px-2 py-1"
      >
        &#x22EE;
      </button>

      {open && (
        <div
          className={`${classMap.dehtaBorder()} absolute right-0 mt-2 w-40 bg-black text-white backdrop-blur-md bg-opacity-80 border rounded-md shadow-md z-50 p-3 transition-all duration-200`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export const UpperCase = (text: any) => {
  return text ? text.toUpperCase() : "null";
};

export const InfoMessage = ({ message }: InfoMessageProps) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative inline-flex">
      {open && (
        <div
          role="tooltip"
          className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-9999 rounded-md bg-neutral-900 px-3 py-2 text-xs text-white shadow-lg w-50"
        >
          <span>{message}</span>
        </div>
      )}

      <button
        type="button"
        aria-label="Info"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-5 w-5 items-center justify-center
                   rounded-full border border-neutral-500
                   text-xs font-semibold text-white
                   transition hover:bg-neutral-800"
      >
        i
      </button>
    </div>
  );
};

export const showAlert = (
  payload: any,
  forcedType?: "success" | "error" | "info",
) => {
  const send = (t: "success" | "error" | "info", msg: string) => {
    if (!msg) return;
    if (t === "success") toast.success(msg);
    else if (t === "info") toast.info(msg);
    else toast.error(msg);
  };

  // Normalize simple string
  if (typeof payload === "string") {
    return send(forcedType ?? "success", payload);
  }

  // If an array of strings, show each
  if (Array.isArray(payload) && payload.every((p) => typeof p === "string")) {
    const t = forcedType ?? "error";
    payload.forEach((m: string) => send(t, m));
    return;
  }

  // Try to extract useful info from various response shapes
  const resp =
    payload?.response?.data ?? // axios error shape
    payload?.data ?? // fetch/other libs
    payload; // fallback

  // If resp is plain string
  if (typeof resp === "string") {
    return send(forcedType ?? "error", resp);
  }

  // If resp is an array of messages
  if (Array.isArray(resp)) {
    const t = forcedType ?? "error";
    resp.forEach((m: any) => send(t, String(m)));
    return;
  }

  // If resp contains structured errors object (e.g. validation)
  if (resp && typeof resp === "object") {
    // If explicit errors object with arrays
    if (resp.errors && typeof resp.errors === "object") {
      Object.values(resp.errors).forEach((val) => {
        if (Array.isArray(val)) {
          val.forEach((m) => send(forcedType ?? "error", String(m)));
        } else {
          send(forcedType ?? "error", String(val));
        }
      });
      return;
    }

    // If a message field exists
    const message =
      resp.message ?? resp.msg ?? resp.error ?? resp.detail ?? null;
    if (message) {
      // decide type: forcedType > success flag > http status > default error
      const inferredType =
        forcedType ??
        (resp.success === true ? "success" : undefined) ??
        (Number(resp.status) && Number(resp.status) < 300
          ? "success"
          : undefined) ??
        "error";
      return send(inferredType, String(message));
    }
  }

  // Fallback: if payload itself has message (Error, etc.)
  if (payload?.message && typeof payload.message === "string") {
    return send(forcedType ?? "error", payload.message);
  }

  // final generic fallback
  send(forcedType ?? "error", "Something went wrong, please try again.");
};

type ClipboardProps = {
  text: string;
  alertMessage: string;
};

export const CopyToClipboard = ({ text, alertMessage }: ClipboardProps) => {
  const copy = () => {
    try {
      navigator.clipboard.writeText(text);
      showAlert(alertMessage);
    } catch (err) {
      showAlert(err);
    }
  };

  return (
    <IoCopy
      title="Copy"
      className="text-md inline mx-1 my-1 hover:text-white-900"
      onClick={() => copy()}
    />
  );
};

export const formatDatePretty = (dateString: string): string => {
  const date = new Date(dateString.replace(" ", "T"));

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

type EVGProps = {
  height: any;
  message: String;
};

export const EmailVerifyGuard = ({ height, message }: EVGProps) => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const RATE_LIMIT_KEY = "emailVerifyRequestTime";
  const RATE_LIMIT_MINUTES = 5;

  useEffect(() => {
    const lastRequestTime = localStorage.getItem(RATE_LIMIT_KEY);
    if (lastRequestTime) {
      const elapsed = Date.now() - parseInt(lastRequestTime);
      const remainingTime = RATE_LIMIT_MINUTES * 60 * 1000 - elapsed;

      if (remainingTime > 0) {
        setIsRateLimited(true);
        const timer = setTimeout(() => setIsRateLimited(false), remainingTime);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleVerifyRequest = () => {
    localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
    setIsRateLimited(true);

    setTimeout(() => setIsRateLimited(false), RATE_LIMIT_MINUTES * 60 * 1000);
  };

  return (
    <div
      className={`${classMap.glassEffect()} flex flex-col items-center justify-center ${height}`}
    >
      <span className="mb-2">{message}</span>
      <SendRequest
        url={`/email/verification-notification`}
        method="post"
        onResponse={(e) =>
          (e.status === 200 || e.status === 201) && handleVerifyRequest()
        }
        text={isRateLimited ? "Check your email" : "Verify Email"}
        disabled={isRateLimited}
      />
    </div>
  );
};

export const FormatAmount = ({ amount, precision = 1 }) => {
  if (isNaN(amount)) return <>0</>;

  const num = Number(amount);

  if (num < 1000) {
    return <>{parseFloat(num.toFixed(2)).toString()}</>;
  }

  const units = [
    { value: 1e12, suffix: "T" },
    { value: 1e9, suffix: "B" },
    { value: 1e6, suffix: "M" },
    { value: 1e3, suffix: "k" },
  ];

  for (const unit of units) {
    if (num >= unit.value) {
      const formatted = (num / unit.value).toFixed(precision);
      return (
        <>
          {parseFloat(formatted).toString()}
          {unit.suffix}
        </>
      );
    }
  }

  return <>{num}</>;
};
