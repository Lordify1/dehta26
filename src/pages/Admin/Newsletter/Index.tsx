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

export default function Index() {
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
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedData(record);
              setShowForm(true);
            }}
          />
          <SendRequest
            url={`/admin/newsletter/delete/${record.id}`}
            method="delete"
            deleteBtn={true}
            data={{ id: record.id }}
            awaitConfirmation={true}
            confirmationTitle="Do you really want to send this to trash?"
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
          <h2 className="text-xl font-semibold text-white">Newsletters</h2>
          <div className="justify-end items-center">
            <Button
              icon={<IoTrashOutline />}
              onClick={() => {
                setShowTrash(true);
              }}
            >
              <span className="p-1">TRASH</span>
            </Button>
            <button
              className="bg-[#006F57] text-white px-4 mx-2 py-2 rounded-md"
              onClick={() => {
                setSelectedData(null);
                setShowForm(true);
              }}
            >
              + Add Newsletter
            </button>
          </div>
        </div>

        <Table columns={columns} dataSource={dataSource} loading={isLoading} />

        <Offcanvas
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          title={selectedData ? "Edit Newsletter" : "Add Newsletter"}
        >
          <NewsletterForm
            onClose={() => setShowForm(false)}
            onResponse={() => setIsLoading(true)}
            EditData={selectedData}
          />
        </Offcanvas>

        {/* Trash View  */}
        <Offcanvas
          isOpen={showTrash}
          onClose={() => setShowTrash(false)}
          title={"Trash"}
          width="w-full"
        >
          <NewsletterTrash
            onClose={() => setShowTrash(false)}
            reLoad={showTrash}
          />
        </Offcanvas>

        {/* File View  */}
        <Offcanvas
          isOpen={showItem.state}
          onClose={() => setShowItem((prev) => ({ ...prev, state: false }))}
          title={`${showItem?.item}`}
          width="w-full"
        >
          {ItemView(showItem.item, showItem.data)}
        </Offcanvas>
      </div>
    </AdminLayout>
  );
}
