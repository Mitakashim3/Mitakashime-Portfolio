"use client"

import { useState, useEffect } from "react"
import { useChromeVersion } from "@/hooks/use-chrome-version"
import { motion, AnimatePresence } from "framer-motion"
import { X, AlertTriangle } from "lucide-react"

export function BrowserNotice() {
  const [isDismissed, setIsDismissed] = useState(false)
  const chrome = useChromeVersion()

  useEffect(() => {
    const dismissed = localStorage.getItem("browser-notice-dismissed")
    if (dismissed) {
      setIsDismissed(true)
    }
  }, [])

  const handleDismiss = () => {
    setIsDismissed(true)
    localStorage.setItem("browser-notice-dismissed", "true")
  }

  // Show notice for Chrome versions older than 100
  const shouldShowNotice = chrome.isChrome && chrome.version !== null && chrome.version < 100 && !isDismissed

  return (
    <AnimatePresence>
      {shouldShowNotice && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[999] max-w-md mx-4"
        >
          <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4 shadow-lg backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-yellow-500 mb-1">
                  Browser Compatibility Notice
                </h3>
                <p className="text-xs text-yellow-100/90">
                  You're using Chrome {chrome.version}. For the best experience, please update to Chrome 100 or later. Some visual effects may be simplified.
                </p>
              </div>
              <button
                onClick={handleDismiss}
                className="text-yellow-500 hover:text-yellow-400 transition-colors flex-shrink-0"
                aria-label="Dismiss notice"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
