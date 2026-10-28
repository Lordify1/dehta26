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
  selectClass,
} from "../Tools/Misc";
import { Button, Select } from "antd";
import { appUrl } from "@/dapp";
import { FaTrashRestore } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";

const fields = [
  {
    name: "name",
    label: "Name",
    type: "text",
    model: "input",
    placeholder: "Offer name",
  },
  {
    name: "description",
    label: "Description",
    type: "text",
    model: "input",
    placeholder: "Offer description",
  },
  {
    name: "price",
    label: "Price",
    type: "number",
    model: "input",
    placeholder: "Price in Dollar",
  },
  {
    name: "lens_value",
    label: "Value",
    type: "number",
    model: "input",
    placeholder: "Value in Lens",
  },
  {
    name: "icon",
    label: "Icon",
    type: "text",
    model: "input",
    placeholder: "Use emoji for now",
  },
];

export default function LensForm({ onClose, onResponse, EditData }) {
  const [linksArray, setLinksArray] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [attPreview, setAttPreview] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    lens_value: "",
    price: "",
    icon: "",
    slug: "",
  });

  const statusOptions = [
    { value: "draft", label: "Draft" },
    { value: "sent", label: "Send" },
    { value: "scheduled", label: "Schedule" },
  ];

  console.log(formData);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files : value,
    }));
  };

  useEffect(() => {
    if (EditData) {
      setFormData((prev) => ({
        ...prev,
        id: EditData?.id || "",
        name: EditData?.name || "",
        description: EditData?.description || "",
        lens_value: EditData?.lens_value || "",
        price: EditData?.price || "",
        icon: EditData?.icon || "",
        slug: EditData?.slug || "",
      }));
    }
  }, [EditData]);

  return (
    <form className="space-y-4" encType="multipart/form-data">
      {fields.map(({ name, label, type, placeholder }) => (
        <div key={name} className="flex flex-col">
          <label htmlFor={name} className={`${classMap.label}`}>
            {label}
          </label>
          <input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            value={formData[name] || ""}
            onChange={handleChange}
            className={`${classMap.input}`}
          />
        </div>
      ))}

      <div className="pt-2 flex items-center gap-4">
        <SendRequest
          text="Save Offer"
          url="/admin/lensoffer/save"
          data={formData}
          onResponse={() => {
            onResponse(true);
          }}
        />
        <button
          type="button"
          onClick={() => {
            (onClose, setFormData([]));
          }}
          className="text-sm text-gray-400 hover:text-red-400 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
