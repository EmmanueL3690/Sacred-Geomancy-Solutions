import React from "react";

export default function Input({ label, type = "text", placeholder, value, onChange }) {
  return (
    <div className="flex flex-col">
      {label && <label className="mb-2 font-semibold text-gray-700">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition duration-200"
      />
    </div>
  );
}
