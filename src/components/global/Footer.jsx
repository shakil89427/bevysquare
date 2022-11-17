import bevysquarewhite from "../../assets/bevysquarewhite.png";
import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillMail,
  AiFillYoutube,
  AiFillLinkedin,
} from "react-icons/ai";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" bg-black text-white pt-20">
      <div className="container grid grid-cols-1 lg:grid-cols-3 gap-y-10 lg:gap-y-0 py-8 md:py-10 lg:py-12 xl:py-14 border-b border-gray-600">
        <div className="flex items-center justify-center ">
          <div>
            <img
              src={bevysquarewhite}
              alt=""
              className="w-44 sm:w-48 md:w-44 lg:w-56 xl:w-60 mx-auto"
            />
            <p className="w-fit mx-auto text-gray-200 font-medium text-sm lg:text-lg mt-1 mb-5">
              Social That Pays
            </p>
            <div className="grid grid-cols-3 xl:grid-cols-6 gap-x-2 gap-y-2 w-fit mx-auto text-5xl">
              <AiFillInstagram className="border-2 p-2 rounded-full hover:scale-105 duration-150 cursor-pointer" />
              <AiFillFacebook className="border-2 p-2 rounded-full hover:scale-105 duration-150 cursor-pointer" />
              <AiFillTwitterSquare className="border-2 p-2 rounded-full hover:scale-105 duration-150 cursor-pointer" />
              <AiFillMail className="border-2 p-2 rounded-full hover:scale-105 duration-150 cursor-pointer" />
              <AiFillYoutube className="border-2 p-2 rounded-full hover:scale-105 duration-150 cursor-pointer" />
              <AiFillLinkedin className="border-2 p-2 rounded-full hover:scale-105 duration-150 cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-2 w-fit gap-x-10 gap-y-4 text-gray-400 font-medium md:text-lg lg:text-xl">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <Link to="/" className="hover:text-white">
              Ads
            </Link>
            <Link to="/" className="hover:text-white">
              Privacy
            </Link>
            <Link to="/" className="hover:text-white">
              About
            </Link>
            <Link to="/" className="hover:text-white">
              Terms
            </Link>
            <Link to="/" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="w-fit">
            <p className="font-semibold text-center mb-3">Get the app!</p>
            <button className="bg-white w-44 uppercase text-black font-medium py-2 rounded-full hover:scale-105 duration-150">
              Download
            </button>
          </div>
        </div>
      </div>
      <div className="py-8 md:py-10 lg:py-12 xl:py-14 px-2 flex items-center justify-center gap-1 text-gray-400">
        <p className="text-2xl">©</p>
        <p className="text-center">bevysquare Media Pvt Ltd.</p>
      </div>
    </footer>
  );
};

export default Footer;
