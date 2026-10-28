import { appName } from "@/dapp";
import { useAdmin } from "@/context/AdminContext";
import { AdminLayout } from "@/layouts/AdminLayout";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Loading } from "../../components/Tools/Misc";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { isLoading, dbData, getDBData } = useAdmin();

  const stats = [
    { title: "Users", id: "users", url: "/admin/users", sub: "Total Users" },
    {
      title: "Projects",
      id: "projects",
      url: "/admin/projects",
      sub: "Total Projects",
    },
    {
      title: "Trends",
      id: "questions",
      url: "/admin/trendbet",
      sub: "Total Trends",
    },
    {
      title: "Offers",
      id: "earnfi_offers",
      url: "/admin/earnfi/offers",
      sub: "Total Offers",
    },
    {
      title: "Submissions",
      id: "earnfi_submissions",
      url: "/admin/earnfi/submissions",
      sub: "Total Submissions",
    },
  ];

  useEffect(() => {
    getDBData();
  }, [getDBData]);

  return (
    <AdminLayout>
      <Helmet>
        <title>Admin Dashboard - {appName}</title>
      </Helmet>
      <div className="p-2">
        <h1 className="text-2xl md:text-3xl font-bold text-primary mb-6">
          Dashboard
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <Loading />
          ) : (
            stats.map((stat, i) => (
              <Link
                to={stat.url}
                key={i}
                className="bg-[#121418] rounded-xl border border-[#1f1f1f] p-6 shadow-md hover:shadow-lg hover:border-(--owner) transition"
              >
                <h3 className="text-gray-400 text-sm">{stat.title}</h3>
                <p className="text-2xl text-white font-bold mt-1">
                  {dbData?.[stat.id] ?? 0}
                </p>
                <span className="text-xs text-gray-500">{stat.sub}</span>
              </Link>
            ))
          )}
        </div>

        {/* <div className="mt-10">
                    <h2 className="text-xl text-white font-semibold mb-4">Activity Log (Dummy)</h2>
                    <ul className="space-y-3">
                    <li className="text-gray-300 border-l-4 border-[#1ecb8e] pl-3">
                        New subscriber joined – <span className="text-gray-500 text-sm">2 hrs ago</span>
                    </li>
                    <li className="text-gray-300 border-l-4 border-[#1ecb8e] pl-3">
                        Newsletter “Welcome to Phi” sent – <span className="text-gray-500 text-sm">Yesterday</span>
                    </li>
                    <li className="text-gray-300 border-l-4 border-[#1ecb8e] pl-3">
                        Partner “GigaChain” added – <span className="text-gray-500 text-sm">2 days ago</span>
                    </li>
                    </ul>
                </div> */}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
