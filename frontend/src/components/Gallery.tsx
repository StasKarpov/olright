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
      <div
        className={`w-main-image md:h-[53.5rem] overflow-hidden bg-gray-300 absolute `}
      >
        <Image
          src={toAbsoluteSrc(
            currentArticle?.attributes?.Image?.data?.attributes?.url
          )}
          className="object-cover w-full h-full object-top"
        />
      </div>
      <div className="flex items-center w-full ">
        <div
          className="group cursor-pointer relative w-gallery h-[70rem] md:h-[50rem]  border-r md:border-r-3 border-white border-solid  bg-cover bg-no-repeat bg-center"
          // style={bgImageStyle(
          //   currentArticle?.attributes?.Image?.data?.attributes?.url
          // )}
          onClick={() => navigate(`articles/${currentArticle.id}`)}
        >
          {/* <div
            className="w-full h-[70rem] md:h-[52rem] absolute top-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)",
            }}
          ></div> */}
          <div className="absolute bottom-1 text-right md:text-left right-1 md:left-1 text-white font-extrabold mx-10 my-10 ml-32 leading-20 text-8xl group-hover:ml-36 group-hover:my-12">
            <div>{currentArticle?.attributes?.Title}</div>
            <div>{currentArticle?.attributes?.Subtitle}</div>
          </div>
        </div>
        <div
          onClick={() => setCurrentIndex((prev) => prev + 1)}
          className="group cursor-pointer bg-transparent absolute flex flex-col items-center right-[2rem] md:right-[5rem] xl:right-[4rem] mb-[28rem] sm:mb-[20rem] md:mb-0 mt-24"
        >
          <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-[7rem] md:h-[7rem] mb-24 ml-[21rem] sm:ml-[20rem] md:ml-[12rem]">
            <div className="border md:border-3 border-white border-solid text-white cursor-pointer group-hover:bg-white group-hover:text-black h-full flex justify-center items-center">
              {" "}
              <Icon
                style={{ strokeWidth: "1rem" }}
                size={4}
                path={mdiChevronRight}
              />
            </div>
            <div className="mt-4 flex w-full justify-between">
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
          <div className="w-[28rem] h-[18rem] md:w-[30rem] md:h-[20rem] border md:border-3 border-white border-solid ">
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
        </div>
      </div>
      <div className="h-14 flex relative">
        <div className="w-gallery relative border-r md:border-r-3  border-white border-solid"></div>
        <div className="absolute w-full border-t md:border-t-3  border-white border-solid right-0" />
      </div>
    </div>
  );
};
