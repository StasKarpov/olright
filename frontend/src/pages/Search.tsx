import React from "react";
import FadeIn from "react-fade-in";
import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import { debounce } from "lodash";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { mdiMagnify } from "@mdi/js";

import { ArticleEntity, ArticleEntityResponseCollection } from "../types";
import { STRAPI_BASE_URL } from "../config";
import { useLang } from "../context/lang";

const fetchArticles = async (
  tagName: string,
  page: number,
  onFetch?: (articles: Partial<ArticleEntity>[], hasNext: boolean) => void
): Promise<[Partial<ArticleEntity>[], boolean]> => {
  const {
    data: { data, meta },
  } = await axios.get<ArticleEntityResponseCollection>(
    `${STRAPI_BASE_URL}/api/articles?pagination[page]=${page}&pagination[pageSize]=20&fields[0]=Title&fields[1]=Subtitle&sort=updatedAt:DESC&filters[$and][0][tags][name][$contains]=${tagName}`
  );
  console.log(meta);
  const hasNext =
    meta.pagination.page * meta.pagination.pageSize < meta.pagination.total;
  if (onFetch) {
    onFetch(data, hasNext);
  }
  return [data, hasNext];
};

const debouncedFetchData = debounce(
  (
    tagName: string,
    page: number,
    onFetch: (articles: Partial<ArticleEntity>[], hasNext: boolean) => void
  ) => {
    fetchArticles(tagName, page, onFetch);
  },
  300
);

export default () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLang();

  const [show, setShow] = React.useState(false);

  const [searchTag, setSearchTag] = React.useState("");

  const pageRef = React.useRef(1);
  const hasNextRef = React.useRef(false);

  const [searchResults, setSearchResults] = React.useState<
    Partial<ArticleEntity>[]
  >([]);

  const searchResultsRef = React.useRef<HTMLDivElement>(null);

  /** Search with url */
  React.useEffect(() => {
    if (location.search.includes("search")) {
      setShow(true);
      setSearchTag(decodeURI(location.search.split("=")[1]));
    }
  }, [location]);

  /** Fetch on type effect */
  React.useEffect(() => {
    //cleanup paging on type
    pageRef.current = 1;
    if (searchTag) {
      debouncedFetchData(searchTag, pageRef.current, (articles, hasNext) => {
        setSearchResults(articles);
        hasNextRef.current = hasNext;
      });
    } else {
      debouncedFetchData.cancel();
      setSearchResults([]);
    }
  }, [searchTag]);

  /** Infinite scroll effect */
  React.useEffect(() => {
    if (searchResultsRef.current) {
      searchResultsRef.current.addEventListener("scroll", trackScrolling);
    }
    return () => {
      if (searchResultsRef.current) {
        searchResultsRef.current.removeEventListener("scroll", trackScrolling);
      }
    };
  });

  const trackScrolling = (event: Event) => {
    const searchResultsDiv = event.target;
    if (searchResultsDiv && searchResultsDiv instanceof HTMLElement) {
      const leftToBottom =
        searchResultsDiv.scrollHeight -
        searchResultsDiv.clientHeight -
        searchResultsDiv.scrollTop;
      if (leftToBottom < 10) {
        pageRef.current = pageRef.current + 1;
        fetchNext();
      }
    }
  };

  const fetchNext = async () => {
    if (hasNextRef.current) {
      const [nextArticles, hasNext] = await fetchArticles(
        searchTag,
        pageRef.current
      );
      setSearchResults((prev) => [...prev, ...nextArticles]);
      hasNextRef.current = hasNext;
    }
  };

  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setShow((prev) => !prev);
        }}
        className="absolute h-full flex items-center left-0 top-0 cursor-pointer ml-24"
      >
        <Icon
          size={2}
          className="text-black dark:text-white"
          path={mdiMagnify}
        />
      </div>
      <div className="z-20 fixed top-0 left-0">
        {show && (
          <FadeIn>
            <div
              className="top-0 left-0 z-30 fixed  h-[100vh] w-[100vw]"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.78)" }}
            >
              <div
                className="p-8 absolute top-0 right-0 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setShow(false);
                }}
              >
                <Icon size={4} color="white" path={mdiClose} />
              </div>
              <div className="w-[100vw] mt-[30vh] px-60">
                <input
                  value={searchTag}
                  onChange={(e) => setSearchTag(e.target.value)}
                  width="100%"
                  className="bg-transparent border-b-3 border-white border-solid w-full text-white text-60 font-normal outline-0"
                  placeholder={t("пошук...")}
                ></input>
                <div
                  ref={searchResultsRef}
                  className="w-full h-[50vh] text-white text-60 font-normal overflow-auto text-left"
                >
                  {searchResults.map((article) => (
                    <div
                      key={article.id}
                      className="py-4 cursor-pointer hover:font-bold"
                      onClick={() => {
                        setShow(false);
                        navigate(`articles/${article.id}`);
                      }}
                    >
                      {`${article.attributes?.Title} ${article.attributes?.Subtitle}`}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </>
  );
};
