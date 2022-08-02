import React from "react";
import Icon from "@mdi/react";
import { useLocation, useNavigate } from "react-router-dom";
import { mdiMenu, mdiClose } from "@mdi/js";
import FadeIn from "react-fade-in";
import youtubeIcon from "../assets/svg/youtube.svg";
import instagramIcon from "../assets/svg/instagram.svg";
import telegramIcon from "../assets/svg/telegram.svg";
import facebookIcon from "../assets/svg/facebook.svg";
import Search from "../pages/Search";
import MenuItemLink from "./MenuItemLink";

export default () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);

  React.useEffect(() => {
    setShowMobileMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div
      className={`relative w-full px-[9rem] md:px-0 ${
        location.pathname == "/"
          ? "border-b sm:border-b-3 border-white border-solid"
          : ""
      }`}
    >
      <div
        className={`z-30 relative container ${
          location.pathname == "/"
            ? "border-r sm:border-r-3 border-solid border-white"
            : ""
        }`}
      >
        <div
          onClick={() => navigate("/")}
          className="relative w-full font-bold text-9xl text-center dark:text-white tracking-widest py-8 md:py-16 cursor-pointer"
        >
          <Search />
          ОЛРАЙТ
        </div>
        <div className="hidden md:flex justify-between pb-14 px-40">
          <MenuItemLink to="/articles" text="НОВЕ" />
          <MenuItemLink to="/special" text="СПЕЦ МАТЕРІАЛИ" />
          <MenuItemLink to="/releases" text="РЕЛІЗИ" />
          <MenuItemLink to="/playlists" text="ПЛЄЙЛІСТИ" />
        </div>
      </div>
      <div
        className="absolute right-[1rem] top-[3rem] cursor-pointer block md:hidden"
        onClick={() => setShowMobileMenu(true)}
      >
        <Icon size={4} className="text-black dark:text-white" path={mdiMenu} />
      </div>
      <div
        className={`absolute z-20 transition-all top-0 right-0 border-l sm:border-l-3 border-solid border-white ${
          showMobileMenu ? " w-[70vw] " : "w-0"
        } bg-black `}
      >
        {showMobileMenu && (
          <FadeIn>
            <div className="text-black flex flex-col text-2xl justify-around items-end w-[70vw] h-[100vh] pr-10">
              <div
                className="cursor-pointer block md:hidden"
                onClick={() => setShowMobileMenu(false)}
              >
                <Icon size={4} color="white" path={mdiClose} />
              </div>
              <MenuItemLink to="/articles" text="НОВЕ" />
              <MenuItemLink to="/special" text="СПЕЦ МАТЕРІАЛИ" />
              <MenuItemLink to="/releases" text="РЕЛІЗИ" />
              <MenuItemLink to="/playlists" text="ПЛЄЙЛІСТИ" />
              <div className="flex justify-center mt-96">
                <img
                  className="m-8 invert-0 cursor-pointer"
                  style={{ width: "5rem" }}
                  src={youtubeIcon}
                />
                <img
                  className="m-8 invert-0 cursor-pointer"
                  style={{ width: "5rem" }}
                  src={instagramIcon}
                />
                <img
                  className="m-8 invert-0 cursor-pointer"
                  style={{ width: "5rem" }}
                  src={telegramIcon}
                />
                <img
                  className="m-8 invert-0 cursor-pointer"
                  style={{ width: "5rem" }}
                  src={facebookIcon}
                />
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
};
