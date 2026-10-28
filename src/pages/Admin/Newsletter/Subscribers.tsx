import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";
import Datatable from "@/components/Tools/Datatable";
import TeamForm from "@/components/Admin/TeamForm";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Offcanvas from "@/components/Ui/Offcanvas";
import { AdminLayout } from "@/layouts/AdminLayout";
import axios from "axios";
import { appUrl } from "@/dapp";
import SendRequest from "@/components/Tools/SendRequest";
import { badgeClass } from "@/components/Tools/Misc";
import { router } from "@inertiajs/react";

export default function Subscribers() {
  const [showForm, setShowForm] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Why",
      dataIndex: "why",
      key: "why",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: any, record: any) => {
        const stat = record.status === "subscribed" ? "success" : "danger";
        return <span className={badgeClass(stat)}>{record.status}</span>;
      },
    },
    // ,
    // {
    //   title: "Actions",
    //   key: "actions",
    //   render: (_:any,record:any) => (
    //     <div className="flex items-center gap-2">
    //       <SendRequest
    //       url={`/admin/newsletter/subscriber/delete/${record.id}`}
    //       method="delete"
    //       deleteBtn={true}
    //       data={{ id: record.id }}
    //       awaitConfirmation={true}
    //       confirmationTitle="Do you really want to delete this subscriber?"
    //       confirmationButtonText="Delete"
    //       onResponse={() => {setIsLoading(true)}}
    //       />
    //     </div>
    //   ),
    // },
  ];

  useEffect(() => {
    axios
      .get(appUrl + "/admin/newsletter/subscribers/get")
      .then((res: any) => {
        (console.log(res), setDataSource(res.data), setIsLoading(false));
      })
      .catch((res) => {
        (console.log(res), setIsLoading(false));
      });
  }, [isLoading]);

  return (
    <AdminLayout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Subscribers</h2>
        </div>

        <Table columns={columns} dataSource={dataSource} loading={isLoading} />
      </div>
    </AdminLayout>
  );
}
