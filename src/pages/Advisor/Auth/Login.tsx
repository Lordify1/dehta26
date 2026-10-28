import React, { useState } from "react";
import SendRequest from "@/components/Tools/SendRequest";
import { appName } from "@/dapp";
import { classMap } from "@/components/Tools/Misc";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "../../components/Layout";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Helmet>
        <title>Login - {appName}</title>
        <meta name="description" content="Login to your dashboard" />
      </Helmet>
      <Layout showNavs={false}>
        <div className="min-h-screen bg-background text-primary flex flex-col items-center justify-center px-4 py-8 herobg">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">Welcome back</h1>
          <p className="text-primary mb-6">One login for everyone</p>

          <form className="w-full max-w-md space-y-4">
            <div className="flex flex-col">
              <label htmlFor="email" className={`${classMap.label()}`}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className={`${classMap.input()}`}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className={`${classMap.label()}`}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className={`${classMap.input()}`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--owner)]"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye className="text-(--owner)" />
                  )}
                </button>
              </div>
            </div>

            <SendRequest
              url="/login"
              method="post"
              data={form}
              className="w-full"
              redirect={true}
              onResponse={() => {}}
              text="Login"
            />
          </form>

          <p className="text-primary mt-6">
            <Link to={`/register`} className="underline text-[var(--owner)]">
              Register
            </Link>{" "}
            -{" "}
            <Link
              to={`/reset-password`}
              className="underline text-[var(--owner)]"
            >
              Forgot Password
            </Link>
          </p>
        </div>
      </Layout>
    </>
  );
}
