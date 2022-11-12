import middlebg from "../../assets/home/middlebg.svg";

const Middle = () => {
  return (
    <div className="border-b border-gray-500 py-10 md:py-14 lg:py-20 bg-black text-white">
      <div className="container">
        <h1
          style={{ lineHeight: "130%" }}
          className="text-3xl lg:text-5xl xl:text-6xl font-semibold max-w-[20ch] text-center mx-auto mb-14"
        >
          Make The Right Move <br />
          Social Move
        </h1>
        <div className="grid grid-cols-12 sm:gap-x-10 gap-y-20 sm:gap-y-0">
          <div className="flex items-center justify-center sm:justify-start col-span-12 sm:col-span-5">
            <img src={middlebg} alt="" loading="lazy" />
          </div>
          <div className="flex items-center justify-center text-center sm:text-start col-span-12 sm:col-span-7">
            <div className="flex flex-col items-center justify-center sm:items-start">
              <h4
                style={{ lineHeight: "130%" }}
                className="text-2xl lg:text-4xl xl:text-5xl font-bold max-w-[15ch]"
              >
                A New Gen Social Media Platform
              </h4>
              <p
                style={{ lineHeight: "150%" }}
                className="font-medium max-w-[30ch] text-sm sm:text-md lg:text-lg xl:text-xl mt-3 mb-5"
              >
                Post Images, Videos, Chat, Live, AR VR and much more...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Middle;
