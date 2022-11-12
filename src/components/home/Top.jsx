import topbg from "../../assets/home/topbg.svg";

const Top = () => {
  return (
    <div className="border-b border-gray-500 py-10 md:py-14 lg:py-20 bg-black text-white">
      <div className="container grid grid-cols-12 sm:gap-x-10 gap-y-20 sm:gap-y-0">
        <div className="flex flex-col items-start justify-center md:-translate-y-14 col-span-12 sm:col-span-7">
          <h1
            style={{ lineHeight: "130%" }}
            className="text-3xl lg:text-5xl xl:text-6xl font-bold max-w-[20ch]"
          >
            Experience Yourself a Branded Social Life
          </h1>
          <p
            style={{ lineHeight: "150%" }}
            className="font-medium max-w-[35ch] text-sm sm:text-md lg:text-lg xl:text-xl mt-3 mb-5"
          >
            A new gen social media that gives branded feel to every users
          </p>
          <button className="border rounded-md px-5 py-2 text-sm sm:text-md lg:text-lg uppercase">
            Contact Us
          </button>
        </div>
        <div className="flex items-center justify-center md:justify-end col-span-12 sm:col-span-5">
          <img src={topbg} alt="" loading="lazy" />
        </div>
      </div>
    </div>
  );
};

export default Top;
