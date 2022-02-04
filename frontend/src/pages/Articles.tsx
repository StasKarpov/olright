import React from "react";
import { useParams, Outlet, useNavigate, useLocation } from "react-router-dom";
import Query from "../components/Query";
import { Query as QueryType, ArticleEntity } from "../types";
import { ARTICLES_NORMAL, ARTICLES_PRIOR } from "../queries/articles";
import { useLang } from "../context/lang";
import { adopt } from "react-adopt";
import { bgImageStyle } from "../utils/index";
import { darkModeOff, initTheme } from "../utils/theme";
import FadeIn from "react-fade-in";

const ArticlesQuery = adopt({
  priorArticlesQuery: ({ render }) => (
    <Query
      query={ARTICLES_PRIOR}
      loaderClassName="h-[100vh]"
      variables={{ offset: 0, limit: 2 }}
    >
      {render}
    </Query>
  ),
  normalArcticlesQuery: ({ render }) => (
    <Query query={ARTICLES_NORMAL} variables={{ offset: 0, limit: 9 }}>
      {render}
    </Query>
  ),
});

interface IArticlesQueryRender {
  normalArcticlesQuery: {
    data: QueryType;
    fetchMore: Function;
  };
  priorArticlesQuery: {
    data: QueryType;
    fetchMore: Function;
  };
}

export default () => {
  const { articleId } = useParams();
  const location = useLocation();

  React.useEffect(() => {
    if (!articleId && location.pathname == "/articles") {
      darkModeOff();
    }
    initTheme();
  }, [location]);

  return articleId ? (
    <Outlet />
  ) : (
    <ArticlesQuery>
      {({
        normalArcticlesQuery: {
          data: { articles: normalArticles },
          fetchMore: fetchMoreNormalArticles,
        },
        priorArticlesQuery: {
          data: { articles: priorArticles },
          fetchMore: fetchMorePriorArticles,
        },
      }: IArticlesQueryRender) =>
        normalArticles && priorArticles ? (
          <Articles
            normalArticles={normalArticles?.data}
            priorArticles={priorArticles?.data}
            hasMore={
              normalArticles?.meta.pagination.total +
                priorArticles?.meta.pagination.total !=
              normalArticles?.data.length + priorArticles?.data.length
            }
            fetchMore={() => {
              const updateQuery = (prev: any, { fetchMoreResult }: any) => {
                if (!fetchMoreResult) return prev;
                console.log(prev, fetchMoreResult);
                return Object.assign({}, prev, {
                  articles: {
                    __typename: "ArticleEntityResponseCollection",
                    meta: prev.articles.meta,
                    data: [
                      ...prev.articles.data,
                      ...fetchMoreResult.articles.data,
                    ],
                  },
                });
              };
              fetchMorePriorArticles({
                variables: { offset: priorArticles.data.length },
                updateQuery,
              });
              fetchMoreNormalArticles({
                variables: { offset: normalArticles.data.length },
                updateQuery,
              });
            }}
          />
        ) : null
      }
    </ArticlesQuery>
  );
};

const Articles = ({
  normalArticles,
  priorArticles,
  hasMore,
  fetchMore,
}: {
  normalArticles: Array<ArticleEntity>;
  priorArticles: Array<ArticleEntity>;
  hasMore: Boolean;
  fetchMore: Function;
}) => {
  const { t } = useLang();
  const location = useLocation();

  const nArticlesBuffer = [...normalArticles];
  const sArticlesBuffer = [...priorArticles];

  const articles: Array<ArticleEntity> = [];

  const isSmallScreen = window.innerWidth < 768;

  const NORMAL_ARTICLES_RATIO = isSmallScreen ? 4 : 6;

  //sort articles
  priorArticles.forEach(() => {
    //push one prior article
    if (sArticlesBuffer.length) {
      articles.push(sArticlesBuffer.shift() as ArticleEntity);
    }

    //and N normal articles
    Array.from(Array(NORMAL_ARTICLES_RATIO).keys()).forEach(() => {
      if (nArticlesBuffer.length) {
        articles.push(nArticlesBuffer.shift() as ArticleEntity);
      }
    });
  });

  //if there is still some normal articles
  while (nArticlesBuffer.length) {
    articles.push(nArticlesBuffer.shift() as ArticleEntity);
  }

  return (
    <div className="relative container mt-0 md:mt-28 pt-20 md:pt-0">
      {isSmallScreen && location.pathname == "/articles" ? null : (
        <>
          <div className="text-12xl md:text-20xl leading-25 md:leading-30 font-thin ml-[-0.68rem] md:ml-[-1.5rem] before:content-['|'] before:absolute before:left-[1.36rem] md:before:left-[0.56rem] before:top-[11.7rem] md:before:top-[11rem]">
            <span>{t("НОВЕ")}</span>
          </div>
          <div className="absolute left-[50%] w-[50vw]">
            <hr className="relative left-[-100%] border-t md:border-t-4 border-solid border-black w-[100vw]"></hr>
          </div>
        </>
      )}
      <FadeIn>
        <div className="w-full flex flex-wrap pt-10">
          {articles?.map((article: ArticleEntity, index: number) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>
      </FadeIn>
      <div className="w-full flex justify-center my-40">
        {hasMore && (
          <div
            onClick={() => fetchMore()}
            className="cursor-pointer font-medium text-3xl inline-block border border-black border-solid bg-white px-16 py-10 hover:text-white hover:bg-black"
          >
            {t("бiльше новин")}
          </div>
        )}
      </div>
    </div>
  );
};

const ArticleCard = ({ article }: { article: ArticleEntity }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const articleLink =
    location.pathname == "/articles"
      ? `${article.id as string}`
      : `articles/${article.id as string}`;

  return (
    <div
      className={`${
        article.attributes?.Prior ? "w-full py-10 md:py-24" : "w-1/2 lg:w-1/3"
      } p-2 group`}
    >
      <div
        onClick={() => navigate(articleLink)}
        className={`w-full cursor-pointer relative bg-cover bg-center bg-no-repeat ${
          article.attributes?.Prior ? "pt-half md:pt-third" : "pt-full"
        }  `}
        style={bgImageStyle(
          article.attributes?.Image?.data?.attributes?.url || ""
        )}
      >
        <div
          className="w-full h-full absolute top-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)",
          }}
        ></div>
        <div
          className={`absolute bottom-1 left-1 text-white text-3xl md:text-4xl group-hover:mx-6 group-hover:my-4 font-extrabold ml-4 mb-2 leading-10 md:leading-12`}
        >
          <div>{article.attributes?.Title || ""}</div>
          <div>{article.attributes?.Subtitle || ""}</div>
        </div>
      </div>
    </div>
  );
};
