import React from "react";
import { useParams } from "react-router-dom";
import Query from "../components/Query";

import { Query as QueryType, ArticleEntity } from "../types";
import { ARTICLE } from "../queries/articles";
import { toAbsoluteSrc } from "../utils";
import Card from "../components/Card";

export default () => {
  const { articleId } = useParams();

  return (
    <Query query={ARTICLE} variables={{ articleId }}>
      {({ data: { article } }: { data: QueryType }) =>
        article?.data ? <Article article={article?.data} /> : null
      }
    </Query>
  );
};

const Article = ({ article }: { article: ArticleEntity }) => {
  return (
    <div className="relative">
      <Card
        textClassName="ml-10 mb-6 text-7xl"
        ratio="third"
        title={`${article.attributes?.Title} ${article.attributes?.Subtitle}`}
        imageSrc={article.attributes?.Image?.data?.attributes?.url || ""}
      />
      {/* <div
        className="w-full bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: toAbsoluteUrl(
            article.attributes?.Image?.data?.attributes?.url
          ),
        }}
      >
        <div className="text-7xl font-extrabold p-4">
          {article.attributes?.Title}
        </div>
      </div> */}
      <div className="container mt-10 text-4xl font-normal">
        {article.attributes?.Content}
      </div>
    </div>
  );
};
