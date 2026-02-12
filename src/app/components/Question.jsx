"use client";

import React from "react";

export function Question({ title, body, children }) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h1 className="font-sans text-2xl md:text-3xl font-medium leading-relaxed tracking-tight text-balance">
          {title}
        </h1>
        {body ? (
          <p className="text-sm md:text-base text-slate-600 leading-relaxed">
            {body}
          </p>
        ) : null}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

