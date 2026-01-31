"use client";

export const CardLanding = () => {
  return (
    <>
      <style>{`
        @keyframes slideDownInfinite {
          0% {
            opacity: 0.6;
            transform: translateY(-8px);
          }
          50% {
            opacity: 1;
            transform: translateY(8px);
          }
          100% {
            opacity: 0.6;
            transform: translateY(-8px);
          }
        }
        
        .arrow-animate {
          animation: slideDownInfinite 1.8s ease-in-out infinite;
        }
        
        .arrow-1 { animation-delay: 0s; }
        .arrow-2 { animation-delay: 0.4s; }
        .arrow-3 { animation-delay: 0.8s; }
        .arrow-4 { animation-delay: 1.2s; }
      `}</style>
      <div className="flex flex-col justify-center items-center">
        <div className="relative top-88 right-22">
          <div className="relative text-start right-96 top-10">
            <h1 className=" text-slate-700 md:text-4xl lg:text-5xl dark:text-slate-300 text-4xl leading-normal max-w-4xl font-bold tracking-tight ">
              Low EFFORT
            </h1>
          </div>
          <div className="relative text-start right-20 top-10">
            <h1 className="text-slate-700 md:text-4xl lg:text-5xl dark:text-slate-300 text-4xl leading-normal max-w-4xl font-bold tracking-tight">
              HIGH Savings
            </h1>
          </div>
        </div>
        <div className="w-[650px] relative  left-96 h-[620px] rounded-3xl border border-neutral-300 bg-gradient-to-br from-neutral-50 to-neutral-100 p-6 shadow-lg dark:border-neutral-700 dark:bg-gradient-to-br dark:from-neutral-900 dark:to-neutral-950">
          <div className="w-full h-full flex flex-col justify-center items-center gap-5">
            <div className="text-center">
              <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Sign up. That's it.
              </p>
            </div>

            <div className="text-5xl text-blue-500 dark:text-cyan-400 arrow-animate arrow-1">
              ↓
            </div>

            <div className="text-center">
              <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Drop in your subscriptions
              </p>
            </div>

            <div className="text-5xl text-blue-500 dark:text-cyan-400 arrow-animate arrow-2">
              ↓
            </div>

            <div className="text-center">
              <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Set dates once
              </p>
            </div>

            <div className="text-5xl text-blue-500 dark:text-cyan-400 arrow-animate arrow-3">
              ↓
            </div>

            <div className="text-center">
              <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                We track renewals automatically
              </p>
            </div>

            <div className="text-5xl text-blue-500 dark:text-cyan-400 arrow-animate arrow-4">
              ↓
            </div>

            <div className="text-center">
              <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Catch deals before you pay
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
