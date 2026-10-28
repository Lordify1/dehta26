import React, { useEffect, useState } from "react";
import { Table, Button, Select, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import Offcanvas from "@/components/Ui/Offcanvas";
import { AdminLayout } from "@/layouts/AdminLayout";
import { apiUrl } from "@/App";
import { useAdmin } from '@/context/AdminContext';
import { useOffCanvas } from '@/context/OffCanvasContext';
import AESubmissionDetail from "../../../components/Admin/AESubmissionDetail";
import { FaMoneyCheck } from "react-icons/fa";
import PaySubmission from "../../../components/Admin/PaySubmission";

const STATUS_OPTIONS = [
  "pending",
  "approved",
  "rejected",
  "paid",
];

export default function AESubmissions() {
  const [selected, setSelected] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const {
    earnfiSubmissions,
    getEarnFiSubmissions,
    isLoading, 
    setIsLoading
  } = useAdmin();
    const { setShowOffCanvas, OffId, Offtitle, setOffId, SetOfftitle } = useOffCanvas();
    
    useEffect(() => {
      getEarnFiSubmissions();
    }, [])

  const updateStatus = async (id, status) => {
    await axios.post(
      `${apiUrl}/api/admin/earnfi/submissions/${id}/status`,
      { status }
    );
    getEarnFiSubmissions();
  };

  const columns = [
    {
      title: "Offer",
      dataIndex: "offer",
      render: (offer) => (
        <div>
          <strong>{offer?.title}</strong>
          <div className="text-xs text-muted">{offer?.type}</div>
        </div>
      ),
    },
    {
      title: "Applicant",
      render: (_, record) =>
        record.user ? record.user.name : record.full_name,
    },
    {
      title: "Type",
      render: (_, record) => (
        <Tag>{record.offer?.type}</Tag>
      ),
    },
    {
      title: "Status",
      render: (_, record) => (
        <Select
          value={record.status}
          onChange={(val) => updateStatus(record.id, val)}
          className="w-full"
        >
          {STATUS_OPTIONS.map((s) => (
            <Select.Option key={s} value={s}>
              {s}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Paid",
      render: (_, record) => (
        <Button
          icon={<FaMoneyCheck />}
          onClick={() => {
            setSelected(record);
            setShowOffCanvas(true);
            setOffId('pay_user')
          }}
        />
      ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Button
          icon={<EyeOutlined />}
          onClick={() => {
            setSelected(record);
            setShowOffCanvas(true);
            setOffId('s_detail')
          }}
        />
      ),
    },
  ];

  return (
    <AdminLayout>
      <h2 className="text-xl font-semibold mb-4">Earnfi Submissions</h2>

      <Table
        columns={columns}
        dataSource={earnfiSubmissions}
        loading={isLoading}
        rowKey="id"
      />

      <Offcanvas
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        title="Submission Details"
      >
        {(selected && OffId === 's_detail') && <AESubmissionDetail submission={selected} />}
        {(selected && OffId === 'pay_user') && <PaySubmission submission={selected} />}
      </Offcanvas>
    </AdminLayout>
  );
}
