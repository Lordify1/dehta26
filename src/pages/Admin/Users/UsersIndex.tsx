import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Offcanvas from "@/components/Ui/Offcanvas";
import { AdminLayout } from "@/layouts/AdminLayout";
import axios from "axios";
import { appName } from "@/dapp";
import { Helmet } from "react-helmet-async";
import { apiUrl } from "../../../App";
import { useOffCanvas } from "../../../context/OffCanvasContext";
import EditUser from "../../../components/Admin/EditUser";
import { FaCheckCircle } from "react-icons/fa";

export default function UsersIndex() {
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
      title: "Username",
      key: "username",
      render: (_: any, record: any) => (
        <div className="flex items-center gap-2">
          <span>
            {record?.username}{" "}
            {record?.email_verified_at !== null && (
              <FaCheckCircle className="text-green-600" />
            )}
          </span>
        </div>
      ),
    },
    {
      title: "Tre. Role",
      dataIndex: "trendbet_role",
    },
    {
      title: "Glasses",
      dataIndex: "total_glasses",
    },
    {
      title: "Lens",
      dataIndex: "total_lens",
    },
    {
      title: "USDT Addy",
      dataIndex: "base_address",
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
              setOffId("Edit_User");
              SetOfftitle("Edit User");
            }}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    axios
      .post(apiUrl + "/api/admin/users/get")
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
        <title>Admin Users - {appName}</title>
      </Helmet>
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-primary">Users</h2>
        </div>

        <Table columns={columns} dataSource={dataSource} loading={isLoading} />

        <Offcanvas
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          title={Offtitle}
        >
          {OffId === "Edit_User" && (
            <EditUser
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
