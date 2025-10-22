import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";

const Contact = () => {
  const [errors, setErrors] = useState({});
  const { getToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newErrors = {};

    if (!formData.get("name")) newErrors.name = "Name is required";
    if (!formData.get("email")) newErrors.email = "Email is required";
    if (!formData.get("message")) newErrors.message = "Message is required";

    setErrors(newErrors);
    const token = await getToken();

    if (!token) {
      toast.error("You are not signed in");
      return;
    }

    if (Object.keys(newErrors).length === 0) {
      await axios
        .post(
          `${import.meta.env.VITE_BASE_URL}/api/contact`,
          {
            name: formData.get("name"),
            email: formData.get("email"),
            subject: formData.get("subject"),
            message: formData.get("message"),
          },
          { headers: { Authorization: `Bearer ${token}` } },
        )
        .then((response) => {
          toast.success(response.data.message);
          e.target.reset();
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <h1 className="bg-[#e2e2e2] text-center font-heading text-2xl leading-18 font-semibold md:text-3xl md:leading-24">
        Contact Us
      </h1>
      <div className="container mx-auto my-8 grid grid-cols-1 gap-12 px-6 md:px-16 lg:my-12 lg:grid-cols-2 lg:px-24 xl:px-36">
        {/* Left Side - Form */}
        <div>
          <h1 className="mb-3 text-xl font-semibold text-gray-900 md:text-3xl">
            Get in Touch
          </h1>
          <p className="mb-8 text-sm text-gray-600 lg:text-base">
            We’d love to hear from you. Inquire anything you want.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className={`mt-1 w-full rounded-md border px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none sm:px-4 sm:py-2.5 ${errors.name ? "border-red-500" : "border-neutral-300"} `}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500 lg:text-sm">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className={`mt-1 w-full rounded-md border px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none sm:px-4 sm:py-2.5 ${errors.email ? "border-red-500" : "border-neutral-300"} `}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none sm:px-4 sm:py-2.5"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                rows="5"
                placeholder="Message"
                className={`mt-1 w-full rounded-md border px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none sm:px-4 sm:py-2.5 ${errors.message ? "border-red-500" : "border-neutral-300"} `}
              ></textarea>
              {errors.message && (
                <p className="mt-1 text-xs text-red-500">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="group relative overflow-hidden rounded-lg border border-neutral-600 px-5 py-2 md:px-4 md:py-2 lg:px-5 lg:py-2"
            >
              <span className="absolute inset-0 -translate-x-full bg-neutral-900 transition-transform duration-300 ease-linear group-hover:translate-x-0" />
              <span className="relative z-10 text-base font-semibold text-black transition-colors duration-300 group-hover:text-white">
                Submit
              </span>
            </button>
          </form>
        </div>

        {/* Right Side - Contact Info */}
        <div className="space-y-8 lg:my-12">
          <div>
            <p className="text-base font-medium text-[#008cae] lg:text-[17px]">
              +977-15903206/7
            </p>
            <p className="mt-1 text-sm text-gray-600 sm:text-[15px]">
              Call us directly if you need any help. We will help you.
            </p>
          </div>

          <div>
            <p className="text-base font-medium text-[#008cae] lg:text-[17px]">
              info@qfxcinemas.com
            </p>
            <p className="mt-1 text-sm text-gray-600 sm:text-[15px]">
              Mail us directly if you have any problems. We will analyze for
              you.
            </p>
          </div>

          <div>
            <p className="text-base font-medium text-[#008cae] lg:text-[17px]">
              Central Plaza , Itahari <br />
              Bhatbhateni, Biratnagar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
