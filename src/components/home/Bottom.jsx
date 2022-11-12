import bottombg from "../../assets/home/bottombg.svg";

const Bottom = () => {
  return (
    <div className="border-b border-gray-500 py-10 md:py-14 lg:py-20 bg-black text-white">
      <div className="container grid grid-cols-12 sm:gap-x-10 gap-y-20 sm:gap-y-0">
        <div className="flex flex-col items-center sm:items-start justify-center col-span-12 sm:col-span-7 text-center sm:text-start">
          <h1
            style={{ lineHeight: "130%" }}
            className="text-2xl lg:text-4xl xl:text-5xl font-bold max-w-[15ch]"
          >
            Connect directly with Sorrundings
          </h1>
          <p
            style={{ lineHeight: "150%" }}
            className="font-medium max-w-[30ch] text-sm sm:text-md lg:text-lg xl:text-xl mt-3 mb-5"
          >
            Update yourself with viral new trends and with your community
          </p>
        </div>
        <div className="flex items-center justify-center sm:justify-end col-span-12 sm:col-span-5">
          <img src={bottombg} alt="" loading="lazy" />
        </div>
      </div>
    </div>
  );
};

export default Bottom;
