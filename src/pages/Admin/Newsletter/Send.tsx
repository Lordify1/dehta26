import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";
import Datatable from "@/components/Tools/Datatable";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Offcanvas from "@/components/Ui/Offcanvas";
import { AdminLayout } from "@/layouts/AdminLayout";
import axios from "axios";
import { appUrl } from "@/dapp";
import SendRequest from "@/components/Tools/SendRequest";
import { buttonClass, ItemView } from "@/components/Tools/Misc";
import NewsletterForm from "@/components/Admin/NewsletterForm";
import { IoTrashOutline } from "react-icons/io5";
import NewsletterTrash from "@/components/Admin/NewsletterTrash";

export default function NewsletterSendPage() {
  const [showForm, setShowForm] = useState(false);
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
        return (
          <Button
            title="See Content"
            icon={<EyeOutlined />}
            onClick={(prev) =>
              setShowItem({
                ...prev,
                item: "Content",
                data: record?.content,
                state: true,
              })
            }
          />
        );
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
          <Button
            title="See Images"
            icon={<EyeOutlined />}
            onClick={(prev) =>
              setShowItem({
                ...prev,
                item: "Images",
                data: JSON.parse(record?.images),
                state: true,
              })
            }
          />
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
          <Button
            title="See attachments"
            icon={<EyeOutlined />}
            onClick={(prev) =>
              setShowItem({
                ...prev,
                item: "Attachments",
                data: JSON.parse(record?.attachments),
                state: true,
              })
            }
          />
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
            text="Send"
            url={`/admin/newsletter/send/${record.id}`}
            method="post"
            data={{ id: record.id }}
            awaitConfirmation={true}
            confirmationTitle="Send?"
            confirmationButtonText="LFG!!!!"
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
      .get(appUrl + "/admin/newsletter/get")
      .then((res: any) => {
        // console.log(res),
        (setDataSource(res.data), setIsLoading(false));
      })
      .catch((res) => {
        setIsLoading(false);
      });
  }, [isLoading, selectedData]);

  return (
    <AdminLayout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Send Newsletter</h2>
        </div>

        <Table columns={columns} dataSource={dataSource} loading={isLoading} />

        {/* File View  */}
        <Offcanvas
          isOpen={showItem.state}
          onClose={() => setShowItem((prev) => ({ ...prev, state: false }))}
          title={`${showItem?.item}`}
          width="w-md-100"
        >
          {ItemView(showItem.item, showItem.data)}
        </Offcanvas>
      </div>
    </AdminLayout>
  );
}
