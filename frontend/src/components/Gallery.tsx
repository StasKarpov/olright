import React from "react";
import Icon from "@mdi/react";
import { mdiChevronRight } from "@mdi/js";
import { useNavigate } from "react-router-dom";

import Query from "./Query";
import { GALLERY } from "../queries/gallery";
import { Query as QueryType, ArticleEntity } from "../types";
import { bgImageStyle, toAbsoluteSrc } from "../utils";
import Image from "./Image";
import { darkModeOn } from "../utils/theme";

const Fade = require("react-fade-opacity");

export default () => {
  return (
    <Query darkLoader loaderClassName="h-[100vh]" query={GALLERY}>
      {({ data: { gallery } }: { data: QueryType }) =>
        gallery?.data?.attributes?.articles ? (
          <Carousel articles={gallery?.data?.attributes?.articles?.data} />
        ) : null
      }
    </Query>
  );
};

const Carousel = ({ articles }: { articles: Array<ArticleEntity> }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);

  const currentArticle = articles[currentIndex % articles.length];
  const nextArticle = articles[(currentIndex + 1) % articles.length];

  return (
    <div>
      <div className="flex items-center w-full border-b sm:border-b-3 md:border-b-6 border-white border-solid">
        <div
          className="group cursor-pointer relative w-gallery h-[70rem] md:h-[48rem]  border-r sm:border-r-3 md:border-r-6  border-white border-solid  bg-cover bg-no-repeat bg-center"
          // style={bgImageStyle(
          //   currentArticle?.attributes?.Image?.data?.attributes?.url
          // )}
          onClick={() => navigate(`articles/${currentArticle.id}`)}
        >
          <div className={`w-full h-full overflow-hidden flex bg-gray-300`}>
            <Image
              src={toAbsoluteSrc(
                currentArticle?.attributes?.Image?.data?.attributes?.url
              )}
              className="object-cover w-full"
            />
          </div>
          <div
            className="w-full h-[70rem] md:h-[48rem] absolute top-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)",
            }}
          ></div>
          <div className="absolute bottom-1 text-right md:text-left right-1 md:left-1 text-white font-extrabold mx-4 my-2 leading-20 text-8xl group-hover:mx-6 group-hover:my-4">
            <div>{currentArticle?.attributes?.Title}</div>
            <div>{currentArticle?.attributes?.Subtitle}</div>
          </div>
        </div>
        <div className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 border-2 sm:border-3 md:border-6 border-white border-solid absolute right-[2rem] sm:right-[3rem] md:right-[5rem] xl:right-[7rem] bg-black mb-[28rem] sm:mb-[20rem] md:mb-0">
          <div className="h-full w-full overflow-hidden flex bg-gray-300">
            {" "}
            <Image
              src={toAbsoluteSrc(
                nextArticle.attributes?.Image?.data?.attributes?.url
              )}
              className="object-cover w-full"
            />
          </div>
        </div>
        <div className="w-28 h-24 sm:w-32 sm:h-28 md:w-36 md:h-36 absolute right-[22rem] sm:right-[25rem] md:right-[32rem] xl:right-[36rem] mb-[28rem] sm:mb-[20rem] md:mb-0">
          <div
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            className="border sm:border-3 md:border-6 border-white border-solid text-white cursor-pointer hover:bg-white hover:text-black h-full flex justify-center items-center"
          >
            {" "}
            <Icon
              style={{ strokeWidth: "1rem" }}
              size={4}
              path={mdiChevronRight}
            />
          </div>
          <div className="mt-8 flex w-full justify-between">
            {articles.map((_, index: number) => (
              <div
                key={index}
                className="bg-white flex items-center justify-center w-4 h-4"
              >
                {index == currentIndex % articles.length && (
                  <div className="rounded-full bg-black w-2 h-2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-14 flex">
        <div className="w-gallery border-r sm:border-r-3 md:border-r-6  border-white border-solid"></div>
      </div>
    </div>
  );
};
