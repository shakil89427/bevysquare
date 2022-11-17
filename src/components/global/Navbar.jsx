import { useState, useEffect, useCallback } from "react";
import bevysquarewhite from "../../assets/bevysquarewhite.svg";

const Navbar = () => {
  const [showBorder, setShowBorder] = useState(window.scrollY > 5);

  const getScroll = useCallback(() => {
    setShowBorder(window.scrollY > 5);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", getScroll);
    return () => {
      window.removeEventListener("scroll", getScroll);
    };
  }, []);

  return (
    <div
      className={`sticky top-0 bg-black text-white z-20 ${
        showBorder ? "border-b border-gray-500" : "border-0"
      }`}
    >
      <div className="h-14 sm:h-16 md:h-20 flex items-center justify-between gap-5 navcontainer">
        <div className="flex items-center gap-x-3">
          <img
            src={bevysquarewhite}
            alt="bevysquareWhite"
            className="w-6 sm:w-8 lg:w-10"
          />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Bevysquare
          </h1>
        </div>
        <button className="border rounded-lg px-5 py-2 text-sm sm:text-md lg:text-lg bg-white text-black max-h-[48px] font-semibold uppercase hidden sm:block">
          Contact us
        </button>
      </div>
    </div>
  );
};

export default Navbar;
