import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";
import Datatable from "@/components/Tools/Datatable";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Offcanvas from "@/components/Ui/Offcanvas";
import { AdminLayout } from "@/layouts/AdminLayout";
import axios from "axios";
import { appUrl } from "@/dapp";
import SendRequest from "@/components/Tools/SendRequest";
import { buttonClass } from "@/components/Tools/Misc";
import NewsletterForm from "@/components/Admin/NewsletterForm";
import { IoTrashOutline } from "react-icons/io5";

export default function NewsletterTrash({ onClose, reLoad }) {
  const [showForm, setShowForm] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Subject",
      dataIndex: "subject",
    },
    {
      title: "Content",
      dataIndex: "content",
      render: (_, record: any) => {
        return <Button title="See Content" icon={<EyeOutlined />} />;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Sche. Date",
      dataIndex: "scheduled_date",
      render: (_, record) => {
        return record?.scheduled_date !== null
          ? record?.scheduled_date
          : "Not scheduled";
      },
    },
    {
      title: "Images",
      dataIndex: "images",
      render: (_, record: any) => {
        return record?.images?.length > 0 ? (
          <Button title="See Images" icon={<EyeOutlined />} />
        ) : (
          <span>No image</span>
        );
      },
    },
    {
      title: "Attachments",
      dataIndex: "attachments",
      render: (_, record: any) => {
        return record?.attachments?.length > 0 ? (
          <Button title="See attachments" icon={<EyeOutlined />} />
        ) : (
          <span>No attachment in this Newsletter</span>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <div className="flex items-center gap-2">
          <SendRequest
            url={`/admin/newsletter/full_delete/${record.id}`}
            method="delete"
            deleteBtn={true}
            data={{ id: record.id }}
            awaitConfirmation={true}
            confirmationTitle="Do you really want to delete this completely?"
            confirmationButtonText="Delete😇!!"
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
      .get(appUrl + "/admin/newsletter/trash")
      .then((res: any) => {
        (console.log(res), setDataSource(res.data), setIsLoading(false));
      })
      .catch((res) => {
        setIsLoading(false);
      });
  }, [isLoading, reLoad]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col">
        <Table columns={columns} dataSource={dataSource} loading={isLoading} />
      </div>
    </div>
  );
}
