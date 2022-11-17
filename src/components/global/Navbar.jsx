import { useState, useEffect, useCallback } from "react";
import bevysquarewhite from "../../assets/bevysquarewhite.png";

const Navbar = () => {
  return (
    <div className="bg-black text-white">
      <div className="h-12 sm:h-14 md:h-16 lg:h-20 flex items-center justify-between gap-5 navcontainer">
        <img
          src={bevysquarewhite}
          alt=""
          className="w-44 sm:w-48 md:w-52 lg:w-56 xl:w-60"
        />
        <button
          style={{ letterSpacing: ".5px" }}
          className="rounded-md w-44 h-11 text-lg bg-white text-black font-medium uppercase hidden lg:block hover:scale-105 duration-150"
        >
          Contact us
        </button>
      </div>
    </div>
  );
};

export default Navbar;
