import React, { useEffect, useState } from "react";
import SendRequest from "@/components/Tools/SendRequest";
import { appName, advisorUrl } from "@/dapp";
import { classMap } from "@/components/Tools/Misc";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "../../components/Layout";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function NewPassword() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const token = params.get("token") || "";
  const email = params.get("email") || "";

  if (!token && !email) {
    window.location.href = "/404";
  }

  const [form, setForm] = useState({
    email: email,
    password: "",
    password_confirmation: "",
    token: token,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordRules, setPasswordRules] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "password") {
      setPasswordRules({
        length: value.length >= 8,
        lowercase: /[a-z]/.test(value),
        uppercase: /[A-Z]/.test(value),
        number: /\d/.test(value),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Reset Password - {appName}</title>
      </Helmet>
      <Layout showNavs={false}>
        <div className="min-h-screen bg-background text-primary flex flex-col items-center justify-center px-4 py-8 herobg">
          <h1 className="text-3xl font-bold mb-3">Reset Password</h1>
          <p className="text-primary mb-6">Set your new password</p>

          <form className="w-full max-w-md space-y-4">
            <input
              type="email"
              name="email"
              value={form.email}
              placeholder="Email"
              readOnly
              className={`${classMap.input()} bg-gray-100 cursor-not-allowed`}
            />

            <div>
              <label className={`${classMap.label()}`}>New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="New Password"
                  className={`${classMap.input()}`}
                  required
                  autoComplete="new-password"
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

              {/* Password rules */}
              <div className="mt-2 text-sm space-y-1">
                <p>Password should have:</p>
                <ul className="ml-4 list-disc">
                  <li
                    className={
                      passwordRules.length ? "text-green-500" : "text-gray-400"
                    }
                  >
                    At least 8 characters
                  </li>
                  <li
                    className={
                      passwordRules.lowercase
                        ? "text-green-500"
                        : "text-gray-400"
                    }
                  >
                    At least one lowercase letter
                  </li>
                  <li
                    className={
                      passwordRules.uppercase
                        ? "text-green-500"
                        : "text-gray-400"
                    }
                  >
                    At least one uppercase letter
                  </li>
                  <li
                    className={
                      passwordRules.number ? "text-green-500" : "text-gray-400"
                    }
                  >
                    At least one number
                  </li>
                  <li
                    className={
                      passwordRules.special ? "text-green-500" : "text-gray-400"
                    }
                  >
                    At least one special character
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <label className={`${classMap.label()}`}>Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="password_confirmation"
                  value={form.password_confirmation}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className={`${classMap.input()}`}
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--owner)]"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye className="text-[var(--owner)]" />
                  )}
                </button>
              </div>
            </div>

            <SendRequest
              url="/reset-password"
              method="post"
              data={form}
              className="w-full"
              redirect={true}
              onResponse={() => {}}
              text="Reset Password"
              disabled={
                !Object.values(passwordRules).every(Boolean) ||
                form.password !== form.password_confirmation
              }
            />
          </form>

          <p className="text-primary opacity-60 mt-6">
            Password is Set?{" "}
            <Link to={`/login`} className="underline text-[var(--owner)]">
              Login
            </Link>
          </p>
        </div>
      </Layout>
    </>
  );
}
