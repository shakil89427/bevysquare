import middlebg from "../../assets/home/middlebg.png";

const Middle = () => {
  return (
    <div className="relative">
      <div className="homemiddlepolygon" />
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-10 gap-y-12 sm:gap-y-0 container relative z-10 py-12 sm:py-16 md:py-28 lg:py-32 xl:py-36">
        <div className="w-full">
          <img
            src={middlebg}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover object-center rounded-xl sm:rounded-2xl lg:rounded-3xl"
          />
        </div>
        <div className=" linearbg border border-white rounded-2xl lg:rounded-3xl text-white p-5 lg:p-10 xl:p-14 2xl:p-16">
          <h4
            style={{ lineHeight: "130%" }}
            className="text-2xl lg:text-4xl xl:text-5xl font-semibold max-w-[15ch]"
          >
            A New Gen Social Media Platform
          </h4>
          <p
            style={{ lineHeight: "150%" }}
            className="max-w-[35ch] text-md md:text-lg lg:text-xl xl:text-2xl mt-5 mb-7"
          >
            Instantly Share Your Profile with Anyone by Tapping your Card on
            their Phone. Other Users do not need a Card or an App to connect.
            Make Unlimited Connections
          </p>
          <button className="border-2 bg-black w-52 rounded-full py-2 lg:py-3 text-sm md:text-md lg:text-lg font-semibold uppercase hover:bg-white hover:text-black duration-150 mb-3">
            Monetization
          </button>
        </div>
      </div>
    </div>
  );
};

export default Middle;
