import bevysquarewhite from "../../assets/bevysquarewhite.svg";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center gap-4 py-10 bg-black text-white">
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
      <p className="text-gray-300">2022©Bevysquare.com</p>
      <button className="border rounded-md px-5 py-2 text-sm sm:text-md lg:text-lg uppercase">
        Contact Us
      </button>
    </footer>
  );
};

export default Footer;
