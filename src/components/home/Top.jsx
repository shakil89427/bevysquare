import topbg from "../../assets/home/topbg.svg";
import topwave from "../../assets/home/topwave.svg";
import bevysquarewhite from "../../assets/bevysquarewhite.svg";

const Top = () => {
  return (
    <div className="py-10 md:py-14 lg:py-20 text-white w-full bg-black hometoppolygon">
      <div className="container grid grid-cols-12 sm:gap-x-10 gap-y-20 sm:gap-y-0">
        <div className="flex items-center justify-start md:-translate-y-14 col-span-12 sm:col-span-5">
          <div className="flex items-start gap-3">
            <img src={bevysquarewhite} alt="" className="w-8 lg:w-11 xl:w-14" />
            <div>
              <h1 className="text-3xl lg:text-5xl xl:text-6xl font-semibold">
                bevysquare
              </h1>
              <p
                style={{ lineHeight: "150%" }}
                className="font-medium max-w-[35ch] sm:text-lg lg:text-xl xl:text-2xl mt-4 mb-6"
              >
                Social media that pays
              </p>
              <button className="rounded-full w-44 h-12 text-lg bg-white font-semibold text-black uppercase hidden lg:block hover:scale-105 duration-150">
                Download
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center md:justify-end col-span-12 sm:col-span-7">
          <img src={topbg} alt="" loading="lazy" />
        </div>
      </div>
    </div>
  );
};

export default Top;
