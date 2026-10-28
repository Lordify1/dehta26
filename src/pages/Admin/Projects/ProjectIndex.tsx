import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";
import Datatable from "@/components/Tools/Datatable";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Offcanvas from "@/components/Ui/Offcanvas";
import { AdminLayout } from "@/layouts/AdminLayout";
import axios from "axios";
import { advisorUrl, appName, appUrl } from "@/dapp";
import SendRequest from "@/components/Tools/SendRequest";
import { buttonClass, classMap, ItemView } from "@/components/Tools/Misc";
import NewsletterForm from "@/components/Admin/NewsletterForm";
import { IoTrashOutline } from "react-icons/io5";
import NewsletterTrash from "@/components/Admin/NewsletterTrash";
import GlassForm from "@/components/Admin/GlassForm";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import ProjectEditForm from "@/components/Admin/ProjectEditForm";
import { apiUrl } from "../../../App";

export default function ProjectIndex() {
  const [showForm, setShowForm] = useState(false);
  const [showTrash, setShowTrash] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [localStatus, setLocalStatus] = React.useState(null);
  const [showItem, setShowItem] = useState({
    item: "",
    data: "",
    state: false,
  });

  const updateStatus = async (id, stat) => {
    try {
      const res = await axios.post(
        `${apiUrl}/api/project/set_status/${id}/${stat}`,
      );
      setIsLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (_: any, record: any) => {
        return (
          <div className="flex flex-row items-center justify-start">
            <img
              src={record.logo || "https://placehold.co/600x400/000000/FFF"}
              className="w-20 h-20"
              alt=""
            />
            <Link
              target="_blank"
              to={`${appUrl}/project/${record.id}/${record.slug}`}
            >
              <h3>{record.name}</h3>
            </Link>
          </div>
        );
      },
    },
    {
      title: "Publish",
      dataIndex: "status",
      render: (_: any, record: any) => {
        setLocalStatus(record.status);
        return (
          <button
            title="Toggle Project Status"
            className={`p-2 transition-all duration-500 rounded-2xl w-10 border-1 flex ${localStatus === "draft" ? "items-start justify-start bg-muted-foreground" : `items-end justify-end bg-[var(--owner)]`}`}
            onClick={async () => {
              const newStatus =
                record.status === "draft" ? "published" : "draft";
              await updateStatus(record.id, newStatus);
              // setLocalStatus(newStatus);
            }}
          >
            <span
              className={`${localStatus === "draft" ? "bg-muted" : "bg-[var(--ceo)]"} rounded p-1 transition-all duration-500`}
            ></span>
          </button>
        );
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
              console.log(record);
              setSelectedData(record);
              setShowForm(true);
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
      .post(apiUrl + "/api/admin/projects/get")
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
        <title>Admin Projects - {appName}</title>
      </Helmet>
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-primary">Projects</h2>
          <div className="justify-end items-center">
            <Link
              to={`${appUrl}/admin/projects/create`}
              className={`${classMap.button()}`}
            >
              + Add Project(s)
            </Link>
          </div>
        </div>

        <Table columns={columns} dataSource={dataSource} loading={isLoading} />

        <Offcanvas
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          title={"Edit Project"}
        >
          <ProjectEditForm
            onClose={() => setShowForm(false)}
            onResponse={() => setIsLoading(true)}
            EditData={selectedData}
          />
        </Offcanvas>
      </div>
    </AdminLayout>
  );
}
