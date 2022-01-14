import React from "react";
import { useLocation } from "react-router-dom";

import MenuItemLink from "./MenuItemLink";

export default () => {
  return (
    <div className="container">
      <div className="w-full font-bold text-8xl text-center">ОЛРАЙТ</div>
      <div className="flex justify-around">
        <MenuItemLink to="/articles" text="НОВЕ" />
        <MenuItemLink to="/special" text="СПЕЦ МАТЕРІАЛИ" />
        <MenuItemLink to="/releases" text="РЕЛІЗИ" />
        <MenuItemLink to="/playlists" text="ПЛЄЙЛІСТИ" />
      </div>
    </div>
  );
};
