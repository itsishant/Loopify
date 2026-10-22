import Link from "next/link";
import {
  TbArrowRight,
  TbCalendarRepeat,
  TbCirclePlus,
  TbDiscount,
  TbRefresh,
  TbUserPlus,
} from "react-icons/tb";

export const LandingSteps = () => {
  const steps = [
    {
      number: 1,
      title: "Sign Up",
      description: "Create your account and get started in minutes",
      icon: TbUserPlus,
    },
    {
      number: 2,
      title: "Auto-Fetch Subscription",
      description:
        "We automatically retrieve your current OTT subscription details",
      icon: TbRefresh,
    },
    {
      number: 3,
      title: "Add More Coverage",
      description: "Easily add additional subscriptions if needed",
      icon: TbCirclePlus,
    },
    {
      number: 4,
      title: "View Offers",
      description: "Explore personalized offers and discounts available to you",
      icon: TbDiscount,
    },
    {
      number: 5,
      title: "Manage Renewals",
      description: "Track upcoming renewals and manage them effortlessly",
      icon: TbCalendarRepeat,
    },
  ];

  return (
    <section className="mx-auto mt-40 w-full max-w-6xl px-6">
      <div className="text-center">
        <h2 className="text-5xl font-semibold tracking-tighter text-white">
          How it Works
        </h2>
        <p className="mt-4 text-lg text-neutral-500">
          Step by step guide to managing your subscriptions with Loopify
        </p>
      </div>

      <div className="relative mt-20 grid grid-cols-5 gap-6">
        <div className="pointer-events-none absolute left-[10%] right-[10%] top-7 h-px overflow-hidden bg-linear-to-r from-white/5 via-white/20 to-white/5">
          <div className="step-beam absolute inset-y-0 w-24 bg-linear-to-r from-transparent via-white to-transparent" />
        </div>

        {steps.map((step) => (
          <div
            key={step.number}
            className="group relative flex flex-col items-center text-center"
          >
            <div className="relative flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-neutral-950 text-neutral-400 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-white/30 group-hover:text-white group-hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.25)]">
              <step.icon className="size-6" />
            </div>
            <p className="mt-6 text-xs font-medium uppercase tracking-widest text-neutral-600">
              Step {String(step.number).padStart(2, "0")}
            </p>
            <h3 className="mt-2 text-base font-semibold text-white">
              {step.title}
            </h3>
            <p className="mt-2 max-w-52 text-sm leading-relaxed text-neutral-500">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      <div className="relative mt-28 overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 px-12 py-14">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />
        <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-white/[0.06] blur-3xl" />
        <div className="relative flex items-center justify-between gap-10">
          <div>
            <h3 className="text-3xl font-semibold tracking-tight text-white">
              Ready to take control of your subscriptions?
            </h3>
            <p className="mt-2 text-neutral-500">
              Set up Loopify in minutes and never miss a renewal again.
            </p>
          </div>
          <Link
            href="/signup"
            className="group flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3.5 font-medium text-black transition-colors hover:bg-neutral-200"
          >
            Get Started
            <TbArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};
