"use client";
import {
  classMap,
  colorMap,
  ImageUploadDiv,
  Loading,
  toJson,
} from "@/components/Tools/Misc";
import React, { useCallback, useEffect, useState } from "react";
import {
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
import { useDropzone } from "react-dropzone";
import SendRequest from "@/components/Tools/SendRequest";
import axios from "axios";
import { advisorUrl, appUrl } from "@/dapp";
import { toast } from "react-toastify";
import { apiUrl } from "../../../App";

export function ProjectFormDeck({ isUpdate = false }) {
  const [file, setFile] = useState<File | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [status, setStatus] = useState<string>("idle");
  const [message, setMessage] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // 🧲 Handle file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.ms-powerpoint": [".ppt", ".pptx"],
    },
    multiple: false,
  });

  // 🧠 Watch jobId for live updates
  useEffect(() => {
    if (!jobId) {
      console.log("No Job ID");
      return;
    }
    const eventSource = new EventSource(
      `${advisorUrl}/project/stream/${jobId}`,
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setStatus(data.status);
      setProgress(data.progress);
      setMessage(data.message);
      if (data.suggestions) setSuggestions(data.suggestions);

      if (["done", "error"].includes(data.status)) {
        eventSource.close();
      }
    };

    eventSource.onerror = (err) => {
      console.error("SSE error:", err);
      eventSource.close();
    };

    return () => eventSource.close();
  }, [jobId]);

  // 🎨 Icons based on status
  const statusIcon = () => {
    if (status === "done")
      return (
        <FaCheckCircle className="text-green-400 text-3xl animate-bounce" />
      );
    if (status === "error")
      return (
        <FaExclamationCircle className="text-red-400 text-3xl animate-pulse" />
      );
    if (["queued", "processing"].includes(status))
      return <FaSpinner className="text-[#3dffc5] text-3xl animate-spin" />;
    return <FaUpload className="text-3xl text-gray-400" />;
  };

  return (
    <div
      {...(!jobId ? getRootProps() : {})}
      className={`text-primary border-2 border-dashed 
        ${isDragActive ? "border-[var(--owner)]" : "border-border"} 
        p-8 rounded-2xl text-center cursor-pointer min-h-[20vh] mt-5 w-full shadow-lg transition`}
    >
      {!jobId ? (
        <>
          {!file && <input {...getInputProps()} accept=".pdf, .ppt, .pptx" />}
          {file ? (
            <>
              <FaFile className="text-primary text-6xl mb-2" />
              <h3 className="mt-1 font-semibold text-lg">{file.name}</h3>
              <div className="flex flex-row mt-4 gap-3">
                <SendRequest
                  text="Process"
                  url="/ai/project/ai/upload_deck"
                  data={{ pitch_deck: file }}
                  direction="left"
                  onResponse={(res: any) => {
                    const job = res?.data?.data?.job_id;
                    if (job) {
                      setJobId(job);
                      setStatus("queued");
                      setMessage("Upload successful ✅ — Processing started!");
                    } else {
                      setMessage("Upload failed 😔");
                    }
                  }}
                />
                <button
                  onClick={() => setFile(null)}
                  className={`${classMap.button("bg-red-600", "", "", "", "right")}`}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <FaUpload className="text-6xl text-primary animate-bounce" />
              {isDragActive ? (
                <h6 className="text-[var(--owner)] font-bold mt-2 text-lg">
                  Drop it here 🚀
                </h6>
              ) : (
                <p className="mt-2 text-primary">
                  {isUpdate
                    ? "Upload your Pitch Deck to Update"
                    : "Upload your Pitch Deck to Get Started"}
                </p>
              )}
            </>
          )}
        </>
      ) : (
        <div className="w-full flex flex-col items-center">
          {statusIcon()}
          <h6 className="mt-2 font-semibold">{message}</h6>

          <div className="w-2/3 bg-accent-foreground rounded-full h-3 mt-3 overflow-hidden">
            <div
              className="bg-[var(--owner)] h-3 transition-all ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-prmary mt-1">{progress}% complete</p>

          {status === "done" && suggestions.length > 0 && (
            <div className="mt-6 text-left w-full max-w-xl bg-background p-4 rounded-xl shadow-md">
              <h4 className="font-bold mb-3">AI Suggestions:</h4>
              <ul className="list-disc pl-6 space-y-2 text-accent">
                {suggestions.map((s, i) => (
                  <li key={i} className="hover:text-primary transition">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function ProjectForm({ project }) {
  const formFields = [
    {
      key: "name",
      label: "Project Name",
      type: "text",
      isInput: true,
    },
    {
      key: "founder",
      label: "Founder",
      type: "array", // multi-input field
      isInput: false,
      inputs: [
        {
          key: "name",
          label: "Name",
          type: "text",
          isInput: true,
        },
        {
          key: "position",
          label: "Position",
          type: "text",
          isInput: true,
        },
        {
          key: "description",
          label: "Description",
          type: "textarea",
          isInput: true,
        },
      ],
    },
    {
      key: "problem",
      label: "Problem",
      type: "array", // could have multiple problem points
      isInput: true,
      list: true,
    },
    {
      key: "solution",
      label: "Solution",
      type: "array", // multiple solutions possible
      isInput: true,
      list: true,
    },
    {
      key: "team_members",
      label: "Team Members",
      type: "arrayOfArray",
      isInput: true,
      arrayOfArray: true,
      inputs: [
        {
          key: "name",
          label: "Name",
          type: "text",
          isInput: true,
        },
        {
          key: "position",
          label: "Position",
          type: "text",
          isInput: true,
        },
        {
          key: "description",
          label: "Description",
          type: "textarea",
          isInput: true,
        },
      ],
    },
    {
      key: "short_pitch",
      label: "Short Pitch",
      type: "textarea", // longer text field
      isInput: true,
    },
    {
      key: "business_model",
      label: "Business Model",
      type: "textarea",
      isInput: true,
    },
    {
      key: "financials_summary",
      label: "Financials Summary",
      type: "textarea",
      isInput: true,
    },
    {
      key: "industry",
      label: "Industry",
      type: "text",
      isInput: true,
    },
    {
      key: "stage",
      label: "Stage",
      type: "select", // dropdown
      options: ["Idea", "MVP", "Early Traction", "Scaling", "Established"],
      isInput: true,
    },
    {
      key: "launch_date",
      label: "Launch Date",
      type: "date",
      isInput: true,
    },
    {
      key: "target_market",
      label: "Target Market",
      type: "textarea",
      isInput: true,
    },
    {
      key: "team_overview",
      label: "Team Overview",
      type: "textarea",
      isInput: true,
    },
    {
      key: "tech_stack",
      label: "Tech Stack",
      type: "text",
      isInput: true,
    },
    {
      key: "traction",
      label: "Traction",
      type: "textarea",
      isInput: true,
    },
    {
      key: "logo",
      label: "Logo",
      type: "file",
      accept: "image/*",
      isInput: true,
    },
  ];

  const team = toJson(project?.team_members);
  const founder = toJson(project?.founder);
  const problem = toJson(project?.problem);
  const solution = toJson(project?.solution);

  const returnData = (field, key) => {
    switch (field) {
      case "founder":
        return founder?.[key];
        break;
      case "problem":
        return problem;
        break;
      case "solution":
        return solution;
        break;
      case "team_members":
        return team;
        break;
      default:
        break;
    }
  };

  return (
    <div className="p-4 h-[70vh] overflow-x-scroll">
      <form action="">
        {formFields.map((field) => (
          <div key={field.key} className="mb-4">
            <label className="block text-sm text-gray-300 mb-1">
              {field.label}
            </label>

            {field.type === "text" && (
              <input
                type="text"
                name={field.key}
                className={`${classMap.input()}`}
                value={project?.[field.key]}
              />
            )}

            {field.type === "array" && (
              <div className="bg-gray-800 p-2">
                <>
                  {/* Example handling: multiple inputs */}
                  {field?.inputs?.map((item, key) => {
                    const DKey = field.key;
                    return (
                      <>
                        <label className={`${classMap.label}`}>
                          {item.label}
                        </label>
                        {item.type === "text" ? (
                          <input
                            type="text"
                            name={item.key}
                            className={`${classMap.input()}`}
                            value={returnData(DKey, item.key)}
                          />
                        ) : (
                          <textarea
                            name={item.key}
                            rows={3}
                            className={`${classMap.input()}`}
                            value={returnData(DKey, item.key)}
                          />
                        )}
                      </>
                    );
                  })}
                  {/* Later: add “+ Add More” button for dynamic items */}
                  {field.list &&
                    field.key === "solution" &&
                    Object.entries(solution).map(([item, key], index) => {
                      return (
                        <input
                          type="text"
                          name={"index"}
                          className={`${classMap.input()}`}
                          value={key}
                        />
                      );
                    })}

                  {field.list &&
                    field.key === "problem" &&
                    Object.entries(problem).map(([item, key], index) => {
                      return (
                        <input
                          type="text"
                          name={"index"}
                          className={`${classMap.input()}`}
                          value={key}
                        />
                      );
                    })}
                </>
              </div>
            )}

            {field?.arrayOfArray === true && (
              <div className="bg-gray-900 p-2 rounded-sm">
                {Object.entries(team).map(([mainInfo, mainkey], mainIndex) => {
                  return field?.inputs?.map((item, key) => {
                    const DKey = field.key;
                    return (
                      <>
                        <label className={`${classMap.label}`}>
                          {item.label}
                        </label>
                        {item.type === "text" ? (
                          <input
                            type="text"
                            name={item.key}
                            className={`${classMap.input()}`}
                            value={mainkey?.[item.key]}
                          />
                        ) : (
                          <textarea
                            name={item.key}
                            rows={3}
                            className={`${classMap.input()}`}
                            value={mainkey?.[item.key]}
                          />
                        )}
                      </>
                    );
                  });
                })}
              </div>
            )}

            {field.type === "textarea" && (
              <textarea
                name={field.key}
                rows={5}
                className={`${classMap.input()}`}
                value={project?.[field.key]}
              />
            )}

            {field.type === "date" && (
              <input
                type="date"
                name={field.key}
                className={`${classMap.input()}`}
                value={project?.launch_date}
              />
            )}

            {field.type === "select" && (
              <select name={field.key} className={`${classMap.input()}`}>
                {field.options?.map((option) => (
                  <option
                    key={option}
                    value={option}
                    selected={project?.stage === option && true}
                  >
                    {option}
                  </option>
                ))}
              </select>
            )}

            {field.type === "file" && (
              <input
                type="file"
                name={field.key}
                accept={field.accept}
                className={`${classMap.input()}`}
              />
            )}
          </div>
        ))}
      </form>
    </div>
  );
}

export const ProjectFormManual = ({
  isUpdate = false,
  project,
  adminUrl = false,
}: {
  isUpdate?: boolean;
  project?: any;
  adminUrl?: boolean;
}) => {
  // Initialize formData with project data

  // console.log(stages

  const stages = [
    { label: "Idea", key: "Idea" },
    { label: "Pre-seed", key: "Pre-seed" },
    { label: "Seed", key: "Seed" },
    { label: "Early Stage", key: "Early" },
    { label: "Growth", key: "Growth" },
    { label: "Expansion", key: "Expansion" },
    { label: "Mature", key: "Mature" },
    { label: "Exit", key: "Exit" },
  ];

  const [formData, setFormData] = useState<any>({
    name: "",
    founder: { name: "", description: "", picture: null },
    industry: "",
    short_pitch: "",
    description: "",
    logo: null,
    problem: [""],
    solution: [""],
    target_market: "",
    business_model: "",
    traction: "",
    team_overview: "",
    team_members: [{}],
    financials_summary: "",
    tech_stack: "",
    stage: "",
    links: [{}],
    launch_date: "",
  });

  // Populate formData when project is passed
  useEffect(() => {
    if (project) {
      setFormData({
        id: project.id || "",
        name: project.name || "",
        founder: project.founder || {
          name: "",
          description: "",
          picture: null,
        },
        industry: project.industry || "",
        short_pitch: project.short_pitch || "",
        description: project.description || "",
        logo: project.logo || null,
        problem: project.problems?.length
          ? project.problems.map((p: any) => p.problem)
          : [""],
        solution: project.solutions?.length
          ? project.solutions.map((s: any) => s.solution)
          : [""],
        target_market: project.target_market || "",
        business_model: project.business_model || "",
        traction: project.traction || "",
        team_overview: project.team_overview || "",
        team_members: project.team?.length
          ? project.team.map((m: any) => ({
              name: m.name || "",
              role: m.role || "",
              description: m.description || "",
              picture: m.picture || null,
            }))
          : [{}],
        links:
          project.links && project.links.length
            ? project.links.map((m: any) => ({
                platform: m.platform || "",
                link: m.link || "",
              }))
            : [{}],
        financials_summary: project.financials_summary || "",
        tech_stack: project.tech_stack || "",
        stage: project.stage || "",
        launch_date: project.launch_date || "",
      });
    }
  }, [project]);

  // Max limits
  const LIMITS: Record<string, number> = {
    problem: 5,
    solution: 5,
    team_members: 10,
  };

  // ✅ Add new entry with limit check
  const addFieldEntry = (key: string, template: any = "") => {
    setFormData((prev: any) => {
      const current = prev[key] || [];
      if (LIMITS[key] && current.length >= LIMITS[key]) {
        alert(`You can only add up to ${LIMITS[key]} ${key} entries.`);
        return prev;
      }
      return {
        ...prev,
        [key]: [...current, template],
      };
    });
  };

  // 🗑 Remove entry by index
  const removeFieldEntry = (key: string, index: number) => {
    setFormData((prev: any) => {
      const updated = [...(prev[key] || [])];
      updated.splice(index, 1);
      return {
        ...prev,
        [key]: updated.length ? updated : [""], // keep at least one
      };
    });
  };

  // ✍️ Handle changes
  const handleChange = (
    key: string,
    value: any,
    index?: number,
    subKey?: string,
  ) => {
    setFormData((prev: any) => {
      let updated = { ...prev };

      if (index !== undefined && subKey) {
        // For nested array fields like team_members
        if (!updated[key]) updated[key] = [];
        if (!updated[key][index]) updated[key][index] = {};
        updated[key][index][subKey] = value;
      } else if (index !== undefined) {
        const arr = updated[key] ? [...updated[key]] : [];
        arr[index] = value;
        updated[key] = arr;
      } else {
        updated[key] = value;
      }

      return updated;
    });
  };

  // 📁 Handle file uploads
  const handleFileChange = (
    key: string,
    file: File,
    index?: number,
    subKey?: string,
  ) => {
    handleChange(key, file, index, subKey);
  };

  const links = [
    { name: "X", icon: React.createElement(FaTwitter) },
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

  const fields = [
    {
      key: "name",
      label: "Name",
      type: "text",
      placeholder: "Project name",
      order: 1,
    },
    {
      key: "founder",
      label: "Founder",
      type: "array",
      array: [
        {
          key: "name",
          label: "Name",
          placeholder: "Founder's name",
          type: "text",
        },
        {
          key: "description",
          label: "Description",
          placeholder: "Founder's description",
          type: "long_text",
        },
        { key: "picture", label: "Picture", type: "file" },
      ],
      placeholder: "",
      order: 2,
    },
    {
      key: "industry",
      label: "Industry",
      type: "text",
      placeholder: "Your project industry",
      order: 3,
    },
    {
      key: "short_pitch",
      label: "Short Pitch",
      type: "text",
      placeholder: "......",
      order: 4,
    },
    {
      key: "description",
      label: "Description",
      type: "long_text",
      placeholder: "......",
      order: 5,
    },
    {
      key: "logo",
      label: "Logo",
      type: "file",
      placeholder: "......",
      order: 6,
    },
    {
      key: "problem",
      label: "Problem",
      type: "text",
      multiple: true,
      placeholder: "......",
      order: 7,
    },
    {
      key: "solution",
      label: "Solution",
      type: "text",
      multiple: true,
      placeholder: "......",
      order: 8,
    },
    {
      key: "target_market",
      label: "Target Market",
      type: "long_text",
      placeholder: "......",
      order: 9,
    },
    {
      key: "business_model",
      label: "Business Model",
      type: "long_text",
      placeholder: "......",
      order: 10,
    },
    {
      key: "traction",
      label: "Traction",
      type: "long_text",
      placeholder: "......",
      order: 11,
    },
    {
      key: "team_overview",
      label: "Team Overview",
      type: "long_text",
      placeholder: "......",
      order: 12,
    },
    {
      key: "team_members",
      label: "Team Members",
      type: "arrayOfArray",
      array: [
        {
          key: "name",
          label: "Name",
          placeholder: "Member Name",
          type: "text",
        },
        {
          key: "role",
          label: "Role",
          placeholder: "Member Role",
          type: "text",
        },
        {
          key: "description",
          label: "Description",
          placeholder: "Member Description",
          type: "long_text",
        },
        // { key: "picture", label: "Picture", type: "file" },
      ],
      multiple: true,
      placeholder: "......",
      order: 13,
    },
    {
      key: "financials_summary",
      label: "Financial Summary",
      type: "long_text",
      placeholder: "......",
      order: 14,
    },
    {
      key: "tech_stack",
      label: "Tech Stack",
      type: "long_text",
      placeholder: "......",
      order: 15,
    },
    {
      key: "stage",
      label: "Stage",
      type: "checkbox",
      placeholder: "......",
      order: 16,
    },
    {
      key: "launch_date",
      label: "Launch Date",
      type: "date",
      placeholder: "......",
      order: 17,
    },
    {
      key: "links",
      label: "Links",
      type: "arrayOfArray",
      array: [
        {
          key: "platform",
          label: "Platform",
          placeholder: "Search and Select Platform",
          type: "datalist",
          data: links,
        },
        {
          key: "link",
          label: "Link",
          placeholder: "Provide your url",
          type: "text",
        },
      ],
      multiple: true,
      placeholder: "......",
      order: 18,
    },
  ];

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [project]);

  return (
    <>
      {isLoading && isUpdate ? (
        <Loading />
      ) : (
        <>
          <div>
            <form className={`grid gap-2 text-start ${classMap.form}`}>
              {fields.map((field) => (
                <div key={field.key}>
                  {/* TEXT (with multiple support) */}
                  {field.type === "text" && (
                    <div>
                      <div className="flex justify-between items-center ">
                        <label className={classMap.label()}>
                          {field.label}
                        </label>
                        {field.multiple && (
                          <button
                            type="button"
                            className={classMap.button()}
                            onClick={() => addFieldEntry(field.key, "")}
                          >
                            Add
                          </button>
                        )}
                      </div>

                      {field.multiple ? (
                        (formData[field.key] || []).map(
                          (val: any, index: number) => (
                            <div
                              key={`${field.key}-${index}`}
                              className="flex items-center gap-2 mb-2 "
                            >
                              <input
                                type="text"
                                value={val}
                                placeholder={field.placeholder}
                                onChange={(e) =>
                                  handleChange(field.key, e.target.value, index)
                                }
                                className={classMap.input()}
                              />
                              {index > 0 && (
                                <button
                                  type="button"
                                  className="text-red-500 text-sm"
                                  onClick={() =>
                                    removeFieldEntry(field.key, index)
                                  }
                                >
                                  ✕
                                </button>
                              )}
                            </div>
                          ),
                        )
                      ) : (
                        <input
                          type="text"
                          value={formData[field.key] || ""}
                          placeholder={field.placeholder}
                          onChange={(e) =>
                            handleChange(field.key, e.target.value)
                          }
                          className={classMap.input()}
                        />
                      )}
                    </div>
                  )}

                  {/* FOUNDER (Single array object) */}
                  {field.type === "array" && !field.multiple && (
                    <div>
                      <label className={classMap.label()}>{field.label}</label>
                      <div className="p-2 bg-gray-100/2 rounded my-2">
                        {field.array?.map((item, subIndex) => (
                          <div key={subIndex}>
                            <label className={classMap.label()}>
                              {item.label}
                            </label>
                            {item.type === "text" && (
                              <input
                                type="text"
                                value={formData.founder?.[item.key] || ""}
                                placeholder={item.placeholder}
                                onChange={(e) =>
                                  handleChange("founder", {
                                    ...formData.founder,
                                    [item.key]: e.target.value,
                                  })
                                }
                                className={classMap.input()}
                              />
                            )}
                            {item.type === "long_text" && (
                              <textarea
                                value={formData.founder?.[item.key] || ""}
                                placeholder={item.placeholder}
                                onChange={(e) =>
                                  handleChange("founder", {
                                    ...formData.founder,
                                    [item.key]: e.target.value,
                                  })
                                }
                                className={classMap.input()}
                              />
                            )}
                            {item.type === "file" && (
                              <ImageUploadDiv
                                value={formData.founder[item.key] || ""}
                                onChange={(e) =>
                                  handleChange("founder", {
                                    ...formData.founder,
                                    [item.key]: e,
                                  })
                                }
                                uploadUrl={`${apiUrl}/api/upload-file`}
                                deleteUrl={`${apiUrl}/api/delete-file`}
                                path="/files/projects/founder/"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TEAM MEMBERS */}
                  {field.type === "arrayOfArray" && (
                    <div>
                      <div className="flex justify-between items-center">
                        <label className={classMap.label()}>
                          {field.label}
                        </label>
                        <button
                          type="button"
                          className={classMap.button()}
                          onClick={() => addFieldEntry(field.key, {})}
                        >
                          Add
                        </button>
                      </div>

                      {(formData[field.key] || []).map(
                        (member: any, index: number) => (
                          <div
                            key={`${field.key}-${index}`}
                            className="p-2 bg-gray-100/2 rounded my-2"
                          >
                            {field.array?.map((item, subIndex) => (
                              <div key={subIndex}>
                                <label className={classMap.label()}>
                                  {item.label}
                                </label>
                                {item.type === "text" && (
                                  <input
                                    type="text"
                                    value={member[item.key] || ""}
                                    placeholder={item.placeholder}
                                    onChange={(e) =>
                                      handleChange(
                                        field.key,
                                        e.target.value,
                                        index,
                                        item.key,
                                      )
                                    }
                                    required
                                    className={classMap.input()}
                                  />
                                )}
                                {item.type === "long_text" && (
                                  <textarea
                                    placeholder={item.placeholder}
                                    value={member[item.key] || ""}
                                    onChange={(e) =>
                                      handleChange(
                                        field.key,
                                        e.target.value,
                                        index,
                                        item.key,
                                      )
                                    }
                                    className={classMap.input()}
                                  />
                                )}
                                {item.type === "datalist" && (
                                  <>
                                    <input
                                      list="platform-options"
                                      placeholder={item.placeholder}
                                      value={member[item.key] || ""}
                                      className={classMap.input()}
                                      required
                                      onChange={(e) =>
                                        handleChange(
                                          field.key,
                                          e.target.value,
                                          index,
                                          item.key,
                                        )
                                      }
                                      id={item.key}
                                    />
                                    <datalist id="platform-options">
                                      {item.data.map((d: any, index: any) => {
                                        return <option value={d.name}></option>;
                                      })}
                                    </datalist>
                                  </>
                                )}
                                {/* {item.type === "file" && (
                            <ImageUploadDiv
                              value={member[item.key] || null}
                              onChange={(e) => handleChange(item.key, e)}
                              label={item.label}
                              uploadUrl={`${appUrl}/upload-file`}
                              deleteUrl={`${appUrl}/delete-file`}
                              path={`/files/projects/team/${item.key}/`}
                            />
                          )} */}
                              </div>
                            ))}

                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() =>
                                  removeFieldEntry(field.key, index)
                                }
                                className="text-red-500 text-sm mt-2"
                              >
                                ✕ Remove
                              </button>
                            )}
                          </div>
                        ),
                      )}
                    </div>
                  )}

                  {/* LONG TEXT */}
                  {field.type === "long_text" && (
                    <div>
                      <label className={classMap.label()}>{field.label}</label>
                      <textarea
                        value={formData[field.key] || ""}
                        placeholder={field.placeholder}
                        onChange={(e) =>
                          handleChange(field.key, e.target.value)
                        }
                        className={classMap.input()}
                      />
                    </div>
                  )}

                  {/* DROPDOWN */}
                  {field.type === "checkbox" && (
                    <div>
                      <label className={classMap.label()}>{field.label}</label>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 items-center justify-start">
                        {stages &&
                          stages.map((item, index) => {
                            return (
                              <div className="p-2">
                                <label
                                  className={`${formData[field.key] === item.key ? `bg-[var(--owner)] text-primary` : "bg-accent text-primary"} p-2 border-l-2 rounded-xl hover:border-accent-foreground`}
                                  htmlFor={item.key}
                                >
                                  {item.label}
                                </label>
                                <input
                                  type="radio"
                                  className="hidden"
                                  name={item.label}
                                  id={item.key}
                                  value={item.key}
                                  onClick={(e) =>
                                    handleChange(field.key, item.key)
                                  }
                                />
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}

                  {/* DATE */}
                  {field.type === "date" && (
                    <div>
                      <label className={classMap.label()}>{field.label}</label>
                      <input
                        type="date"
                        value={formData[field.key] || ""}
                        onChange={(e) =>
                          handleChange(field.key, e.target.value)
                        }
                        className={classMap.input()}
                      />
                    </div>
                  )}

                  {/* FILE  */}
                  {field.type === "file" && (
                    <div>
                      <label className={classMap.label()}>{field.label}</label>
                      <ImageUploadDiv
                        value={formData[field.key] || null}
                        onChange={(e) => handleChange(field.key, e)}
                        uploadUrl={`${apiUrl}/api/upload-file`}
                        deleteUrl={`${apiUrl}/api/delete-file`}
                        path="/files/projects/logo/"
                      />
                    </div>
                  )}
                </div>
              ))}

              <div className="flex items-center justify-start mt-4">
                <SendRequest
                  url={`${adminUrl ? "/admin/projects/create" : "/api/project/create/form"}`}
                  method="post"
                  data={formData}
                  onResponse={() => {}}
                  text={isUpdate ? "Update Project" : "Create Project"}
                />
              </div>
            </form>

            {/* Collected data preview */}
            {/* <div className="mt-6 bg-gray-50 p-3 rounded">
          <h3 className="font-semibold mb-2">📦 Collected Data Preview:</h3>
          <pre className="text-xs bg-gray-800 text-white p-2 rounded max-h-60 overflow-auto">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div> */}
          </div>
        </>
      )}
    </>
  );
};
