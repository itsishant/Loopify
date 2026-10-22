type LogoProps = {
  className?: string;
  withText?: boolean;
  textClassName?: string;
};

export const LogoMark = ({ className = "size-9" }: { className?: string }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <rect width="64" height="64" rx="16" fill="#0A0A0A" />
    <rect
      x="0.75"
      y="0.75"
      width="62.5"
      height="62.5"
      rx="15.25"
      stroke="#FFFFFF"
      strokeOpacity="0.14"
      strokeWidth="1.5"
    />
    <path
      d="M47.94 30.61A16 16 0 1 1 33.39 16.06"
      stroke="#FFFFFF"
      strokeWidth="6.5"
      strokeLinecap="round"
    />
    <circle cx="43.31" cy="20.69" r="4.25" fill="#FFFFFF" />
  </svg>
);

export const Logo = ({
  className = "size-9",
  withText = true,
  textClassName = "text-xl",
}: LogoProps) => (
  <span className="inline-flex items-center gap-2.5" aria-label="Loopify">
    <LogoMark className={className} />
    {withText && (
      <span
        className={`font-semibold tracking-tight text-white ${textClassName}`}
      >
        Loopify
      </span>
    )}
  </span>
);
