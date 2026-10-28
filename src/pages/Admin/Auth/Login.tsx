// LoginPage.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import axiosClient from "@/axiosClient";
import SendRequest from "@/components/Tools/SendRequest";
import { classMap } from "@/components/Tools/Misc";
import { Helmet } from "react-helmet-async";
import { appName } from "@/dapp";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background herobg flex items-center justify-center text-primary px-6">
      <Helmet>
        <title>Admin Login - {appName}</title>
      </Helmet>
      <div className="w-full max-w-md bg-accent border border-border p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className={`${classMap.label}`}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`${classMap.input()}`}
            />
          </div>
          <div>
            <label htmlFor="password" className={`${classMap.label}`}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className={`${classMap.input()}`}
            />
          </div>
          <SendRequest
            url="/login"
            method="post"
            data={form}
            className="w-full"
            redirect={true}
            onResponse={(res: any) => console.log(res)}
            text="Login"
          />
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
