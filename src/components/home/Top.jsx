import topbg from "../../assets/home/topbg.svg";
import topwave from "../../assets/home/topwave.svg";
import bevysquarewhite from "../../assets/bevysquarewhite.svg";

const Top = () => {
  return (
    <div className="py-10 md:py-14 lg:py-20 bg-black text-white relative overflow-hidden">
      <div className="container grid grid-cols-12 sm:gap-x-10 gap-y-20 sm:gap-y-0 relative z-10">
        <div className="flex items-center justify-start md:-translate-y-14 col-span-12 sm:col-span-5">
          <div className="flex items-start gap-3">
            <img src={bevysquarewhite} alt="" className="w-8 lg:w-11 xl:w-14" />
            <div>
              <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold">
                Bevysquare
              </h1>
              <p
                style={{ lineHeight: "150%" }}
                className="font-medium max-w-[35ch] text-sm sm:text-md lg:text-lg xl:text-xl mt-3 mb-5"
              >
                Social media that pays
              </p>
              <button className="border rounded-full px-5 py-2 text-sm sm:text-md lg:text-lg bg-white text-black font-semibold uppercase">
                Contact us
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center md:justify-end col-span-12 sm:col-span-7">
          <img src={topbg} alt="" loading="lazy" />
        </div>
      </div>
      <img src={topwave} alt="" className="w-full absolute -bottom-5" />
    </div>
  );
};

export default Top;
