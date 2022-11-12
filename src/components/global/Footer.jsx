import bevysquarewhite from "../../assets/bevysquarewhite.svg";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center gap-4 py-10 bg-black text-white">
      <img src={bevysquarewhite} alt="" />
      <p className="text-gray-300">2022©Bevysquare.com</p>
      <button className="border rounded-md px-5 py-2 text-sm sm:text-md lg:text-lg uppercase">
        Contact Us
      </button>
    </footer>
  );
};

export default Footer;
