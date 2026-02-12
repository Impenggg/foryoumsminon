"use client";

import React from "react";

export function Card({ children, className = "" }) {
  return (
    <section
      className={`fade-in-soft card-letter w-full max-w-xl bg-white/95 px-6 py-8 md:px-10 md:py-10 shadow-sm transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg ${className}`}
    >
      {children}
    </section>
  );
}

