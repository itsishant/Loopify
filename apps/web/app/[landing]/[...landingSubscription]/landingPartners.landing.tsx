import Marquee from "react-fast-marquee";

const partners = [
  {
    src: "./apple-tv.png",
    name: "Apple TV",
    className: "bg-neutral-200 rounded-full",
  },
  { src: "./netflix.png", name: "Netflix" },
  { src: "./discord.png", name: "Discord" },
  { src: "./youtube.png", name: "YouTube" },
  { src: "./search.png", name: "Google" },
  { src: "./telegram.png", name: "Telegram" },
  { src: "./social.png", name: "Amazon", className: "rounded-full" },
];

const PartnerChip = ({ partner }: { partner: (typeof partners)[number] }) => (
  <div className="mx-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] py-3 pl-3 pr-6">
    <div className="flex size-10 items-center justify-center rounded-xl bg-white/5">
      <img
        src={partner.src}
        className={`size-7 object-contain ${partner.className ?? ""}`}
        alt={partner.name}
      />
    </div>
    <span className="text-base font-medium text-neutral-300">
      {partner.name}
    </span>
  </div>
);

export const TrustedPartner = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-40">
      <div className="text-center">
        <div className="font-semibold text-5xl tracking-tighter text-white mb-4">
          Trusted Partners
        </div>
        <p className="text-neutral-500 text-lg max-w-xl">
          Trusted partners who collaborate with Loopify to enhance your
          subscription management experience
        </p>
      </div>
      <div className="w-full max-w-6xl mt-14 space-y-4">
        <Marquee
          speed={40}
          autoFill
          gradient
          gradientColor="#000000"
          gradientWidth={200}
        >
          {partners.map((partner) => (
            <PartnerChip key={partner.name} partner={partner} />
          ))}
        </Marquee>
        <Marquee
          speed={40}
          direction="right"
          autoFill
          gradient
          gradientColor="#000000"
          gradientWidth={200}
        >
          {[...partners].reverse().map((partner) => (
            <PartnerChip key={partner.name} partner={partner} />
          ))}
        </Marquee>
      </div>
    </div>
  );
};
