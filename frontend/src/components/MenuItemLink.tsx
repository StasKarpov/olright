import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface IMenuItemLinkProps {
  to: string;
  text: string;
  className?: string;
}

export default ({ to, text, className }: IMenuItemLinkProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActive = pathname.includes(to);

  return (
    <div
      className={`text-4xl md:text-xl cursor-pointer font-normal hover:text-active-link dark:hover:font-bold tracking-widest md:tracking-normal ${
        isActive
          ? "font-bold md:font-normal text-blue-700 text-active-link md:dark:font-bold"
          : "text-white md:text-black md:dark:text-white"
      } ${className ? className : ""}`}
      onClick={() => navigate(to)}
    >
      {text}
    </div>
  );
};
