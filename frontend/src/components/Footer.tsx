import React from "react";
import { useLocation } from "react-router-dom";
import youtubeIcon from "../assets/svg/youtube.svg";
import instagramIcon from "../assets/svg/instagram.svg";
import telegramIcon from "../assets/svg/telegram.svg";
import facebookIcon from "../assets/svg/facebook.svg";
import { useLang } from "../context/lang";

export default () => {
  const { t } = useLang();
  return (
    <div className="relative z-10 pb-32">
      <div className="flex justify-center mt-40">
        <img
          className="m-8 invert dark:invert-0 cursor-pointer"
          style={{ width: "5rem" }}
          src={youtubeIcon}
        />
        <img
          className="m-8 invert dark:invert-0 cursor-pointer"
          style={{ width: "5rem" }}
          src={instagramIcon}
        />
        <img
          className="m-8 invert dark:invert-0 cursor-pointer"
          style={{ width: "5rem" }}
          src={telegramIcon}
        />
        <img
          className="m-8 invert dark:invert-0 cursor-pointer"
          style={{ width: "5rem" }}
          src={facebookIcon}
        />
      </div>
      <div className="cursor-pointer my-16 w-full text-center text-5.5xl text-black dark:text-white font-bold tracking-extrawide">
        {t("ОЛРАЙТ")}
      </div>
      <div className="text-center text-2xl text-black dark:text-white cursor-pointer hover:underline mb-4">
        {t("зв`язок")}
      </div>
      <div className="text-center text-2xl text-black dark:text-white cursor-pointer hover:underline mb-4">
        {t("політика конфіденційності")}
      </div>
      <div className="text-center text-2xl text-black dark:text-white cursor-pointer hover:underline mb-4">
        {t("інтелектуальна власність")}
      </div>
      <div className="text-center text-2xl text-black dark:text-white cursor-pointer hover:underline mb-4">
        {t("авторам")}
      </div>
    </div>
  );
};
