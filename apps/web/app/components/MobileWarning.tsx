"use client";

import { useEffect, useState } from "react";

export default function MobileWarning() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isMobileDevice = mobileRegex.test(userAgent);
      
      const isSmallScreen = window.innerWidth < 768;
      
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isMobile) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <div className="mx-4 max-w-md text-center">
        <h1 className="mb-6 text-3xl font-bold text-white">
          Desktop Required
        </h1>

        <p className="mb-8 text-lg text-gray-300">
          Please switch to desktop mode or access this site from a desktop computer.
        </p>

        <a 
          href="/app-release.apk" 
          download="Loopify.apk"
          className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-black transition hover:bg-gray-200"
        >
          Download Android App
        </a>
      </div>
    </div>
  );
}
