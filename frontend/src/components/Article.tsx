import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import { toAbsoluteSrc } from "../utils";
import { STRAPI_BASE_URL } from "../config";
import { setupArticleTheme, initTheme } from "../utils/theme";
import { Query as QueryType, ArticleEntity } from "../types";
import { getDaysAgo } from "../utils";
import { useLang } from "../context/lang";
import { toAbsoluteUrl } from "../utils";

const remarkImgLinks = require("@pondorasti/remark-img-links");

const Article = ({ article }: { article: ArticleEntity }) => {
  React.useEffect(() => {
    setupArticleTheme(article);

    return () => initTheme();
  }, []);

  return (
    <div className="relative">
      <ArticleHeader article={article} />
      <div className="container pt-10 text-4xl font-normal dark:text-white leading-13 px-0 md:px-32">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[[remarkImgLinks, { absolutePath: STRAPI_BASE_URL }]]}
        >
          {article.attributes?.Content || ""}
        </ReactMarkdown>
      </div>
    </div>
  );
};

const ArticleHeader = ({ article }: { article: ArticleEntity }) => {
  const { t } = useLang();

  const minimizeHeader = article.attributes?.MinimizeHeader;

  return minimizeHeader ? (
    <>
      <div className="container p-0">
        <div className="text-white font-extrabold mx-0 md:mx-32 leading-20 mb-6 mt-20 text-7xl md:text-8xl">
          <div className="w-full text-3xl font-thin text-right">
            {`${getDaysAgo(article.attributes?.Date)} ${t("днi тому")}`}
          </div>
          <div>{article.attributes?.Title}</div>
          <div>{article.attributes?.Subtitle}</div>
        </div>
      </div>

      <div
        className="md:container p-0 relative w-full"
        style={{ paddingLeft: 0, paddingRight: 0 }}
      >
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
      <div className="relative border-y-3 md:border-y-6 border-solid border-white relative w-full max-h-[70vh] overflow-hidden flex">
        <img
          className="w-full object-cover"
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
