import React, { useState } from "react";
import { useScrollReveal } from "../hooks/useCustomHooks";
import { CONTACT, CONTACT_INFO, SOCIAL } from "../data/portfolioData";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [ref, visible]  = useScrollReveal();
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const sendMail = () => {
    const subject = form.subject || `Portfolio message from ${form.name || "a visitor"}`;
    const body = `${form.message}${form.name ? `\n\n— ${form.name}` : ""}${form.email ? ` (${form.email})` : ""}`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const inputCls = "w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all";

  return (
    <section id="contact" className="py-20 md:py-28 xl:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-semibold tracking-widest text-blue-600 uppercase">Contact</span>
          <span className="flex-1 h-px bg-gray-200" />
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-12 md:mb-16 leading-tight">
          Let's work<br />
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg,#2563eb,#7c3aed)" }}>
            together.
          </span>
        </h2>

        <div ref={ref} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          {/* Info card */}
          <div className="rounded-3xl border border-gray-100 p-6 sm:p-8 flex flex-col justify-between"
            style={{ background: "linear-gradient(135deg,#f8faff 0%,#f0f4ff 50%,#f5f0ff 100%)" }}>
            <div>
              <p className="text-gray-600 leading-relaxed mb-8 text-base lg:text-lg">
                Whether you have a project in mind, a role to discuss, or simply want to connect —
                my inbox is always open.
              </p>

              <div className="space-y-4 sm:space-y-5 mb-8 sm:mb-10">
                {CONTACT_INFO.map((info, i) => (
                  <div key={i} className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
                      style={{ background: "linear-gradient(135deg,#2563eb,#7c3aed)" }}>
                      <i className={`${info.icon} text-white text-sm`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{info.label}</p>
                      {info.href
                        ? <a href={info.href} target="_blank" rel="noreferrer"
                            className="text-sm font-semibold text-blue-600 hover:underline break-all leading-tight">
                            {info.value}
                          </a>
                        : <p className="text-sm font-semibold text-gray-800">{info.value}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social row */}
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-3">Find me on</p>
              <div className="flex items-center gap-3">
                {SOCIAL.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noreferrer"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-white/60 bg-white flex items-center justify-center text-gray-500 hover:text-blue-600 hover:shadow-md hover:-translate-y-0.5 transition-all shadow-sm"
                    aria-label={s.label}>
                    <i className={`${s.icon} text-base`} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-5 sm:mb-6 text-base sm:text-lg">Send a message</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <input type="text" placeholder="Your name" value={form.name} onChange={set("name")} className={inputCls} />
                <input type="email" placeholder="Email address" value={form.email} onChange={set("email")} className={inputCls} />
              </div>
              <input type="text" placeholder="Subject" value={form.subject} onChange={set("subject")} className={inputCls} />
              <textarea rows={5} placeholder="Your message..." value={form.message} onChange={set("message")} className={`${inputCls} resize-none`} />
              <button onClick={sendMail}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white inline-flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all"
                style={{ background: "linear-gradient(135deg,#2563eb,#7c3aed)" }}>
                <i className="fa-solid fa-paper-plane text-xs" />
                Send Message
              </button>
              <p className="text-xs text-gray-400 text-center">Opens your email app with the message pre-filled.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
