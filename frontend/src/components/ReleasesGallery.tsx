import React from "react";
import Icon from "@mdi/react";
import { mdiChevronRight, mdiChevronLeft } from "@mdi/js";

import Query from "./Query";
import { RELEASES_GALLERY } from "../queries/releases";
import { Query as QueryType, ReleaseEntity } from "../types";
import { Release } from "../pages/Releases";
import { useLang } from "../context/lang";
import FadeIn from "react-fade-in";

const Fade = require("react-fade-opacity");

export default () => {
  return (
    <Query darkLoader query={RELEASES_GALLERY}>
      {({ data: { releasesGallery } }: { data: QueryType }) =>
        releasesGallery?.data?.attributes?.releases ? (
          <FadeIn>
            <Carousel
              releases={releasesGallery?.data?.attributes?.releases?.data}
            />{" "}
          </FadeIn>
        ) : null
      }
    </Query>
  );
};

const Carousel = ({ releases }: { releases: Array<ReleaseEntity> }) => {
  const { t } = useLang();

  const [currentIndex, setCurrentIndex] = React.useState<number>(0);

  const firstRelease = releases[currentIndex % releases.length];
  const secondRelease = releases[(currentIndex + 1) % releases.length];
  const thirdRelease = releases[(currentIndex + 2) % releases.length];

  return (
    <div>
      <div className="sm:container mx-4 sm:mx-auto flex justify-between items-center my-40">
        <div
          onClick={() => setCurrentIndex((prev) => prev - 1)}
          className="w-32 h-32 border md:border-3 border-white border-solid text-white cursor-pointer hover:bg-white hover:text-black"
        >
          {" "}
          <Icon size={5} path={mdiChevronLeft} />
        </div>
        <div className="w-[30%] md:w-[20%]">
          <Release release={firstRelease} />
        </div>
        <div className="w-[30%] md:w-[20%]">
          <Release release={secondRelease} />
        </div>
        <div className="hidden md:block w-[20%]">
          <Release release={thirdRelease} />
        </div>
        <div
          onClick={() => setCurrentIndex((prev) => prev + 1)}
          className="w-32 h-32 border md:border-3 border-white border-solid text-white cursor-pointer hover:bg-white hover:text-black"
        >
          {" "}
          <Icon size={5} path={mdiChevronRight} />
        </div>
      </div>
      <div className="mt-8 flex w-full justify-center">
        {releases.map((_, index: number) => (
          <div
            key={index}
            className="bg-white flex items-center justify-center w-4 h-4 m-2"
          >
            {index == currentIndex % releases.length && (
              <div className="rounded-full bg-black w-2 h-2"></div>
            )}
          </div>
        ))}
      </div>
      <div className="absolute left-[50%] w-[50vw]">
        <hr className="mt-[7rem] md:mt-32 relative left-[-100%] border md:border-t-3 md:border-r-2 border-solid border-white w-[100vw]"></hr>
      </div>
      <div className="mt-24 w-full text-right text-12xl md:text-20xl text-white font-thin">
        <span className="relative before:content-['|'] before:absolute before:left-0 before:top-[-3.3rem] md:before:top-[-5.3rem]">
          {t("РЕЛІЗИ")}
        </span>
      </div>
    </div>
  );
};
