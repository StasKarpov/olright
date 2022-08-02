import React from "react";
import Query from "../components/Query";
import { Query as QueryType } from "../types";
import { ARTICLES_SPECIAL } from "../queries/articles";
import Article from "../components/Article";
import { darkModeOn } from "../utils/theme";
import { useLang } from "../context/lang";
import { useNavigate, Outlet, useParams } from "react-router-dom";

export default () => {
  const { t } = useLang();
  const navigate = useNavigate();
  const { articleId } = useParams();

  React.useEffect(() => {
    darkModeOn();
  }, []);

  return articleId ? (
    <Outlet />
  ) : (
    <Query darkLoader query={ARTICLES_SPECIAL}>
      {({ data: { articles } }: { data: QueryType }) =>
        articles?.data?.map((article, index) => (
          <>
            <Article collapsed useThisTheme={index == 0} article={article} />
            <div className="w-full flex justify-center">
              <div
                onClick={() => navigate(`${article.id}`)}
                className="border-3 border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black dark:text-white border-solid px-16 py-10 text-3xl font-medium cursor-pointer "
              >
                {t("читати")}
              </div>
            </div>
          </>
        ))
      }
    </Query>
  );
};
