import { useEffect, useState } from "react"

const MOBILE_WIDTH_THRESHOLD = 768 // Example threshold for mobile devices (adjust as needed)

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkDeviceSize = () => {
      setIsMobile(window.innerWidth < MOBILE_WIDTH_THRESHOLD)
    }

    // Check on initial mount
    checkDeviceSize()

    // Add resize listener
    window.addEventListener("resize", checkDeviceSize)

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("resize", checkDeviceSize)
    }
  }, []) // Empty dependency array ensures this runs only on mount and unmount

  return isMobile
} 