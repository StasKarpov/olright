import React from "react";

import { useLocation } from "react-router-dom";
import Gallery from "../components/Gallery";
import ReleasesGallery from "../components/ReleasesGallery";

import Articles from "../pages/Articles";
import { darkModeOn } from "../utils/theme";

export default () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    darkModeOn();
  }, []);

  return (
    <div>
      <Gallery />
      <div className="w-full h-full bg-white py-10">
        <Articles />
      </div>
      <div className="relative">
        <ReleasesGallery />
      </div>
    </div>
  );
};
