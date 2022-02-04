import React from "react";
import Query from "../components/Query";
import { Query as QueryType, ArticleEntity } from "../types";
import { SPECIAL_ARTICLE } from "../queries/articles";
import Article from "../components/Article";
import { isDarkMode, darkModeOn } from "../utils/theme";

export default () => {
  React.useEffect(() => {
    darkModeOn();
  }, []);

  return (
    <Query darkLoader query={SPECIAL_ARTICLE}>
      {({ data: { specialArticle } }: { data: QueryType }) =>
        specialArticle?.data?.attributes?.article?.data ? (
          <Article article={specialArticle.data.attributes.article.data} />
        ) : null
      }
    </Query>
  );
};
