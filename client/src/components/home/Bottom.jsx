import bottombg from "../../assets/home/bottombg.png";
import bottomelipsis from "../../assets/home/bottomelipsis.png";

const Bottom = () => {
  return (
    <div className="relative">
      <div className="bg-black absolute w-1/4 h-full max-h-[390px] sm:max-h-full top-0 left-0" />
      <div className="bg-black absolute w-1/2 sm:w-2/6 h-1/2 max-h-[250px] lg:max-h-full bottom-0 right-0" />
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-10 gap-y-32 sm:gap-y-0 container relative z-10 py-12 sm:py-16 md:py-28 lg:py-32 xl:py-36">
        <div>
          <div className=" linearbg border border-white rounded-2xl lg:rounded-3xl text-white p-5 lg:p-10">
            <h4
              style={{ lineHeight: "130%" }}
              className="text-2xl lg:text-4xl xl:text-5xl font-semibold max-w-[15ch]"
            >
              A New Gen Social Media Platform
            </h4>
            <p
              style={{ lineHeight: "150%" }}
              className=" max-w-[35ch] text-md md:text-lg lg:text-xl xl:text-2xl mt-5 mb-7"
            >
              Instantly Share Your Profile with Anyone by Tapping your Card on
              their Phone. Other Users do not need a Card or an App to connect.
              Make Unlimited Connections.
            </p>
            <button className="border-2 w-52 bg-black rounded-full py-2 lg:py-3 text-sm md:text-md lg:text-lg font-semibold uppercase hover:bg-white hover:text-black duration-150 mb-3">
              Connect
            </button>
          </div>
        </div>
        <div className="relative w-full">
          <div className="absolute w-[40%] h-[35%] bg-black -top-[8%] -left-[8px] sm:-left-[8%] -z-10  rounded-[80px] rounded-tl" />
          <img
            src={bottomelipsis}
            alt=""
            className="w-[15%] absolute -top-5 right-5 -translate-y-full sm:left-1/2 sm:-translate-x-1/2"
          />
          <img
            src={bottombg}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover object-center rounded-xl sm:rounded-2xl lg:rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Bottom;
