import React, { useEffect, useState } from "react";
import ImageUploader from "../Tools/ImageUploader";
import SendRequest from "../Tools/SendRequest";

const fields = [
  { name: "name", label: "Partner Name", type: "text", placeholder: "Enter partner name" },
  { name: "url", label: "Website Url", type: "url", placeholder: "https://example.com" },
];

export default function PartnerForm({ onClose, onResponse, EditData  }) {
  const [formData, setFormData] = useState({ 
    name: "",
    url: "",
  });

  console.log(EditData?.name);

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
      const img = JSON.parse(EditData.logo)
      setFormData((prev) => ({
        ...prev,
        id: EditData.id || "",
        name: EditData.name || "",
        url: EditData.url || "",
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
        <ImageUploader
        data={formData}
        setData={handleSetData}
        field="logo"
        />
      </div>

      <div className="pt-2 flex items-center gap-4">
        <SendRequest
          text="Save Partner"
          url="/admin/partners/post"
          data={formData}
          onResponse={(res) => {onResponse(true)}}
        />
        <button
          type="button"
          onClick={onClose}
          className="text-sm text-gray-400 hover:text-red-400 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
