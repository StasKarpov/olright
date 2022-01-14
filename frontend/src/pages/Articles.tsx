import React from "react";
import { useParams, Outlet } from "react-router-dom";
import Query from "../components/Query";
import { Query as QueryType, ArticleEntity } from "../types";
import { ARTICLES_NORMAL, ARTICLES_SPECIAL } from "../queries/articles";
import Card from "../components/Card";
import { useLang } from "../context/lang";
import { adopt } from "react-adopt";

const ArticlesQuery = adopt({
  specialArticlesQuery: ({ render }) => (
    <Query query={ARTICLES_SPECIAL} variables={{ offset: 0, limit: 1 }}>
      {render}
    </Query>
  ),
  normalArcticlesQuery: ({ render }) => (
    <Query query={ARTICLES_NORMAL} variables={{ offset: 0, limit: 3 }}>
      {render}
    </Query>
  ),
});

interface IArticlesQueryRender {
  normalArcticlesQuery: {
    data: QueryType;
    fetchMore: Function;
  };
  specialArticlesQuery: {
    data: QueryType;
    fetchMore: Function;
  };
}

export default () => {
  const { articleId } = useParams();

  return articleId ? (
    <Outlet />
  ) : (
    <ArticlesQuery>
      {({
        normalArcticlesQuery: {
          data: { articles: normalArticles },
          fetchMore: fetchMoreNormalArticles,
        },
        specialArticlesQuery: {
          data: { articles: specialArticles },
          fetchMore: fetchMoreSpecialArticles,
        },
      }: IArticlesQueryRender) =>
        normalArticles && specialArticles ? (
          <Articles
            normalArticles={normalArticles?.data}
            specialArticles={specialArticles?.data}
            fetchMore={() => {
              const updateQuery = (prev: any, { fetchMoreResult }: any) => {
                if (!fetchMoreResult) return prev;
                console.log(prev, fetchMoreResult);
                return Object.assign({}, prev, {
                  articles: {
                    __typename: "ArticleEntityResponseCollection",
                    data: [
                      ...prev.articles.data,
                      ...fetchMoreResult.articles.data,
                    ],
                  },
                });
              };
              fetchMoreSpecialArticles({
                variables: { offset: specialArticles.data.length },
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
  specialArticles,
  fetchMore,
}: {
  normalArticles: Array<ArticleEntity>;
  specialArticles: Array<ArticleEntity>;
  fetchMore: Function;
}) => {
  const { t } = useLang();

  const nArticlesBuffer = [...normalArticles];
  const sArticlesBuffer = [...specialArticles];

  console.log(normalArticles);
  console.log(specialArticles);

  const articles: Array<ArticleEntity> = [];

  const NORMAL_ARTICLES_RATIO = 3;

  //sort articles
  specialArticles.forEach(() => {
    //push one special article
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

  return (
    <div className="container">
      <div className="grid grid-cols-3 gap-2">
        {articles?.map((article: ArticleEntity, index: number) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <div
          onClick={() => fetchMore()}
          className="cursor-pointer font-medium text-3xl inline-block border border-black border-solid bg-white px-16 py-10"
        >
          {t("бiльше новин")}
        </div>
      </div>
    </div>
  );
};

const ArticleCard = ({ article }: { article: ArticleEntity }) => {
  return (
    <Card
      link={article.id as string}
      ratio="full"
      title={article.attributes?.Title || ""}
      subtitle={article.attributes?.Subtitle || ""}
      imageSrc={article.attributes?.Image?.data?.attributes?.url || ""}
    />
  );
};
