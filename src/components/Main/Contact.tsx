import React from "react";
import { Fade } from "react-awesome-reveal";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaTwitter, FaCalendarAlt } from "react-icons/fa";
import SendRequest from "../Tools/SendRequest";
import { classMap } from "../Tools/Misc";


export const Contact = () => {

  const [data, setData] = React.useState({
    name: "",
    email: "",
    message: "",
    reason_id: ""
  })

  const contactTypes = [
    "complaint",
    "request",
    "feedback",
    "support",
    "general_inquiry",
    "other",
  ]

  const setDataToNull = () => {
    setData({
      name: "",
      email: "",
      message: "",
      reason_id: ""
    })
  }

  return (
    <section className="py-10 bg-[#0e0f10] text-white" id="contact">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <Fade cascade direction="left" triggerOnce>
          <div>
            <h2 className="text-4xl font-bold mb-4 text-[#4db8ff]">Contact <h2 className="text-[var(--secondary)] inline">Us</h2></h2>
            <h6 className="text-gray-400 mb-8">
              Have questions or want to collaborate? Fill out the form and we’ll get back to you ASAP.
            </h6>
            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                onChange={(e) => setData((prev) => ({...prev, name: e.target.value}))}
                className={`${classMap.input()}`}
              />
              <input
                type="email"
                placeholder="Your Email"
                onChange={(e) => setData((prev) => ({...prev, email: e.target.value}))}
                className={`${classMap.input()}`}
              />
              <textarea
                rows={5}
                placeholder="Your Message"
                onChange={(e) => setData((prev) => ({...prev, message: e.target.value}))}
                className={`${classMap.input()}`}
              ></textarea>
              <select 
              name="reason_id"
              id="reason_id"
              onChange={(e) => setData((prev) => ({...prev, reason_id: e.target.value}))}
              className={`${classMap.input()}`}>
                <option value="" className="text-red-200">Select message Purpose</option>
                {contactTypes.map((item, index) => {
                  return(
                    <option value={item} key={index}>{item}</option>
                  )
                })}
              </select>
              <SendRequest
                url={'/contact_us'}
                method="post"
                data={data}
                className="w-full"
                onResponse={() => {setDataToNull()}}
                text="Send Message"
              />
            </form>
          </div>
        </Fade>

        <Fade direction="right" triggerOnce>
          <div className="space-y-6">
            {/* <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-[#4db8ff] text-xl mt-1" />
              <div>
                <h4 className="font-semibold text-lg">Our Location</h4>
                <p className="text-gray-400">Swiss-based HQ • Remote-first worldwide</p>
              </div>
            </div> */}

            <div className="flex items-start gap-4 ">
              <FaEnvelope className="text-[#4db8ff] text-xl mt-1" />
              <div>
                <h4 className="font-semibold text-lg">Email Us</h4>
                  <a href="mailto:info@phifinance.tech" target="_blank" className="text-gray-400 hover:text-[var(--primary)]">info@phifinance.tech</a> 
              </div>
            </div>

            <div className="flex items-start gap-4 ">
              <FaCalendarAlt className="text-[#4db8ff] text-xl mt-1" />
              <div>
                <h4 className="font-semibold text-lg">Book a Call with BD</h4>
                <a href="https://calendly.com/phiweb3bull" target="_blank" className="text-gray-400 hover:text-[var(--primary)]">Go to Calendly</a> 
              </div>
            </div>

            <div className="flex items-start gap-4 ">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 30 30" className="text-[var(--primary)] text-sm mt-1">
                <path fill="currentColor" d="M 6 4 C 4.895 4 4 4.895 4 6 L 4 24 C 4 25.105 4.895 26 6 26 L 24 26 C 25.105 26 26 25.105 26 24 L 26 6 C 26 4.895 25.105 4 24 4 L 6 4 z M 8.6484375 9 L 13.259766 9 L 15.951172 12.847656 L 19.28125 9 L 20.732422 9 L 16.603516 13.78125 L 21.654297 21 L 17.042969 21 L 14.056641 16.730469 L 10.369141 21 L 8.8945312 21 L 13.400391 15.794922 L 8.6484375 9 z M 10.878906 10.183594 L 17.632812 19.810547 L 19.421875 19.810547 L 12.666016 10.183594 L 10.878906 10.183594 z"></path>
                </svg>
              <div>
                <h4 className="font-semibold text-lg">Reach out on X</h4>
                <a href="https://x.com/phiweb3bull?s=21" target="_blank" className="text-gray-400 hover:text-[var(--primary)]">Go to X</a> 
              </div>
            </div>

            {/* <div className="flex items-start gap-4">
              <FaPhoneAlt className="text-[#4db8ff] text-xl mt-1" />
              <div>
                <h4 className="font-semibold text-lg">Phone</h4>
                <p className="text-gray-400">+41 22 123 4567 (Mon–Fri)</p>
              </div>
            </div> */}
          </div>
        </Fade>
      </div>
    </section>
  );
};
