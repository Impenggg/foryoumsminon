"use client";

import React from "react";

const baseStyles =
  "inline-flex w-full justify-center rounded-full px-4 py-2.5 text-sm md:text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent transition-colors duration-200";

const variants = {
  primary:
    "bg-amber-500 text-amber-50 hover:bg-amber-400 disabled:bg-amber-300 disabled:text-amber-100 disabled:cursor-not-allowed",
  soft:
    "bg-amber-500 text-amber-50 hover:bg-amber-400 disabled:bg-amber-300 disabled:text-amber-100 disabled:cursor-not-allowed",
  ghost:
    "bg-amber-500 text-amber-50 hover:bg-amber-400 disabled:bg-amber-300 disabled:text-amber-100 disabled:cursor-not-allowed",
};

export function Button({
  children,
  variant = "primary",
  type = "button",
  className = "",
  ...props
}) {
  const variantClasses = variants[variant] ?? variants.primary;

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

