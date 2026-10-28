import { classMap } from "@/components/Tools/Misc";
import SendRequest from "@/components/Tools/SendRequest";
import { useState, useEffect } from "react";
import { ImageUploadDiv } from "../../Tools/Misc";
import { apiUrl } from "../../../App";
import { useUser } from "@/context/UserContext";

type LinkItem = {
  platform: string;
  link: string;
};

type FormData = {
  name: string;
  username: string;
  avatar?: string;
  role?: string;
  usdc_address?: string;
  links: LinkItem[];
};

const EditProfile = () => {
  const { user } = useUser();

  const [data, setData] = useState<FormData>({
    name: "",
    username: "",
    avatar: "",
    role: "",
    usdc_address: "",
    links: [{ platform: "", link: "" }],
  });

  // Sync form with user data
  useEffect(() => {
    if (user) {
      setData({
        name: user.name || "",
        username: user.username || "",
        avatar: user.avatar || "",
        role: user.role || "",
        usdc_address: user.usdc_address || "",
        links: user.links?.length
          ? user.links
          : [{ platform: "", link: "" }],
      });
    }
  }, [user]);

  const fields = [
    { name: "name", label: "Name", type: "text" },
    { name: "username", label: "Username", type: "text" },
    { name: "usdc_address", label: "USDC Address", type: "text" },
  ] as const;

  const linkPlatforms = [
    "X",
    "Instagram",
    "Tiktok",
    "Facebook",
    "Linkedin",
    "Youtube",
    "Discord",
    "Telegram",
    "Reddit",
    "Medium",
    "Website",
    "Github",
    "Email",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const addLink = () => {
    setData(prev => ({
      ...prev,
      links: [...prev.links, { platform: "", link: "" }],
    }));
  };

  const removeLink = (index: number) => {
    setData(prev => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index),
    }));
  };

  const handleLinkChange = (
    index: number,
    key: "platform" | "link",
    value: string
  ) => {
    setData(prev => {
      const updated = [...prev.links];
      updated[index] = { ...updated[index], [key]: value };
      return { ...prev, links: updated };
    });
  };

  return (
    <section className="flex flex-col gap-2">
      {/* BASIC FIELDS */}
      {fields.map(item => (
        <div key={item.name}>
          <label className={classMap.label()} htmlFor={item.name}>
            {item.label}
          </label>
          <input
            className={classMap.input()}
            type={item.type}
            name={item.name}
            id={item.name}
            required
            value={data[item.name]}
            onChange={handleChange}
          />
        </div>
      ))}

      {/* LINKS */}
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <label className={classMap.label()}>Links</label>
          <button
            type="button"
            className={classMap.button()}
            onClick={addLink}
          >
            Add
          </button>
        </div>

        {data.links.map((item, index) => (
          <div key={index} className="p-2 bg-gray-100/2 rounded my-2">
            <input
              list="link-platforms"
              placeholder="Platform"
              value={item.platform}
              onChange={e =>
                handleLinkChange(index, "platform", e.target.value)
              }
              className={classMap.input()}
            />

            <datalist id="link-platforms">
              {linkPlatforms.map(p => (
                <option key={p} value={p} />
              ))}
            </datalist>

            <input
              type="text"
              placeholder="https://..."
              value={item.link}
              onChange={e =>
                handleLinkChange(index, "link", e.target.value)
              }
              className={classMap.input()}
            />

            {index > 0 && (
              <button
                type="button"
                className="text-red-500 text-sm mt-1"
                onClick={() => removeLink(index)}
              >
                ✕ Remove
              </button>
            )}
          </div>
        ))}
      </div>

      {/* SUBMIT */}
      <SendRequest
        url="/api/profile"
        data={data}
        text="Edit Profile"
        method="post"
        className="mt-2"
      />
    </section>
  );
};

export default EditProfile;