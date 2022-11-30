import { useMemo } from "react";
import bannerbg from "../assets/about/bannerbg.png";
import content1 from "../assets/about/content1.png";
import content2 from "../assets/about/content2.png";
import content3 from "../assets/about/content3.png";
import content4 from "../assets/about/content4.png";

const About = () => {
  const contents = useMemo(() => {
    return [content1, content2, content3, content4];
  }, []);

  return (
    <>
      <div className="py-10 md:py-14 lg:py-20 text-white w-full bg-black">
        <div className="container grid grid-cols-12 sm:gap-x-10 gap-y-14 sm:gap-y-0">
          <div className="flex items-center justify-start md:-translate-y-14 col-span-12 sm:col-span-5">
            <div>
              <div
                style={{ lineHeight: "120%" }}
                className="text-2xl lg:text-4xl xl:text-5xl font-semibold w-fit relative"
              >
                <span className="relative z-10">bevysquare</span>
                <span className="absolute bg-gray-600 w-full h-[30%] left-0 bottom-0"></span>
              </div>
              <div
                style={{ lineHeight: "120%" }}
                className="text-2xl lg:text-4xl xl:text-5xl font-semibold mt-5 lg:mt-8 xl:mt-9 max-w-[14ch]"
              >
                <span>A New Gen Social Media Platform that</span>{" "}
                <span className="relative">
                  <span className="relative z-10 whitespace-nowrap">
                    pays you
                  </span>
                  <span className="absolute bg-gray-600 w-full h-[30%] left-0 bottom-0"></span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-end col-span-12 sm:col-span-7">
            <img src={bannerbg} alt="" loading="lazy" />
          </div>
        </div>
      </div>
      <div className="container py-6 sm:py-8 md:py-10 lg:py-12 xl:py-14 2xl:py-16">
        <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold">
          About us
        </p>
        <p className="mt-5 lg:mt-10 sm:text-lg lg:text-xl xl:text-2xl text-[#474747]">
          Instantly Share Your Profile with Anyone by Tapping your Card on their
          Phone. Other Users do not need a Card or an App to connect. Make
          Unlimited Connections. Instantly Share Your Profile with Anyone by
          Tapping your Card on their Phone. Other Users do not need a Card or an
          App to connect. Make Unlimited Connections.
        </p>
        <div className="relative px-2 lg:px-5 my-8 md:my-14 lg:my-20">
          <div className="grid grid-cols-4 aspect-[4/1] relative z-10">
            {contents.map((content, index) => (
              <div
                key={index}
                className={`flex justify-center ${
                  (index + 2) % 2 === 0 ? "items-end" : "items-start"
                }`}
              >
                <img
                  src={content}
                  alt=""
                  loading="lazy"
                  className="h-[90%] w-[95%]"
                />
              </div>
            ))}
          </div>
          <span className="absolute w-[20%] h-[30%] bg-[#D1D1D1] top-0 left-0"></span>
          <span className="absolute w-[20%] h-[30%] bg-[#D1D1D1] bottom-0 right-0"></span>
        </div>
        <p className="sm:text-lg lg:text-xl xl:text-2xl text-[#474747]">
          Instantly Share Your Profile with Anyone by Tapping your Card on their
          Phone. Other Users do not need a Card or an App to connect. Make
          Unlimited Connections. Instantly Share Your Profile with Anyone by
          Tapping your Card on their Phone. Other Users do not need a Card or an
          App to connect. Make Unlimited Connections.
        </p>
        <p className="mt-5 lg:mt-10 sm:text-lg lg:text-xl xl:text-2xl text-[#474747]">
          Instantly Share Your Profile with Anyone by Tapping your Card on their
          Phone. Other Users do not need a Card or an App to connect.
        </p>
      </div>
    </>
  );
};

export default About;
