import React from "react"

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "elevated" | "outlined"
  style?: React.CSSProperties
}

export default function Card({
  children,
  className = "",
  variant = "default",
  style,
}: CardProps) {
  const variantStyles = {
    default: "card bg-base-100 shadow-md border border-base-300",
    elevated: "card bg-base-100 shadow-xl",
    outlined: "card bg-base-100 border-2 border-primary",
  }

  return (
    <div className={`${variantStyles[variant]} ${className}`} style={style}>
      <div className="card-body">{children}</div>
    </div>
  )
}