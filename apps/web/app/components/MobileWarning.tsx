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

  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isMobile]);

  if (!isMobile) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black">
      <div className="flex h-[667px] w-[375px] flex-col items-center justify-center rounded-[40px] bg-black px-6 text-center shadow-2xl">
        <h1 className="mb-6 text-2xl font-bold text-white">
          Desktop Required
        </h1>

        <p className="mb-8 text-base text-gray-300">
          Please switch to desktop mode or access this site from a desktop computer.
        </p>

        <a 
          href="/app-release.apk" 
          download="Loopify.apk"
          className="inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
        >
          Download Android App
        </a>
      </div>
    </div>
  );
}
