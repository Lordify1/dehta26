import React, { useEffect, useState } from "react";
import ImageUploader from "../Tools/ImageUploader";
import SendRequest from "../Tools/SendRequest";
import { disabledClass, formClass, selectClass } from "../Tools/Misc";

const fields = [
  { name: "name", label: "Team Member Name", type: "text", model:"input",placeholder: "Enter member name" },
  { name: "role", label: "Member Role", type: "text", model:"input",placeholder: "Founder" },
];

export default function TeamForm({ onClose, onResponse, EditData  }) {
  const [linksArray, setLinksArray] = useState([]);
  const [formData, setFormData] = useState({ 
    name: "",
    role: "",
    bio: "",
    links: linksArray
  });

  const socialOptions = [
    { value: "x", label: "X" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "facebook", label: "Facebook" },
    { value: "reddit", label: "Reddit" },
    { value: "instagram", label: "Instagram" },
    { value: "pinterest", label: "Pinterest" },
    { value: "github", label: "GitHub" },
    { value: "stackoverflow", label: "Stack Overflow" },
    { value: "medium", label: "Medium" },
    { value: "behance", label: "Behance" },
    { value: "dribbble", label: "Dribbble" },
    { value: "personal_website", label: "Personal Website" },
    { value: "angel", label: "AngelList" },
    { value: "researchgate", label: "ResearchGate" },
    { value: "orcid", label: "ORCID" }
  ];


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSetData = (key, value) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  useEffect(() => {
    if (EditData) {
      // const img = JSON.parse(EditData.logo)
      setLinksArray(JSON.parse(EditData?.links) || [])
      setFormData((prev) => ({
        ...prev,
        id: EditData?.id || "",
        name: EditData?.name || "",
        role: EditData?.role || "",
        bio: EditData?.bio || "",
        links: EditData?.links || [],
      }));
    }
  }, [EditData])

  return (
    <form className="space-y-4">
      {fields.map(({ name, label, type, placeholder }) => (
        <div key={name} className="flex flex-col">
          <label htmlFor={name} className="text-sm font-medium text-white mb-1">
            {label}
          </label>
          <input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            value={formData[name] || ""}
            onChange={handleChange}
            className="bg-[#1b1b1b] border border-gray-700 text-white p-2 rounded-md"
          />
        </div>
      ))}
      <div className="flex flex-col">
          <label htmlFor="bio" className="text-sm font-medium text-white mb-1">
            Member Bio
          </label>
          <textarea
            id="bio"
            rows={5}
            name={'bio'}
            placeholder={'Bio'}
            value={formData['bio'] || ""}
            onChange={handleChange}
            className="bg-[#1b1b1b] border border-gray-700 text-white p-2 rounded-md"
          />
        </div>
      <div className="flex flex-col">
        <label htmlFor="picture" className="text-sm font-medium text-white mb-3">Picture</label>
        <ImageUploader
        data={formData}
        setData={handleSetData}
        field="picture"
        />
      </div>

            <div className="flex flex-col">
        <label htmlFor="socials" className="text-sm font-medium text-white mb-3">Socials</label>
        <select
          name="link"
          placeholder="Links"
          className={selectClass}
          onChange={e => {
            const selected = socialOptions.find(opt => opt.value === e.target.value);
            if (selected && !linksArray.some(link => link.value === selected.value)) {
              const updatedLinks = [...linksArray, { ...selected, url: "" }];
              setLinksArray(updatedLinks);
              setFormData((prevData) => ({...prevData, links: updatedLinks}))
            };
          }}
          value=""
        >
          <option value="" disabled>
            Select social platform
          </option>
          {socialOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="links" className="text-sm font-medium text-white mb-1">Links</label>
        {linksArray.length > 0 ? (
          linksArray.map((item, idx) => (
            <div key={item.value} className="flex items-center gap-2 mb-2">
              <span className="text-white w-32">{item.label}</span>
              <input
                type="url"
                placeholder={`Enter ${item.label} URL`}
                value={item.url}
                onChange={e => {
                  const newLinks = [...linksArray];
                  newLinks[idx].url = e.target.value;
                  setLinksArray(newLinks);
                }}
                className={formClass}
              />
              <button
                type="button"
                className="text-red-400 hover:text-red-600"
                onClick={() => {
                  setLinksArray(linksArray.filter((_, i) => i !== idx));
                }}
                title="Remove"
              >
                &times;
              </button>
            </div>
          ))
        ) : (
          <p className={disabledClass}>No links yet</p>
        )}
      </div>

      <div className="pt-2 flex items-center gap-4">
        <SendRequest
          text="Save Partner"
          url="/admin/team/post"
          data={formData}
          onResponse={() => {onResponse(true)}}
        />
        <button
          type="button"
          onClick={() => {onClose, setFormData([])}}
          className="text-sm text-gray-400 hover:text-red-400 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
