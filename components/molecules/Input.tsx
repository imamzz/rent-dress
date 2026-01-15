"use client";
import { useState } from "react";
import Eye from "@/components/icons/Eye";
import EyeOff from "@/components/icons/EyeOff";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  showPasswordToggle?: boolean;
  name?: string;
}

export function Input({
  label,
  error,
  showPasswordToggle,
  type = "text",
  className = "",
  name = "",
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = showPasswordToggle
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm mb-2 text-neutral-700">{label}</label>
      )}
      <div className="relative">
        <input
            name={name}
          type={inputType}
          className={`
            w-full px-4 py-3 rounded-lg border
            ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                : "border-neutral-300 focus:border-blue-500 focus:ring-blue-500/20"
            }
            focus:outline-none focus:ring-4
            disabled:bg-neutral-100 disabled:cursor-not-allowed
            transition-all duration-200
            ${className}
          `}
          {...props}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 transition-colors"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        )}
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
