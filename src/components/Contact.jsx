
// "use client";

// import { Mail, Phone, MapPin, MessageSquare, Send } from "lucide-react";
// import React from "react";

// const Contact = () => {

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("Form submitted");
//     };

//     return (
//         <section className="w-full bg-gray-50 py-16 px-6">
//             <div className="max-w-7xl mx-auto">

//                 {/* Heading */}
//                 <div className="text-center mb-14">
//                     <h2 className="text-4xl font-bold text-amber-900 mb-4">
//                         Get in Touch
//                     </h2>
//                     <p className="text-amber-900 max-w-2xl mx-auto">
//                         Have questions? Our support team is here to help. Reach out to us
//                         via email, phone, or contact form.
//                     </p>
//                 </div>

//                 {/* Cards Container */}
//                 <div className="grid md:grid-cols-3 gap-8 mb-16">

//                     {/* Email Card */}
//                     <div className="bg-[#F5F1E8] border border-emerald-200 hover:border-emerald-600 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
//                         <div className="w-12 h-12 flex items-center justify-center bg-emerald-600 text-white rounded-lg mb-6 shadow">
//                             <Mail size={22} />
//                         </div>

//                         <h3 className="text-xl font-semibold text-amber-900 mb-3">
//                             Email
//                         </h3>

//                         <p className="text-amber-900 font-medium">
//                             info@mparesearch.org
//                         </p>
//                         <p className="text-amber-900 font-medium mb-3">
//                             submissions@mparesearch.org
//                         </p>

//                         <p className="text-sm text-amber-600">
//                             General inquiries and submission support
//                         </p>
//                     </div>

//                     {/* Phone Card */}
//                     <div className="bg-[#F5F1E8] border border-emerald-200 hover:border-emerald-600 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
//                         <div className="w-12 h-12 flex items-center justify-center bg-emerald-600 text-white rounded-lg mb-6 shadow">
//                             <Phone size={22} />
//                         </div>

//                         <h3 className="text-xl font-semibold text-amber-900 mb-3">
//                             Phone
//                         </h3>

//                         <p className="text-amber-800 font-medium">
//                             +1 (555) 123-4567
//                         </p>
//                         <p className="text-amber-800 font-medium mb-3">
//                             +1 (555) 123-4568
//                         </p>

//                         <p className="text-sm text-amber-600">
//                             International calling hours: 9AM–5PM EST
//                         </p>
//                     </div>

//                     {/* Address Card */}
//                     <div className="bg-[#F5F1E8] border border-emerald-200 hover:border-emerald-600 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
//                         <div className="w-12 h-12 flex items-center justify-center bg-emerald-600 text-white rounded-lg mb-6 shadow">
//                             <MapPin size={22} />
//                         </div>

//                         <h3 className="text-xl font-semibold text-amber-900 mb-3">
//                             Address
//                         </h3>

//                         <p className="text-amber-800 font-medium">
//                             MIT Campus
//                         </p>
//                         <p className="text-amber-800 font-medium mb-3">
//                             Cambridge, MA 02139, USA
//                         </p>

//                         <p className="text-sm text-amber-600">
//                             Physical office location
//                         </p>
//                     </div>
//                 </div>

//                 {/* Contact Form */}
//                 <div className="max-w-3xl mx-auto bg-[#F5F1E8] border border-emerald-200 rounded-2xl p-10 shadow-sm">

//                     <div className="flex items-center gap-3 mb-8">
//                         <MessageSquare className="text-emerald-600" size={26} />
//                         <h3 className="text-2xl font-bold text-amber-900">
//                             Send us a Message
//                         </h3>
//                     </div>

//                     <form onSubmit={handleSubmit}>

//                         {/* Name */}
//                         <div className="mb-6">
//                             <label htmlFor="name" className="block text-amber-900 font-medium mb-2">
//                                 Name
//                             </label>
//                             <input
//                                 id="name"
//                                 type="text"
//                                 placeholder="Your name"
//                                 required
//                                 className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-amber-900 bg-white"
//                             />
//                         </div>

