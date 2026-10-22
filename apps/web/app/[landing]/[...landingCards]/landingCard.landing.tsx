"use client";

import { TbBell } from "react-icons/tb";
import { LogoMark } from "../../components/Logo";

const services = [
  {
    name: "Apple TV+",
    logo: "./apple-tv.png",
    renews: "Renews Oct 28",
    price: "$9.99",
    logoClass: "bg-neutral-200 rounded-full",
  },
  {
    name: "Netflix",
    logo: "./netflix.png",
    renews: "Renews Nov 2",
    price: "$15.49",
  },
  {
    name: "YouTube Premium",
    logo: "./youtube.png",
    renews: "Renews Nov 9",
    price: "$13.99",
  },
  {
    name: "Discord Nitro",
    logo: "./discord.png",
    renews: "Renews Nov 14",
    price: "$9.99",
  },
];

const upcoming = [
  {
    name: "Apple TV+",
    logo: "./apple-tv.png",
    due: "in 6 days",
    logoClass: "bg-neutral-200 rounded-full",
  },
  { name: "Netflix", logo: "./netflix.png", due: "in 11 days" },
];

// Geometry of the connector SVG: 4 rows of 72px with 16px gaps.
const ROW_HEIGHT = 72;
const ROW_GAP = 16;
const FLOW_WIDTH = 240;
const FLOW_HEIGHT =
  services.length * ROW_HEIGHT + (services.length - 1) * ROW_GAP;
const HUB_Y = FLOW_HEIGHT / 2;
const HUB_HALF = 32;

const inputPaths = services.map((_, i) => {
  const y = i * (ROW_HEIGHT + ROW_GAP) + ROW_HEIGHT / 2;
  return `M0 ${y} C 70 ${y}, 50 ${HUB_Y}, ${FLOW_WIDTH / 2 - HUB_HALF} ${HUB_Y}`;
});
const outputPath = `M${FLOW_WIDTH / 2 + HUB_HALF} ${HUB_Y} L${FLOW_WIDTH} ${HUB_Y}`;

export const CardLanding = () => {
  return (
    <section className="mx-auto w-full max-w-6xl px-6">
      <div className="mb-14 text-center">
        <p className="text-sm font-medium text-neutral-500">Explore</p>
        <h2 className="mt-3 text-5xl font-semibold tracking-tighter text-white">
          All your subscriptions, one loop
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-500">
          Add the services you pay for and Loopify keeps track of every renewal,
          so nothing slips through.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 p-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.04] blur-3xl" />

        <div className="relative grid grid-cols-[300px_240px_1fr] items-center">
          <div className="flex flex-col gap-4">
            {services.map((service) => (
              <div
                key={service.name}
                className="flex h-[72px] items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 transition-colors hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/5">
                  <img
                    src={service.logo}
                    alt={service.name}
                    className={`size-7 object-contain ${service.logoClass ?? ""}`}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">
                    {service.name}
                  </p>
                  <p className="text-xs text-neutral-500">{service.renews}</p>
                </div>
                <p className="text-sm font-medium tabular-nums text-neutral-300">
                  {service.price}
                  <span className="text-neutral-600">/mo</span>
                </p>
              </div>
            ))}
          </div>

          <div
            className="relative"
            style={{ width: FLOW_WIDTH, height: FLOW_HEIGHT }}
          >
            <svg
              width={FLOW_WIDTH}
              height={FLOW_HEIGHT}
              viewBox={`0 0 ${FLOW_WIDTH} ${FLOW_HEIGHT}`}
              fill="none"
              className="absolute inset-0"
              aria-hidden="true"
            >
              {inputPaths.map((d, i) => (
                <g key={d}>
                  <path
                    d={d}
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="1.5"
                  />
                  <circle r="2.5" fill="#fff">
                    <animateMotion
                      dur="2.4s"
                      begin={`${i * 0.6}s`}
                      repeatCount="indefinite"
                      path={d}
                    />
                  </circle>
                </g>
              ))}
              <path
                d={outputPath}
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1.5"
              />
              <circle r="2.5" fill="#fff">
                <animateMotion
                  dur="1.2s"
                  repeatCount="indefinite"
                  path={outputPath}
                />
              </circle>
            </svg>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="absolute inset-0 rounded-2xl bg-white/20 blur-xl" />
              <div className="loop-ring absolute -inset-3 rounded-[22px] border border-white/20" />
              <LogoMark className="relative size-16" />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-neutral-500">
                  Monthly spend
                </p>
                <p className="mt-2 text-4xl font-semibold tracking-tight tabular-nums text-white">
                  $49.46
                </p>
                <p className="mt-1 text-sm text-neutral-500">
                  {services.length} active subscriptions
                </p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-300">
                This month
              </span>
            </div>

            <div className="my-5 h-px bg-white/10" />

            <p className="text-xs font-medium uppercase tracking-widest text-neutral-500">
              Upcoming renewals
            </p>
            <div className="mt-3 space-y-2">
              {upcoming.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-3 rounded-xl bg-white/[0.03] px-3 py-2.5"
                >
                  <img
                    src={item.logo}
                    alt={item.name}
                    className={`size-6 object-contain ${item.logoClass ?? ""}`}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-white">{item.name}</p>
                    <p className="text-xs text-neutral-500">{item.due}</p>
                  </div>
                  <span className="flex items-center gap-1 rounded-full border border-white/10 px-2.5 py-1 text-xs text-neutral-300">
                    <TbBell className="size-3.5" />
                    Reminder set
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-5 flex items-center gap-2 text-xs text-neutral-500">
              <TbBell className="size-3.5" />
              Reminders 1, 3, 7, 14 &amp; 30 days before billing
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
