"use client";

export const CardLanding = () => {
  return (
    <>
      <style>{`
      @keyframes dashFlow {
  from { stroke-dashoffset: 0; }
  to { stroke-dashoffset: -1000; }
}

.flow {
  stroke-dasharray: 60 60;
  animation: dashFlow 5s linear infinite;
}

      `}</style>
      <div className="flex justify-center items-center">
        <div className="min-w-7xl relative h-[620px] rounded-3xl border border-neutral-300 bg-gradient-to-br from-neutral-50 to-neutral-100 p-6 shadow-lg dark:border-neutral-700 dark:bg-gradient-to-br dark:from-neutral-900 dark:to-neutral-950">
          <div className="relative w-full h-full flex items-center justify-start pl-8">
            <div className="flex flex-col gap-12 justify-center z-10">
              <div className="flex items-center">
                <img
                  src="./apple-tv.png"
                  className="bg-neutral-200 border-black size-28 rounded-full"
                  alt="Apple TV"
                />
              </div>
              <div className="flex items-center">
                <img src="./netflix.png" className="size-24" alt="Netflix" />
              </div>
              <div className="flex items-center">
                <img src="./youtube.png" className="size-24" alt="YouTube" />
              </div>
              <div className="flex items-center">
                <img src="./discord.png" className="size-24" alt="Discord" />
              </div>
            </div>

            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ overflow: "visible" }}
            >
              <defs>
                <marker
                  id="arrowhead-neutral"
                  markerWidth="10"
                  markerHeight="10"
                  refX="9"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3, 0 6" fill="#9ca3af" />
                </marker>
              </defs>
              <path
                d="M 170 60 L 600 60 L 900 180"
                stroke="#9ca3af"
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrowhead-neutral)"
                className="flow"
              />

              <path
                d="M 150 200 L 800 220"
                stroke="#9ca3af"
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrowhead-neutral)"
                className="flow"
                style={{ animationDelay: "0.3s" }}
              />

              <path
                d="M 150 357 L 800 340"
                stroke="#9ca3af"
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrowhead-neutral)"
                className="flow"
                style={{ animationDelay: "0.6s" }}
              />

              <path
                d="M 150 510 L 150 510 L 600 540 L 900 360"
                stroke="#9ca3af"
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrowhead-neutral)"
                className="flow"
                style={{ animationDelay: "0.9s" }}
              />
            </svg>

            <div className="absolute right-16 top-1/2 transform -translate-y-1/2 z-20">
              <h1 className="text-slate-700 md:text-6xl lg:text-7xl dark:text-slate-300 text-6xl leading-tight font-bold tracking-tight whitespace-nowrap">
                Loopify
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
