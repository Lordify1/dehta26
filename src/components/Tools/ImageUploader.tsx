import React, { useRef } from "react";
import axios from "axios";
import { FaPlusCircle } from "react-icons/fa";

const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dxsohuly2/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "admin_uploads";
const CLOUDINARY_USERNAME = "dxsohuly2";

interface ImageUploaderProps {
  data: any;
  setData: (field: string, value: any) => void;
  count?: number;
  field?: string; // <-- Add this prop
}

const ImageUploader = ({ data, setData, count = 1, field = "images" }: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: any = Array.from(e.target.files || []);
    const uploadedUrls = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("cloud_name", CLOUDINARY_USERNAME);

      try {
        const res = await axios.post(CLOUDINARY_UPLOAD_URL, formData);
        uploadedUrls.push({
          url: res.data.secure_url,
          public_id: res.data.public_id,
        });
      } catch (err: any) {
        console.error(err.response?.data || err.message);
        alert("Image upload failed.");
      }
    }

    let updated = [];

    if (count === 1) {
      // Only keep the most recent image
      updated = uploadedUrls.slice(-1);
    } else {
      updated = [...(data[field] || []), ...uploadedUrls];
    }

    setData(field, updated);
    if (fileInputRef.current) fileInputRef.current.value = ""; // reset input
  };

  const removeImage = async (index: number, public_id: string) => {
    try {
      await axios.post("/cloudinary/delete", { public_id });
      const updated = (data[field] || []).filter((_: any, i: number) => i !== index);
      setData(field, updated);
    } catch (err) {
      console.error(err);
      alert("Failed to delete image from Cloudinary.");
    }
  };

  return (
    <div className="col-lg-12">
      <div className="add-choosen">
        <div className="input-blocks">
          <div className="image-upload">
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              multiple={count > 1}
              style={{ display: "none" }}
            />
            <div
              className="image-uploads"
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              style={{ cursor: "pointer" }}
            >
              <FaPlusCircle className="plus-down-add ms-5" />
              <h4>{count > 1 ? 'Add Images' : 'Add Image'}</h4>
            </div>
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {(data[field] || []).map((img: any, index: number) => (
            <div key={index} className="phone-img position-relative me-3 mb-3">
              <img src={img.url || img} alt={`preview-${index}`} className="img-thumbnail" />
              <button
                type="button"
                className="btn btn-danger btn-sm position-absolute top-0 end-0"
                onClick={() => removeImage(index, img.public_id)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;