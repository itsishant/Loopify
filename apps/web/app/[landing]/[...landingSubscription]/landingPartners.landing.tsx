import Marquee from "react-fast-marquee";

export const TrustedPartner = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-26">
      <div className="text-center mt-16">
        <div className="font-poppins font-semibold text-6xl tracking-tight text-neutral-300 mb-4">
          Trusted Partners
        </div>
        <p className="text-neutral-500 text-lg">
          Trusted partners who collaborate with Loopify to enhance your
          subscription management experience
        </p>
      </div>
      <Marquee direction="left" speed={50}>
        <div className="flex mt-32 justify-center space-x-38 items-center">
          <div>
            {" "}
            <img
              src="./apple-tv.png"
              className="bg-neutral-200 size-18 rounded-full"
              alt=""
            />
          </div>
          <div>
            <img src="./netflix.png" className="size-18" alt="" />
          </div>
          <div>
            <img src="./discord.png" className="size-18 " alt="" />
          </div>
          <div>
            <img src="./youtube.png" className="size-18" alt="" />
          </div>
          <div>
            <img src="./search.png" className="size-18" alt="" />
          </div>
          <div>
            <img src="./telegram.png" className="size-18" alt="" />
          </div>
          <div>
            <img src="./social.png" className="size-18 rounded-full" alt="" />
          </div>
        </div>
      </Marquee>
    </div>
  );
};
