"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  children: ReactNode;
}

const variantStyles = {
  primary:
    "bg-indigo-500 hover:bg-indigo-600 text-white shadow-md hover:shadow-lg active:bg-indigo-700",
  secondary:
    "bg-purple-500 hover:bg-purple-600 text-white shadow-md hover:shadow-lg active:bg-purple-700",
  success:
    "bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg active:bg-green-700",
  danger:
    "bg-red-400 hover:bg-red-500 text-white shadow-md hover:shadow-lg active:bg-red-600",
  ghost:
    "bg-transparent hover:bg-gray-100 text-gray-700 active:bg-gray-200",
};

const sizeStyles = {
  sm: "h-10 px-4 text-sm min-w-[44px]",
  md: "h-12 px-6 text-base min-w-[56px]",
  lg: "h-14 px-8 text-lg min-w-[56px]",
};

export default function Button({
  variant = "primary",
  size = "md",
  icon,
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 rounded-2xl
        font-bold transition-all duration-150 select-none
        focus:outline-none focus:ring-4 focus:ring-indigo-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