//                         {/* Email */}
//                         <div className="mb-6">
//                             <label htmlFor="email" className="block text-amber-900 font-medium mb-2">
//                                 Email
//                             </label>
//                             <input
//                                 id="email"
//                                 type="email"
//                                 placeholder="your.email@example.com"
//                                 required
//                                 className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-amber-900 bg-white"
//                             />
//                         </div>

//                         {/* Subject */}
//                         <div className="mb-6">
//                             <label htmlFor="subject" className="block text-amber-900 font-medium mb-2">
//                                 Subject
//                             </label>
//                             <input
//                                 id="subject"
//                                 type="text"
//                                 placeholder="Message subject"
//                                 required
//                                 className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-amber-900 bg-white"
//                             />
//                         </div>

//                         {/* Message */}
//                         <div className="mb-6">
//                             <label htmlFor="message" className="block text-amber-900 font-medium mb-2">
//                                 Message
//                             </label>
//                             <textarea
//                                 id="message"
//                                 rows="5"
//                                 placeholder="Your message here..."
//                                 required
//                                 className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-amber-900 bg-white"
//                             ></textarea>
//                         </div>

//                         {/* Button */}
//                         <button
//                             type="submit"
//                             className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-300"
//                         >
//                             <Send size={18} />
//                             Send Message
//                         </button>

//                     </form>
//                 </div>

//             </div>
//         </section>
//     );
// };

// export default Contact;





"use client";

import { Mail, Phone, MapPin, MessageSquare, Send } from "lucide-react";
import React from "react";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <section className="w-full bg-gray-50 py-16 px-6 scroll-mt-24" id="contact">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-amber-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-amber-900 max-w-2xl mx-auto">
            Have questions? Our support team is here to help. Reach out to us
            via email, phone, or contact form.
          </p>
        </div>

        {/* Top Contact Cards */}
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
            <p className="text-amber-900 font-medium mb-3">
              submissions@mparesearch.org
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
              +1 (555) 123-4567
            </p>
            <p className="text-amber-800 font-medium mb-3">
              +1 (555) 123-4568
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
            <p className="text-amber-800 font-medium">MIT Campus</p>
            <p className="text-amber-800 font-medium mb-3">
              Cambridge, MA 02139, USA
            </p>
            <p className="text-sm text-amber-600">
              Physical office location
            </p>
          </div>
        </div>

        {/* Bottom Grid: Form + FAQ */}
        <div className="grid lg:grid-cols-2 gap-12">

          {/* LEFT - FORM */}
          <div className="bg-[#F5F1E8] border border-emerald-200 rounded-2xl p-10 shadow-sm">

            <div className="flex items-center gap-3 mb-8">
              <MessageSquare className="text-emerald-600" size={26} />
              <h3 className="text-2xl font-bold text-amber-900">
                Send us a Message
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <label className="block text-amber-900 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-amber-900 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-amber-900 font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  placeholder="Message subject"
                  className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-amber-900 font-medium mb-2">
                  Message
                </label>
                <textarea
                  rows="5"
                  required
                  placeholder="Your message here..."
                  className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
              >
                <Send size={18} />
                Send Message
              </button>

            </form>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-8">

            {/* FAQ */}
            <div className="bg-emerald-600 text-white rounded-2xl p-10 shadow-md">
              <h3 className="text-2xl font-bold mb-8">
                Frequently Asked Questions
              </h3>

              <div className="space-y-6 text-sm">

                <div>
                  <h4 className="font-semibold mb-2">
                    How long does the review process take?
                  </h4>
                  <p className="text-emerald-100">
                    The average review period is 14–21 days. The full
                    publication process typically takes 8–12 weeks.
                  </p>
                </div>

                <hr className="border-emerald-400/40" />

                <div>
                  <h4 className="font-semibold mb-2">
                    Can I submit to multiple journals?
                  </h4>
                  <p className="text-emerald-100">
                    No, manuscripts must be original and not under review elsewhere.
                  </p>
                </div>

                <hr className="border-emerald-400/40" />

                <div>
                  <h4 className="font-semibold mb-2">
                    What is the publication fee?
                  </h4>
                  <p className="text-emerald-100">
                    MPA Research is fully open access with no article processing charges.
                  </p>
                </div>

              </div>
            </div>

            {/* Response Time */}
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
