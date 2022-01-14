import React from "react";
import { useNavigate } from "react-router-dom";
import { toAbsoluteUrl, toAbsoluteSrc } from "../utils";

type CardRatio = "full" | "third";

export default ({
  link,
  ratio,
  title,
  subtitle,
  imageSrc,
  textClassName,
}: {
  ratio: CardRatio;
  title: string;
  imageSrc: string;
  textClassName?: string;
  subtitle?: string;
  link?: string;
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={link ? () => navigate(link) : undefined}
      className={`w-full ${
        ratio == "full" ? "pt-full" : "pt-third"
      } relative bg-cover bg-center bg-no-repeat ${
        link ? "cursor-pointer" : ""
      }`}
      style={{
        backgroundImage: toAbsoluteUrl(imageSrc),
      }}
    >
      <div
        className="w-full h-full absolute top-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)",
        }}
      ></div>
      <div
        className={`absolute bottom-1 left-1 text-white text-4xl font-extrabold ml-4 mb-2 leading-12 ${
          textClassName ? textClassName : ""
        }`}
      >
        <div>{title}</div>
        <div>{subtitle}</div>
      </div>
    </div>
  );
};
