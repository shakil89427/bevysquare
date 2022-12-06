import { useMemo } from "react";
import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillMail,
  AiFillYoutube,
  AiFillLinkedin,
} from "react-icons/ai";

const ContactBar = () => {
  const socials = useMemo(() => {
    return [
      { component: <AiFillInstagram />, url: "https://instagram.com" },
      { component: <AiFillFacebook />, url: "https://facebook.com" },
      { component: <AiFillTwitterSquare />, url: "https://twitter.com" },
      { component: <AiFillMail />, url: "mailto:contact@bevysquare.com" },
      { component: <AiFillYoutube />, url: "https://youtube.com" },
      { component: <AiFillLinkedin />, url: "https://linkedin.com" },
    ];
  }, []);
  return (
    <div className="text-white py-14 bg-[#252525]">
      <h1 className="text-center text-2xl font-bold">Or connect with us on</h1>
      <div className="w-fit mx-auto px-5 mt-10 grid grid-cols-3 sm:grid-cols-6 gap-5 sm:gap-y-0 lg:gap-x-12 xl:gap-x-16">
        {socials.map((social) => (
          <a
            key={social.url}
            href={social.url}
            target="_blank"
            rel="noreferrer"
            className="aspect-square w-20 lg:w-24 xl:w-28  text-5xl lg:text-6xl xl:text-7xl border-2 rounded-full flex items-center justify-center hover:scale-110 duration-150"
          >
            {social.component}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContactBar;
