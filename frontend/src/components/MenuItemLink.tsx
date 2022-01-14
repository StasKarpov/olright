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
      className={`text-xl cursor-pointer hover:text-blue-700 ${
        isActive ? "text-blue-700" : "text-black"
      } ${className ? className : ""}`}
      onClick={() => navigate(to)}
    >
      {text}
    </div>
  );
};
