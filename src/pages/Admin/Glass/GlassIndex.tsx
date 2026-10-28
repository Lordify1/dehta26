import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";
import Datatable from "@/components/Tools/Datatable";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Offcanvas from "@/components/Ui/Offcanvas";
import { AdminLayout } from "@/layouts/AdminLayout";
import axios from "axios";
import { appName, appUrl } from "@/dapp";
import SendRequest from "@/components/Tools/SendRequest";
import { buttonClass, classMap, ItemView } from "@/components/Tools/Misc";
import NewsletterForm from "@/components/Admin/NewsletterForm";
import { IoTrashOutline } from "react-icons/io5";
import NewsletterTrash from "@/components/Admin/NewsletterTrash";
import GlassForm from "@/components/Admin/GlassForm";
import { Helmet } from "react-helmet-async";
import { apiUrl } from "../../../App";
import { useOffCanvas } from "../../../context/OffCanvasContext";

export default function GlassIndex() {
  const [showForm, setShowForm] = useState(false);
  const { setShowOffCanvas, setOffId, SetOfftitle, Offtitle, OffId } =
    useOffCanvas();
  const [showTrash, setShowTrash] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showItem, setShowItem] = useState({
    item: "",
    data: "",
    state: false,
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Desc",
      dataIndex: "description",
    },
    {
      title: "Image",
      dataIndex: "icon",
      render: (_: any, record: any) => {
        return <img src={record?.icon} className="w-15" alt="" />;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <div className="flex items-center gap-2">
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedData(record);
              setShowForm(true);
              setShowOffCanvas(true);
              setOffId("CreateGlass");
              SetOfftitle("Edit Glass");
            }}
          />
          <SendRequest
            url={`/api/admin/glass/delete/${record.id}`}
            method="delete"
            deleteBtn={true}
            data={{ id: record.id }}
            awaitConfirmation={true}
            confirmationTitle="Do you really want to delete this?"
            confirmationButtonText="Trash it!!"
            onResponse={() => {
              setIsLoading(true);
            }}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    axios
      .post(apiUrl + "/api/admin/glass/get")
      .then((res: any) => {
        (setDataSource(res.data), setIsLoading(false));
      })
      .catch((res) => {
        setIsLoading(false);
      });
  }, [isLoading, selectedData]);

  return (
    <AdminLayout>
      <Helmet>
        <title>Admin Glasses - {appName}</title>
      </Helmet>
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-primary">Glasses</h2>
          <div className="justify-end items-center">
            <button
              className={`${classMap.button()}`}
              onClick={() => {
                setSelectedData(null);
                setShowForm(true);
                setShowOffCanvas(true);
                setOffId("CreateGlass");
                SetOfftitle("Create Glass");
              }}
            >
              + Add Glass
            </button>
          </div>
        </div>

        <Table columns={columns} dataSource={dataSource} loading={isLoading} />

        <Offcanvas
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          title={Offtitle}
        >
          {OffId === "CreateGlass" && (
            <GlassForm
              onClose={() => setShowForm(false)}
              onResponse={() => setIsLoading(true)}
              EditData={selectedData}
            />
          )}
        </Offcanvas>
      </div>
    </AdminLayout>
  );
}
