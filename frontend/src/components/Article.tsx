import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import moment from "moment";
import "moment/locale/uk";

import { toAbsoluteSrc } from "../utils";
import { STRAPI_BASE_URL } from "../config";
import { setupArticleTheme, initTheme } from "../utils/theme";
import { Query as QueryType, ArticleEntity } from "../types";
import { getDaysAgo } from "../utils";
import { useLang } from "../context/lang";
import { toAbsoluteUrl } from "../utils";
import { useNavigate } from "react-router-dom";
import {
  ArticlesQuery,
  IArticlesQueryRender,
  ArticleCard,
} from "../pages/Articles";

const remarkImgLinks = require("@pondorasti/remark-img-links");

const Article = ({
  article,
  collapsed = false,
  useThisTheme = false,
}: {
  article: ArticleEntity;
  collapsed?: boolean;
  /** Init article theme even if it is collapsed */
  useThisTheme?: boolean;
}) => {
  const { t } = useLang();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!collapsed || useThisTheme) {
      setupArticleTheme(article);
      return () => initTheme();
    }
  }, []);

  return (
    <div
      className={`relative ${collapsed ? "h-[1000px] overflow-hidden" : ""}`}
      style={
        collapsed
          ? {
              WebkitMaskImage:
                "-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)))",
              maskImage:
                "-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)))",
            }
          : {}
      }
    >
      <ArticleHeader article={article} />
      {/* <div className="w-full text-3xl font-thin text-right">
        {`${getDaysAgo(
          article.attributes?.Date || article.attributes?.updatedAt
        )} ${t("днi тому")}`}
      </div> */}

      <div className="container pt-10 text-4xl font-normal dark:text-white leading-13 px-0 md:px-32">
        <div className="w-full text-3xl font-thin text-right my-4">
          {`${moment(article.attributes?.Date || article.attributes?.updatedAt)
            .locale("uk")
            .format("DD.MM.yyyy")}`}
        </div>
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[[remarkImgLinks, { absolutePath: STRAPI_BASE_URL }]]}
        >
          {article.attributes?.Content || ""}
        </ReactMarkdown>
        <div className="flex justify-center px-8">
          {article.attributes?.tags?.data.map((tag) => (
            <div
              onClick={() => navigate(`?search=${tag.attributes?.name}`)}
              className="my-28 mx-20 font-semibold text-grey cursor-pointer hover:text-black dark:hover:text-white"
            >
              {tag.attributes?.name}
            </div>
          ))}
        </div>
        <ArticlesQuery>
          {({
            normalArcticlesQuery: {
              data: { articles: normalArticles },
            },
            priorArticlesQuery: {
              data: { articles: priorArticles },
            },
          }: IArticlesQueryRender) =>
            normalArticles && priorArticles ? (
              <div className="flex">
                <ArticleCard minimize article={priorArticles.data[0]} />
                <ArticleCard minimize article={normalArticles.data[0]} />
                <ArticleCard minimize article={normalArticles.data[1]} />
              </div>
            ) : null
          }
        </ArticlesQuery>
        <div className="flex justify-center my-20">
          <div
            onClick={() => navigate(-1)}
            className="border-3 border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black dark:text-white border-solid px-16 py-10 text-3xl font-medium cursor-pointer "
          >
            {t("повернутися назад")}
          </div>
        </div>
      </div>
    </div>
  );
};

const ArticleHeader = ({ article }: { article: ArticleEntity }) => {
  const minimizeHeader = article.attributes?.Special;

  return minimizeHeader ? (
    <>
      <div className="container p-0">
        <div className="text-white font-extrabold mx-0 md:mx-32 leading-20 mb-6 mt-20 text-7xl md:text-8xl">
          <div>{article.attributes?.Title}</div>
          <div>{article.attributes?.Subtitle}</div>
        </div>
      </div>

      <div className="container p-0 relative w-full px-0 md:px-32">
        <img
          className="w-full"
          src={toAbsoluteSrc(
            article.attributes?.Image?.data?.attributes?.url || ""
          )}
        />
      </div>
    </>
  ) : (
    <>
      <div className="relative border-y-3 border-solid border-white relative w-full max-h-[70vh] overflow-hidden bg-black">
        <img
          className="m-auto"
          src={toAbsoluteSrc(
            article.attributes?.Image?.data?.attributes?.url || ""
          )}
        />

        <div
          className="w-full h-full absolute top-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)",
          }}
        ></div>

        <div className="absolute bottom-1 left-1 text-white font-extrabold leading-12 md:leading-20  ml-10 mb-6 text-5xl md:text-8xl">
          <div>{article.attributes?.Title}</div>
          <div>{article.attributes?.Subtitle}</div>
        </div>
      </div>
    </>
  );
};

export default Article;
