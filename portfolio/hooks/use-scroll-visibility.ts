"use client"

import { useEffect, useState } from "react"
import { useInView } from "framer-motion"

export function useScrollVisibility(ref: React.RefObject<HTMLElement>) {
  const isInView = useInView(ref, { once: false, margin: "-10% 0px -10% 0px" })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(isInView)
  }, [isInView])

  return isVisible
}
