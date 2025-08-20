import React from "react";

export function Dialog({ open, onOpenChange, children }) {
  return open ? <div>{children}</div> : null;
}
export function DialogContent({ children, className }) {
  return <div className={className}>{children}</div>;
}
export function DialogHeader({ children }) {
  return <div className="mb-2">{children}</div>;
}
export function DialogTitle({ children }) {
  return <h3>{children}</h3>;
}
