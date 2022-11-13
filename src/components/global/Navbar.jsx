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
      className={`sticky top-0 bg-black text-white z-10 ${
        showBorder ? "border-b border-gray-500" : "border-0"
      }`}
    >
      <div className="h-14 sm:h-16 md:h-20 flex items-center justify-between gap-5 sm:max-w-[680px] md:max-w-[808px] lg:max-w-[1064px] xl:max-w-[1320px] 2xl:max-w-[1576px] mx-auto px-2">
        <img
          src={bevysquarewhite}
          alt="bevysquareWhite"
          className="w-44 sm:w-48 md:w-52 lg:w-56 xl:w-60"
        />
        <button className="border rounded-md px-5 py-2 text-sm sm:text-md lg:text-lg bg-white text-black max-h-[48px] font-medium uppercase hidden sm:block">
          Contact us
        </button>
      </div>
    </div>
  );
};

export default Navbar;
