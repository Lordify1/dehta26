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
  Loading,
  selectClass,
} from "../Tools/Misc";
import { Button, Select } from "antd";
import { appUrl } from "@/dapp";
import { FaTrashRestore } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { apiUrl } from "../../App";
import { useAdmin } from "@/context/AdminContext";
import axios from "axios";

type Props = {
  onClose?: any;
  onResponse?: any;
  EditData?: any;
};

export default function EditUser({ onClose, onResponse, EditData }: Props) {
  //   const {glasses, } = useAdmin();
  const [glasses, setGlasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    user_id: 0,
    glasses: [],
    lens: 0,
  });

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

  const getGlasses = async () => {
    try {
      const res = await axios.post(`${apiUrl}/api/admin/glass/get`);
      setGlasses(res.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getGlasses();
    if (EditData) {
      setFormData((prev) => ({
        ...prev,
        user_id: EditData?.id || "",
      }));
    }
  }, [EditData]);

  return (
    <form className="space-y-4" encType="multipart/form-data">
      <div className="pt-2 flex flex-col items-center text-start gap-4">
        <h3>Add Lens for User</h3>
        <input
          type="number"
          name="lens"
          className={`${classMap.input()}`}
          value={formData.lens ?? ""}
          onChange={(e) => {
            handleChange("lens", e.target.value);
          }}
        />
        <SendRequest
          text="Add Lens"
          url="/api/admin/users/add_lens"
          className="w-full"
          data={formData}
          onResponse={() => {
            onResponse(true);
          }}
        />
      </div>

      {/* Add Glasses for User  */}
      <div className="pt-2 flex flex-col items-center text-start gap-4">
        <h3 className="mb-3">Add Glasses for User</h3>
        {isLoading ? (
          <Loading />
        ) : (
          glasses.length > 0 &&
          glasses.map((it, ind) => {
            return (
              <div className="flex flex-row" key={ind}>
                <img
                  src={it.icon}
                  className="w-15 rounded-md bg-black/50"
                  alt=""
                />
                <input
                  type="number"
                  className={`${classMap.input()} ms-1`}
                  name=""
                  id=""
                  onChange={(e) =>
                    handleChange(
                      "glasses",
                      {
                        glass_id: it.id,
                        count: e.target.value,
                      },
                      it && ind,
                    )
                  }
                />
              </div>
            );
          })
        )}

        <SendRequest
          text="Add Glasses"
          url="/api/admin/users/add_glass"
          className="w-full"
          data={formData}
          onResponse={() => {
            onResponse(true);
          }}
        />
      </div>
    </form>
  );
}
