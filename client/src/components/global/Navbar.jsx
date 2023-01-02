import { useLayoutEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bevysquarewhite from "../../assets/bevysquarewhite.png";

const Navbar = () => {
  const navRef = useRef();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    navRef.current && navRef.current.scrollIntoView();
  }, [pathname]);

  return (
    <div ref={navRef} className="bg-black text-white">
      <div className="w-full h-[48px] sm:max-w-[640px] sm:h-[56px] md:max-w-[768px] md:h-[64px] lg:max-w-[1024px] lg:h-[80px] xl:max-w-[1280px] 2xl:max-w-[1400px] mx-auto px-2 flex items-center justify-between gap-5">
        <img
          src={bevysquarewhite}
          alt=""
          className="w-44 sm:w-48 md:w-52 lg:w-56 xl:w-60 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <a
          href="mailto:contact@bevysquare.com"
          target="_blank"
          rel="noreferrer"
          style={{ letterSpacing: ".4px" }}
          className="hidden lg:flex items-center justify-center rounded-md w-44 h-11 text-lg bg-white text-black font-medium uppercase   hover:scale-105 duration-150"
        >
          Contact us
        </a>
      </div>
    </div>
  );
};

export default Navbar;
