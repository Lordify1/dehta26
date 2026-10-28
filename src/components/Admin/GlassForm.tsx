import React, { useEffect, useState } from "react";
import ImageUploader from "../Tools/ImageUploader";
import SendRequest from "../Tools/SendRequest";
import {
  cardClass,
  classMap,
  containerDiv,
  disabledClass,
  formClass,
  hoverClass,
  ImageUploadDiv,
  selectClass,
} from "../Tools/Misc";
import { Button, Select } from "antd";
import { appUrl } from "@/dapp";
import { FaTrashRestore } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { apiUrl } from "../../App";

const fields = [
  {
    name: "name",
    label: "Name",
    type: "text",
    model: "input",
    placeholder: "Glass name",
  },
  {
    name: "description",
    label: "Description",
    type: "text",
    model: "input",
    placeholder: "Glass description",
  },
  {
    name: "cost",
    label: "Cost",
    type: "number",
    model: "input",
    placeholder: "Cost in USD",
  },
  {
    name: "color",
    label: "Color",
    type: "text",
    model: "input",
    placeholder: "Input: owner or blue or purple",
  },
  {
    name: "icon",
    label: "Icon",
    type: "file",
    model: "input",
    placeholder: "Image",
  },
];

export default function GlassForm({ onClose, onResponse, EditData }) {
  const [linksArray, setLinksArray] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [attPreview, setAttPreview] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cost: "",
    color: "",
    icon: "",
    slug: "",
  });

  const statusOptions = [
    { value: "draft", label: "Draft" },
    { value: "sent", label: "Send" },
    { value: "scheduled", label: "Schedule" },
  ];

  // console.log(formData)

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

  useEffect(() => {
    if (EditData) {
      setFormData((prev) => ({
        ...prev,
        id: EditData?.id || "",
        name: EditData?.name || "",
        description: EditData?.description || "",
        cost: EditData?.cost || "",
        color: EditData?.color || "",
        icon: EditData?.icon || "",
        slug: EditData?.slug || "",
      }));
    }
  }, [EditData]);

  return (
    <form className="space-y-4" encType="multipart/form-data">
      {fields.map(
        ({ name, label, type, placeholder }) =>
          (type === "text" || type === "number") && (
            <div key={name} className="flex flex-col">
              <label htmlFor={name} className={`${classMap.label()}`}>
                {label}
              </label>
              <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={formData[name] || ""}
                onChange={(e) => handleChange(name, e.target.value)}
                className={`${classMap.input()}`}
              />
            </div>
          ),
      )}

      {fields.map(
        ({ name, label, type, placeholder }) =>
          type === "file" && (
            <div key={name} className="flex flex-col">
              <label htmlFor={name} className={`${classMap.label()}`}>
                {label}
              </label>
              <ImageUploadDiv
                value={formData.icon || ""}
                onChange={(fileUrl) => handleChange("icon", fileUrl)}
                uploadUrl={`${apiUrl}/api/upload-file`}
                deleteUrl={`${apiUrl}/api/delete-file`}
                path="/files/glasses/"
              />
            </div>
          ),
      )}

      {/* <ImageUploader
        onChange={(e) => handleChange('founder', {...formData.founder, [item.key]: e})}
        uploadUrl={`${appUrl}/upload-file`}
        deleteUrl={`${appUrl}/delete-file`}
        path="/files/projects/founder/"
      /> */}

      <div className="pt-2 flex items-center gap-4">
        <SendRequest
          text="Save Glass"
          url="/api/admin/glass/save"
          data={formData}
          onResponse={() => {
            onResponse(true);
          }}
        />
        {!EditData && (
          <button
            type="button"
            onClick={() => {
              (onClose, setFormData([]));
            }}
            className="text-sm text-gray-400 hover:text-red-400 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
