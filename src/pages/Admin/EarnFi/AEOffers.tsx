import React, { useEffect, useState } from "react";
import { Table, Button, Select, Tag } from "antd";
import { EyeOutlined, CheckOutlined } from "@ant-design/icons";
import axios from "axios";
import Offcanvas from "@/components/Ui/Offcanvas";
import { useOffCanvas } from '@/context/OffCanvasContext';
import { AdminLayout } from "@/layouts/AdminLayout";
import { apiUrl } from "@/App";
import EarnFiOfferDetail from "@/components/ui/Advisor/EarnFiOfferDetail";
import { useAdmin } from '@/context/AdminContext';


const { Option } = Select;

const STATUS_OPTIONS = [
  "draft",
  "active",
  "paused",
  "completed",
  "expired",
];

export default function AEOffers() {
  const [data, setData] = useState([]);
  
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const {
    getEarnFiOffers,
    earnFiOffers, 
    isLoading, 
    setIsLoading
} = useAdmin();
    const { setShowOffCanvas, OffId, Offtitle, setOffId, SetOfftitle } = useOffCanvas();
  
  useEffect(() => {
    getEarnFiOffers();
  }, [])


  const approveOffer = async (id) => {
    await axios.post(`${apiUrl}/api/admin/earnfi/offers/${id}/approve`);
    getEarnFiOffers();
  };

  const changeStatus = async (id, status) => {
    await axios.post(
      `${apiUrl}/api/admin/earnfi/offers/${id}/status/${status}`
    );
    getEarnFiOffers();
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (type) => (
        <Tag color={type === "task" ? "cyan" : "purple"}>{type}</Tag>
      ),
    },
    {
      title: "Escrow Ref",
      dataIndex: "escrow_reference",
      render: (ref) =>
        ref ? `${ref.slice(0, 8)}...${ref.slice(-6)}` : "-",
    },
    {
      title: "Creator",
      dataIndex: "creator",
      render: (creator) => creator?.name || "—",
    },
    {
      title: "Submissions",
      dataIndex: "submissions_count",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_, record) => (
        <Select
          value={record.status}
          onChange={(value) => changeStatus(record.id, value)}
          className="w-full"
        >
          {STATUS_OPTIONS.map((s) => (
            <Option key={s} value={s}>
              {s.toUpperCase()}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedOffer(record);
              setShowOffCanvas(true);
              setOffId('e_detail');
            }}
          />
          {!record.approved && (
            <Button
              icon={<CheckOutlined title="Approve Offer"/>}
              onClick={() => approveOffer(record.id)}
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <h2 className="text-xl font-semibold mb-4">Earnfi Offers</h2>

      <Table
        columns={columns}
        dataSource={earnFiOffers}
        loading={isLoading}
        rowKey="id"
      />

      <Offcanvas

        title="Earnfi Offer Details"
      >
        {(selectedOffer && OffId === 'e_detail') && <EarnFiOfferDetail offer={selectedOffer} />}
      </Offcanvas>
    </AdminLayout>
  );
}
