// PasswordStrengthMeter.jsx
import React from "react";

function PasswordStrengthMeter({ password }) {
  const getStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[@$!%*?&]/.test(pass)) score++;
    return score;
  };

  const score = getStrength(password);

  const strength = [
    { label: "Weak", color: "bg-red-500" },
    { label: "Fair", color: "bg-orange-500" },
    { label: "Good", color: "bg-yellow-500" },
    { label: "Strong", color: "bg-green-500" },
  ];

  return (
    <div className="mt-2">
      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${strength[score - 1]?.color || "bg-gray-300"}`}
          style={{ width: `${(score / 4) * 100}%` }}
        ></div>
      </div>
      {password && (
        <p className={`text-sm font-semibold mt-1 ${strength[score - 1]?.color || "text-gray-500"}`}>
          {strength[score - 1]?.label || "Too Short"}
        </p>
      )}
    </div>
  );
}

export default PasswordStrengthMeter;
