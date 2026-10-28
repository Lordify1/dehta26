import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";
import Datatable from "@/components/Tools/Datatable";
import TeamForm from "@/components/Admin/TeamForm";
import Offcanvas from "@/components/Ui/Offcanvas";
import { AdminLayout } from "@/layouts/AdminLayout";
import axios from "axios";
import { appUrl } from "@/dapp";
import SendRequest from "@/components/Tools/SendRequest";
import { FaEdit } from "react-icons/fa";
import { apiUrl } from "../../../App";

export default function TeamPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const columns = [
    {
      title: "Pic",
      dataIndex: "picture",
      render: (picture: any) => {
        const img = JSON.parse(picture);
        return (
          <img
            src={img[0]["url"]}
            alt="picture"
            className="w-10 h-10 object-contain"
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Links",
      dataIndex: "links",
      key: "links",
      render: (links: any) => {},
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <div className="flex items-center gap-2">
          <Button
            icon={<FaEdit />}
            onClick={() => {
              setSelectedData(record);
              setShowForm(true);
            }}
          />
          <SendRequest
            url={`/api/admin/team/delete/${record.id}`}
            method="delete"
            deleteBtn={true}
            data={{ id: record.id }}
            awaitConfirmation={true}
            confirmationTitle="Do you really want to delete this member?"
            confirmationButtonText="Delete"
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
      .get(apiUrl + "/api/admin/team/get")
      .then((res: any) => {
        (console.log(res), setDataSource(res.data), setIsLoading(false));
      })
      .catch((res) => {
        (console.log(res), setIsLoading(false));
      });
  }, [isLoading, selectedData]);

  return (
    <AdminLayout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Team</h2>
          <button
            className="bg-[#006F57] text-white px-4 py-2 rounded-md"
            onClick={() => {
              setSelectedData(null);
              setShowForm(true);
            }}
          >
            + Add Team
          </button>
        </div>

        <Table columns={columns} dataSource={dataSource} loading={isLoading} />

        <Offcanvas
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          title={selectedData ? "Edit Team" : "Add Team"}
        >
          <TeamForm
            onClose={() => setShowForm(false)}
            onResponse={() => setIsLoading(true)}
            EditData={selectedData}
          />
        </Offcanvas>
      </div>
    </AdminLayout>
  );
}
