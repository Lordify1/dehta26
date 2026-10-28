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
import { ProjectFormManual } from "../Advisor/Founder/ProjectForm";

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
    name: "lens_cost",
    label: "Lens cost",
    type: "number",
    model: "input",
    placeholder: "Lens cost",
  },
  {
    name: "rarity",
    label: "Rarity",
    type: "text",
    model: "input",
    placeholder: "Common or Special",
  },
  {
    name: "icon",
    label: "Icon",
    type: "text",
    model: "input",
    placeholder: "Use emoji for now",
  },
];

export default function ProjectEditForm({ onClose, onResponse, EditData }) {
  const [linksArray, setLinksArray] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [attPreview, setAttPreview] = useState([]);

  const statusOptions = [
    { value: "draft", label: "Draft" },
    { value: "sent", label: "Send" },
    { value: "scheduled", label: "Schedule" },
  ];

  // console.log(formData)

  //   useEffect(() => {
  //     if (EditData) {
  //       setFormData((prev) => ({
  //         ...prev,
  //         id: EditData?.id || "",
  //         name: EditData?.name || "",
  //         description: EditData?.description || "",
  //         lens_cost: EditData?.lens_cost || "",
  //         rarity: EditData?.rarity || "",
  //         icon: EditData?.icon || "",
  //         slug: EditData?.slug || ""
  //       }));
  //     }
  //   }, [EditData])

  return (
    <ProjectFormManual project={EditData} adminUrl={true} isUpdate={true} />
  );
}
