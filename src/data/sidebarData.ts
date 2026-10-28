import React from "react";
import { appUrl } from "@/dapp";
import {
  FaBriefcase,
  FaChartLine,
  FaDollarSign,
  FaEdit,
  FaEnvelopeSquare,
  FaGlasses,
  FaHome,
  FaQuestionCircle,
  FaSearchDollar,
  FaUsers,
} from "react-icons/fa";

// sidebarData.ts
export const sidebarData = [
  {
    section: "",
    href: appUrl,
    items: [
      {
        title: "Main",
        links: [
          {
            name: "Dashboard",
            href: "/admin/dashboard",
            icon: React.createElement(FaHome),
          },
          {
            name: "Users",
            href: "/admin/users",
            icon: React.createElement(FaUsers),
          },
          {
            name: "Trendbet",
            href: "/admin/trendbet",
            icon: React.createElement(FaChartLine),
          },
          {
            name: "Buildfi",
            href: "/admin/projects",
            icon: React.createElement(FaBriefcase),
            children: [
              {
                name: "Create/Edit",
                href: "/admin/projects/create",
                icon: React.createElement(FaEdit),
              },
              { name: "Listed", href: "/admin/projects", icon: "" },
            ],
          },
          {
            name: "EarnFi",
            href: "/admin/earnfi/offers",
            icon: React.createElement(FaDollarSign),
            children: [
              {
                name: "Offers",
                href: "/admin/earnfi/offers",
                icon: React.createElement(FaBriefcase),
              },
              {
                name: "Submissions",
                href: "/admin/earnfi/submissions",
                icon: React.createElement(FaEnvelopeSquare),
              },
            ],
          },
          {
            name: "Glasses",
            href: "/admin/glasses",
            icon: React.createElement(FaGlasses),
          },
          {
            name: "Lens Offers",
            href: "/admin/lens",
            icon: React.createElement(FaSearchDollar),
          },
          {
            name: "Quests",
            href: "/admin/quests",
            icon: React.createElement(FaQuestionCircle),
          },
          // {
          //   name: "Newsletter",
          //   href: "/admin/newsletter/",
          //   children: [
          //     { name: "Subscribers", href: "/admin/newsletter/subscribers" },
          //     { name: "Send Newsletter", href: "/admin/newsletter/send" },
          //   ],
          // },
        ],
      },
      // {
      //   title: "Sections",
      //   links: [
      //     { name: "Partners", href: "/admin/partners" },
      //     { name: "Team", href: "/admin/team" },
      //   ],
      // },
      // {
      //   title: "Settings",
      //   links: [
      //     { name: "Profile", href: "/admin/settings/profile" },
      //     { name: "Logout", href: "/logout", method: "post", className: "text-red-500" }
      //   ],
      // },
    ],
  },
];
