import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { appUrl } from "@/dapp";
import { classMap, showAlert } from "./Misc";
import {
  FaCircle,
  FaCircleNotch,
  FaTrash,
  FaTruckLoading,
} from "react-icons/fa";
import { apiUrl } from "../../App";
import axiosClient from "../../axiosClient";
import { useUser } from "@/context/UserContext";

export default function SendRequest({
  text = "Submit",
  method = "post",
  url,
  data = {},
  redirect = false,
  onResponse,
  className = "",
  type = "button",
  showReset = true,
  disabled = false,
  awaitConfirmation = false,
  loadingText = "Processing...",
  title = "Submit",
  confirmationTitle = "Are you sure?",
  confirmationButtonText = "Yes",
  useIcon = false,
  get = false,
  deleteBtn = false,
  isSuccess = null,
  direction = "down",
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [eventRef, setEventRef] =
    useState<null | React.MouseEvent<HTMLButtonElement>>(null);
  const { setUser } = useUser();

  // const mainUrl = appUrl;

  const executeRequest = async (e: any) => {
    e.preventDefault();
    setIsProcessing(true);

    let requestData = data;
    let headers: any = {};

    const hasFile = Object.values(data).some(
      (value) => value instanceof FileList || value instanceof File,
    );

    // console.log(hasFile)

    if (hasFile) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof FileList) {
          Array.from(value).forEach((file) => {
            formData.append(`${key}[]`, file);
          });
        } else if (value instanceof File) {
          formData.append(key, value);
        }
      });

      requestData = formData;
      headers["Content-Type"] = "multipart/form-data";
    }

    const mainUrl = apiUrl + url;

    if (requestData instanceof FormData) {
      for (let pair of requestData.entries()) {
        // console.log(pair[0]+ ':', pair[1]);
      }
    } else {
      // console.log(requestData);
    }

    try {
      await axios.get(`${apiUrl}/sanctum/csrf-cookie`, {
        withCredentials: true,
      });

      const response = await axios({
        method,
        url: mainUrl,
        data: requestData,
        headers,
        withCredentials: true,
      });

      import.meta.env.DEV && console.log(response);

      // toast.success(response?.data?.message || "Success!");
      showAlert(response, "success");
      onResponse?.(response);

      if (typeof isSuccess === "function") {
        isSuccess(response.status === 200 || response.status === 204);
      }

      if (response?.data?.redirectUrl && redirect) {
        if (response?.data?.intended === true) {
          window.location.href = response.data.redirectUrl;
        } else {
          window.location.href = appUrl + response.data.redirectUrl;
        }
      }
    } catch (error) {
      setIsProcessing(false);
      showAlert(error, "error");
      import.meta.env.DEV && console.log(error);
      // const responseData = error?.response?.data;
      // if (responseData?.errors && typeof responseData.errors === "object") {
      //   Object.values(responseData.errors).forEach((errArr) => {
      //     if (Array.isArray(errArr)) {
      //       errArr.forEach((msg) => toast.error(msg));
      //     }
      //   });
      // } else {
      //   const message = responseData?.message || "Something went wrong, try again";
      //   toast.error(message);
      // }
      onResponse?.(error.response || error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (awaitConfirmation) {
      setEventRef(e); // Save event for later use
      setShowConfirm(true);
    } else {
      executeRequest(e);
    }
  };

  const handleConfirm = async () => {
    if (eventRef) await executeRequest(eventRef);
    setShowConfirm(false);
    setEventRef(null);
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setEventRef(null);
  };

  return (
    <>
      {!deleteBtn ? (
        <button
          onClick={handleClick}
          className={`${classMap.button("", "", "", "", direction)} ${isProcessing ? "opacity-80 cursor-not-allowed flex items-center justify-center" : ""} ${className}`}
          disabled={isProcessing || disabled}
          title={title}
        >
          {isProcessing ? (
            <div className="flex items-center w-full justify-center">
              <FaCircleNotch className="text-1xl h-6 text-center opacity-60 text-(--primary) animate-spin transitions duration-500 " />
            </div>
          ) : (
            text
          )}
        </button>
      ) : (
        <FaTrash onClick={handleClick} className="text-red-500" />
      )}

      <Modal
        open={showConfirm}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okText={confirmationButtonText}
        cancelText="Cancel"
        title={confirmationTitle}
        confirmLoading={isProcessing}
        maskClosable={false}
        className="z-99999 bg-accent"
        style={{ zIndex: 99999 }}
        modalRender={(modal) => (
          <div className="z-99999" style={{ zIndex: 99999 }}>
            {modal}
          </div>
        )}
      >
        <p>Are you sure?</p>
      </Modal>
    </>
  );
}
