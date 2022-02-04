import React from "react";
import { useParams } from "react-router-dom";

import Query from "../components/Query";
import Article from "../components/Article";

import { Query as QueryType } from "../types";
import { ARTICLE } from "../queries/articles";
import { isDarkMode } from "../utils/theme";

export default () => {
  const { articleId } = useParams();

  return (
    <Query darkLoader={isDarkMode()} query={ARTICLE} variables={{ articleId }}>
      {({ data: { article } }: { data: QueryType }) =>
        article?.data ? <Article article={article?.data} /> : null
      }
    </Query>
  );
};
