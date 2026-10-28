import React, { useEffect, useState } from "react";
import ImageUploader from "../Tools/ImageUploader";
import SendRequest from "../Tools/SendRequest";
import {
  cardClass,
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
    name: "title",
    label: "Title",
    type: "text",
    model: "input",
    placeholder: "Newsletter title",
  },
  {
    name: "subject",
    label: "Subject",
    type: "text",
    model: "input",
    placeholder: "Why we are Phi",
  },
];

export default function NewsletterForm({ onClose, onResponse, EditData }) {
  const [linksArray, setLinksArray] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [attPreview, setAttPreview] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    content: "",
    status: "",
    scheduled_date: "",
    images: [],
    attachments: [],
    send: "",
  });

  const statusOptions = [
    { value: "draft", label: "Draft" },
    { value: "sent", label: "Send" },
    { value: "scheduled", label: "Schedule" },
  ];

  const OptionalDiv = (status) => {
    let html = "";
    switch (status) {
      case "sent":
        html = (
          <div className="flex flex-start">
            <input
              id={"send"}
              name={"send"}
              type="checkbox"
              value={formData["send"] || ""}
              onChange={handleChange}
            />
            <label
              htmlFor="send"
              className="text-sm font-medium text-white ml-3"
            >
              Send
            </label>
          </div>
        );
        break;
      case "scheduled":
        html = (
          <div className="flex flex-col">
            <label
              htmlFor="scheduled_date"
              className="text-sm font-medium text-white mb-3"
            >
              Schedule Date
            </label>
            <input
              id={"scheduled_date"}
              name={"scheduled_date"}
              type="datetime-local"
              value={formData["scheduled_date"] || ""}
              onChange={handleChange}
              className="bg-[#1b1b1b] border border-gray-700 text-white p-2 rounded-md"
            />
          </div>
        );
        break;
      default:
        break;
    }

    return html;
  };

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
        title: EditData?.title || "",
        subject: EditData?.subject || "",
        content: EditData?.content || "",
        scheduled_date: EditData?.scheduled_date || "",
        status: EditData?.status || "",
        images: JSON?.parse(EditData?.images) || [],
        attachments: JSON?.parse(EditData?.attachments) || [],
      }));
      setImagePreview(JSON.parse(EditData?.images));
      setAttPreview(JSON.parse(EditData?.attachments));
    }
  }, [EditData]);

  return (
    <form className="space-y-4" encType="multipart/form-data">
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
        <label
          htmlFor="content"
          className="text-sm font-medium text-white mb-1"
        >
          Content
        </label>
        <textarea
          id="content"
          rows={5}
          name={"content"}
          placeholder={"Content..."}
          value={formData["content"] || ""}
          onChange={handleChange}
          className="bg-[#1b1b1b] border border-gray-700 text-white p-2 rounded-md"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="images" className="text-sm font-medium text-white mb-3">
          Images
        </label>
        <input
          className={formClass}
          type="file"
          multiple
          id="images"
          name={"images"}
          accept=".jpeg,.jpg,.png,.gif"
          onChange={handleChange}
        />
        {EditData?.images && (
          <div className={`${containerDiv}`}>
            {imagePreview?.length > 0 ? (
              imagePreview.map((item, key) => {
                return (
                  <div
                    key={key}
                    className={`${cardClass(3)} ${hoverClass("gray")}`}
                  >
                    <img
                      key={key}
                      className="w-40"
                      src={appUrl + "/" + item}
                      alt={item}
                    />
                    <button
                      onClick={() => {
                        setFormData(imagePreview.filter((_, i) => i !== key));
                      }}
                      type="button"
                    >
                      Trash
                    </button>
                  </div>
                );
              })
            ) : (
              <p>No images Here</p>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="attachments"
          className="text-sm font-medium text-white mb-3"
        >
          Attachments
        </label>
        <input
          className={formClass}
          accept=".doc,.pdf,.xlsx,.docx,.gif,.txt,.ppt"
          type="file"
          multiple
          id="attachments"
          name={"attachments"}
          onChange={handleChange}
        />
        {EditData?.attachments && (
          <div className={`${containerDiv}`}>
            {formData["attachments"]?.length > 0 ? (
              "There is " +
              formData["attachments"]?.length +
              " in this Newsletter"
            ) : (
              <p>No attachments Here</p>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="socials"
          className="text-sm font-medium text-white mb-3"
        >
          Status
        </label>
        <select
          name="status"
          placeholder=""
          className={selectClass}
          value={formData["status"] || []}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select Status
          </option>
          {statusOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      {OptionalDiv(formData["status"])}

      <div className="pt-2 flex items-center gap-4">
        <SendRequest
          text="Save Newsletter"
          url="/admin/newsletter/post"
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
