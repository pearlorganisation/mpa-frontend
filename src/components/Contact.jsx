"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, MessageSquare, Send, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
// Adjust path if your apiSlice is located elsewhere
import { useSendEnquiryMutation } from "../store/apiSlice"; 

const Contact = () => {
  // 1. Setup the API mutation hook and extract the loading state
  const [sendEnquiry, { isLoading }] = useSendEnquiryMutation();

  // 2. State to store the form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // 3. Update state when the user types in the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 4. Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the data to the server
      await sendEnquiry(formData).unwrap();

      // Show professional success toast
      toast.success("Message sent successfully! Our team will connect with you shortly.", {
        duration: 5000, // Show for 5 seconds
      });

      // Clear the form fields after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      // Show professional error toast if submission fails
      const errorMessage = err?.data?.message || err?.message || "Failed to send message. Please try again.";
      toast.error(errorMessage, {
        duration: 5000,
      });
    }
  };

  return (
    <section className="w-full bg-gray-50 py-16 px-6 scroll-mt-24" id="contact">
      {/* 
        Professional Toaster Configuration 
        This provides a clean, modern look for notifications 
      */}

      <div className="max-w-7xl mx-auto">

        {/* Heading Section */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-amber-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-amber-900 max-w-2xl mx-auto">
            Have questions? Our support team is here to help. Reach out to us
            via email, phone, or contact form.
          </p>
        </div>

        {/* Top Contact Info Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">

          {/* Email Card */}
          <div className="bg-[#F5F1E8] border border-emerald-200 hover:border-emerald-600 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 flex items-center justify-center bg-emerald-600 text-white rounded-lg mb-6 shadow">
              <Mail size={22} />
            </div>
            <h3 className="text-xl font-semibold text-amber-900 mb-3">Email</h3>
            <p className="text-amber-900 font-medium">
              info@mparesearch.org
            </p>
            <p className="text-sm text-amber-600">
              General inquiries and submission support
            </p>
          </div>

          {/* Phone Card */}
          <div className="bg-[#F5F1E8] border border-emerald-200 hover:border-emerald-600 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 flex items-center justify-center bg-emerald-600 text-white rounded-lg mb-6 shadow">
              <Phone size={22} />
            </div>
            <h3 className="text-xl font-semibold text-amber-900 mb-3">Phone</h3>
            <p className="text-amber-800 font-medium">
              +91-9452292537
            </p>
            <p className="text-amber-800 font-medium mb-3">
              +91-8923580628
            </p>
            <p className="text-sm text-amber-600">
              International calling hours: 9AM–5PM EST
            </p>
          </div>

          {/* Address Card */}
          <div className="bg-[#F5F1E8] border border-emerald-200 hover:border-emerald-600 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 flex items-center justify-center bg-emerald-600 text-white rounded-lg mb-6 shadow">
              <MapPin size={22} />
            </div>
            <h3 className="text-xl font-semibold text-amber-900 mb-3">
              Address
            </h3>
            <p className="text-amber-800 font-medium mb-3">
              Gaurs City, Greater Noida
            </p>
            <p className="text-sm text-amber-600">
              Physical office location
            </p>
          </div>
        </div>

        {/* Bottom Section: Form & FAQ Grid */}
        <div className="grid lg:grid-cols-2 gap-12">

          {/* LEFT SIDE: Contact Form */}
          <div className="bg-[#F5F1E8] border border-emerald-200 rounded-2xl p-10 shadow-sm">

            <div className="flex items-center gap-3 mb-8">
              <MessageSquare className="text-emerald-600" size={26} />
              <h3 className="text-2xl font-bold text-amber-900">
                Send us a Message
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Name Input */}
              <div>
                <label className="block text-amber-900 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 outline-none disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-amber-900 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 outline-none disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
                />
              </div>

              {/* Subject Input */}
              <div>
                <label className="block text-amber-900 font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  placeholder="Message subject"
                  className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 outline-none disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
                />
              </div>

              {/* Message Textarea */}
              <div>
                <label className="block text-amber-900 font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  required
                  disabled={isLoading}
                  placeholder="Your message here..."
                  className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 outline-none disabled:opacity-60 disabled:cursor-not-allowed transition-opacity resize-none"
                />
              </div>

              {/* Submit Button with Loader */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center gap-2 font-semibold py-3.5 rounded-lg shadow-md transition-all duration-200 ${
                  isLoading
                    ? "bg-emerald-500 cursor-not-allowed text-white opacity-80"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-lg active:scale-[0.98]"
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Sending your message...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </button>

            </form>
          </div>

          {/* RIGHT SIDE: FAQ & Response Times */}
          <div className="space-y-8">

            {/* FAQ Section */}
            <div className="bg-emerald-600 text-white rounded-2xl p-10 shadow-md">
              <h3 className="text-2xl font-bold mb-8">
                Frequently Asked Questions
              </h3>

              <div className="space-y-6 text-sm">

                <div>
                  <h4 className="font-semibold mb-2 text-base">
                    How long does the review process take?
                  </h4>
                  <p className="text-emerald-100">
                    The average review period is 14–21 days. The full
                    publication process typically takes 8–12 weeks.
                  </p>
                </div>

                <hr className="border-emerald-400/40" />

                <div>
                  <h4 className="font-semibold mb-2 text-base">
                    Can I submit to multiple journals?
                  </h4>
                  <p className="text-emerald-100">
                    No, manuscripts must be original and not under review elsewhere.
                  </p>
                </div>

                <hr className="border-emerald-400/40" />

                <div>
                  <h4 className="font-semibold mb-2 text-base">
                    What is the publication fee?
                  </h4>
                  <p className="text-emerald-100">
                    MPA Research is fully open access with no article processing charges.
                  </p>
                </div>

              </div>
            </div>

            {/* Response Time Section */}
            <div className="bg-[#E8E2D3] border border-emerald-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-amber-900 mb-6">
                Response Times
              </h3>

              <div className="space-y-4 text-sm">

                <div className="flex justify-between border-b border-emerald-200 pb-3">
                  <span className="text-amber-900 font-medium">
                    General Inquiries
                  </span>
                  <span className="text-emerald-600 font-semibold">
                    24 hours
                  </span>
                </div>

                <div className="flex justify-between border-b border-emerald-200 pb-3">
                  <span className="text-amber-900 font-medium">
                    Submission Issues
                  </span>
                  <span className="text-emerald-600 font-semibold">
                    12 hours
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-amber-900 font-medium">
                    Technical Support
                  </span>
                  <span className="text-emerald-600 font-semibold">
                    4 hours
                  </span>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;