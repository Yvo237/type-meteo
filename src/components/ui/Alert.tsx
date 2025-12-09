import React from "react"

interface AlertProps {
  type?: "info" | "success" | "warning" | "error"
  children: React.ReactNode
}

export default function Alert({ type = "info", children }: AlertProps) {
  const style = {
    info: "alert-info",
    success: "alert-success",
    warning: "alert-warning",
    error: "alert-error"
  }[type]
  return (
    <div className={`alert ${style} shadow-md my-2`}>
      <span>{children}</span>
    </div>
  )
}
