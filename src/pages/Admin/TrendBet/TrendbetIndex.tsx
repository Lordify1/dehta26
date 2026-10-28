import React, { useState, useEffect } from "react";
import { Button, Select, Table } from "antd";
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
import { useAdmin } from "@/context/AdminContext";
import { FaVoteYea } from "react-icons/fa";
import ATVotesView from "../../../components/Admin/ATVotesView";

export default function TrendbetIndex() {
  const [showForm, setShowForm] = useState(false);
  const { setShowOffCanvas, setOffId, SetOfftitle, Offtitle, OffId } =
    useOffCanvas();
  const [showTrash, setShowTrash] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    AdminLoading,
    setAdminLoading,
    getTrendbets,
    trendbets,
    setTrendbets,
    selectedVotes,
    setSelectedVotes,
  } = useAdmin();
  const [showItem, setShowItem] = useState({
    item: "",
    data: "",
    state: false,
  });

  const STATUS_OPTIONS = ["draft", "active", "closed", "paid_out"];

  const changeStatus = async (id, status) => {
    try {
      await axios.post(`${apiUrl}/api/admin/trendbet/${id}/status/${status}`);
      getTrendbets();
    } catch (err) {
      console.error("Failed to update trendbet status", err);
    }
  };
  const columns = [
    {
      title: "Body",
      dataIndex: "body",
    },
    {
      title: "Votes",
      key: "votes",
      render: (_: any, record: any) => {
        return (
          <Button
            icon={<FaVoteYea />}
            onClick={() => {
              setSelectedVotes(record?.votes);
              setShowOffCanvas(true);
              setOffId("ShowVotes");
              SetOfftitle(`Trend Votes`);
            }}
          />
        );
      },
    },
    {
      title: "Image",
      dataIndex: "icon",
      render: (_: any, record: any) => {
        return <img src={record?.image} className="w-15" alt="" />;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_: any, record: any) => (
        <Select
          value={record.status}
          onChange={(value) => changeStatus(record.id, value)}
          className="w-full"
        >
          {STATUS_OPTIONS.map((s) => (
            <Select.Option key={s} value={s}>
              {s.toUpperCase()}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    // {
    //   title: "Actions",
    //   key: "actions",
    //   render: (_:any,record:any) => (
    //     <div className="flex items-center gap-2">
    //       <Button icon={<EditOutlined />} onClick={() => {
    //         setSelectedData(record);
    //         setShowForm(true);
    //         setShowOffCanvas(true);
    //         setOffId('CreateGlass');
    //         SetOfftitle('Edit Glass');
    //       }} />
    //       <SendRequest
    //       url={`/api/admin/glass/delete/${record.id}`}
    //       method="delete"
    //       deleteBtn={true}
    //       data={{ id: record.id }}
    //       awaitConfirmation={true}
    //       confirmationTitle="Do you really want to delete this?"
    //       confirmationButtonText="Trash it!!"
    //       onResponse={() => {setIsLoading(true)}}
    //       />
    //     </div>
    //   ),
    // },
  ];

  useEffect(() => {
    getTrendbets();
  }, []);

  return (
    <AdminLayout>
      <Helmet>
        <title>Admin Trendbet - {appName}</title>
      </Helmet>
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-primary">Trendbets</h2>
        </div>

        <Table
          columns={columns}
          dataSource={trendbets}
          loading={AdminLoading}
          rowKey="id"
        />
      </div>

      <Offcanvas title={Offtitle}>
        {selectedVotes && OffId === "ShowVotes" && <ATVotesView />}
      </Offcanvas>
    </AdminLayout>
  );
}
