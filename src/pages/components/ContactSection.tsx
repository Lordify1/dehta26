import { appUrl } from "@/dapp";
import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { toast } from "react-toastify";
import { classMap } from "@/components/Tools/Misc";
import SendRequest from "@/components/Tools/SendRequest";

const inputs = [
  { name: "name", label: "Your Name", type: "text", autocomplete: "name" },
  { name: "email", label: "Your Email", type: "email", autocomplete: "email" },
  { name: "message", label: "Your Message", type: "textarea" },
];

type FormFields = {
  name: string;
  email: string;
  message: string;
};

const RECAPTCHA_SITE_KEY = "6LcCuz0rAAAAAIyNeK21di8FmPkGIXdk3mVL9bMd";
const BACKEND_API_URL = "contact";

const ContactSection: React.FC = () => {
  const [form, setForm] = useState<FormFields>({
    name: "",
    email: "",
    message: "",
  });
  const [focus, setFocus] = useState<Record<keyof FormFields, boolean>>({
    name: false,
    email: false,
    message: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (field: keyof FormFields) =>
    setFocus((prev) => ({ ...prev, [field]: true }));
  const handleBlur = (field: keyof FormFields) =>
    setFocus((prev) => ({ ...prev, [field]: false }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error("All fields are required!");
      return;
    }

    setIsSubmitting(true);

    try {
      // Step 1: Grab CSRF cookie first (if using Laravel Sanctum)
      // await axios.get(appUrl + 'sanctum/csrf-cookie', { withCredentials: true });

      // Step 2: Send the form + recaptcha token
      const response = await axios.post(
        appUrl + BACKEND_API_URL,
        { ...form },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );

      if (response.status === 200 && response.data.success) {
        toast.success("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
        setFocus({ name: false, email: false, message: false });
      } else {
        toast.error(
          response.data.message || "Something went wrong. Please try again.",
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="bg-background text-primary py-20 px-6 sm:px-16"
    >
      <h2 className="text-3xl font-extrabold mb-10 text-center tracking-wide">
        Contact & Support
      </h2>

      <form className={`max-w-lg mx-auto`} onSubmit={handleSubmit}>
        {inputs.map(({ name, label, type, autocomplete }) => {
          const key = name as keyof FormFields;
          const isFocusedOrFilled = focus[key] || form[key].length > 0;

          return (
            <div key={name} className="relative">
              <label htmlFor={name} className={`${classMap.label}`}>
                {label}
              </label>
              {type === "textarea" ? (
                <textarea
                  id={name}
                  name={name}
                  value={form[key]}
                  onChange={handleChange}
                  onFocus={() => handleFocus(key)}
                  onBlur={() => handleBlur(key)}
                  className={`${classMap.input}`}
                />
              ) : (
                <input
                  id={name}
                  name={name}
                  type={type}
                  autoComplete={autocomplete}
                  value={form[key]}
                  onChange={handleChange}
                  onFocus={() => handleFocus(key)}
                  onBlur={() => handleBlur(key)}
                  className={`${classMap.input}`}
                />
              )}
            </div>
          );
        })}

        {/* <div className="flex justify-center">
          <ReCAPTCHA
            sitekey={RECAPTCHA_SITE_KEY}
            size="invisible"
            ref={recaptchaRef}
          />
        </div> */}

        <SendRequest
          text="Send Message"
          method="post"
          url="/contact"
          onResponse={() => {}}
        />
      </form>
    </section>
  );
};

export default ContactSection;
