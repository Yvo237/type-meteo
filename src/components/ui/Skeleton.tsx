import React from "react"

interface SkeletonProps {
  className?: string
}

export default function Skeleton({ className = "" }: SkeletonProps) {
  return <div className={`animate-pulse rounded-lg bg-base-300/60 ${className}`} />
}

