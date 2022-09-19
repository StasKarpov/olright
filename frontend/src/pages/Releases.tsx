import React from "react";
import Query from "../components/Query";
import FadeIn from "react-fade-in";

import { Query as QueryType, ReleaseEntity } from "../types";
import { MAIN_RELEASE, RELEASES } from "../queries/releases";
import { bgImageStyle } from "../utils/index";
import { useNavigate } from "react-router-dom";
import { darkModeOn, setStyleVariable } from "../utils/theme";
import { useLang } from "../context/lang";
import { getDaysAgo } from "../utils";
import { adopt } from "react-adopt";

export const ReleasesQuery = adopt({
  mainReleaseQuery: ({ render }) => (
    <Query darkLoader query={MAIN_RELEASE} loaderClassName="h-[100vh]">
      {render}
    </Query>
  ),
  releasesQuery: ({ render }) => (
    <Query darkLoader query={RELEASES} variables={{ offset: 0, limit: 8 }}>
      {render}
    </Query>
  ),
});

interface IReleasesQueryRender {
  mainReleaseQuery: {
    data: QueryType;
  };
  releasesQuery: {
    data: QueryType;
    fetchMore: Function;
  };
}

export default () => {
  const { t } = useLang();

  React.useEffect(() => {
    darkModeOn();
    setStyleVariable("--active-link-color", "rgb(251, 4, 93)");
  }, []);

  const isSmallScreen = window.innerWidth < 640;

  return (
    <FadeIn>
      <div className="container mt-20 md:mt-0 px-8 md:px-48 2xl:px-6">
        <ReleasesQuery>
          {({
            mainReleaseQuery: {
              data: { mainRelease },
            },
            releasesQuery: {
              data: { releases },
              fetchMore: fetchMoreReleases,
            },
          }: IReleasesQueryRender) => {
            const fetchMore = () =>
              fetchMoreReleases({
                variables: { offset: releases?.data.length },
                updateQuery: (prev: any, { fetchMoreResult }: any) => {
                  if (!fetchMoreResult) return prev;
                  return Object.assign({}, prev, {
                    releases: {
                      __typename: "ReleaseEntityResponseCollection",
                      meta: prev.releases.meta,
                      data: [
                        ...prev.releases.data,
                        ...fetchMoreResult.releases.data,
                      ],
                    },
                  });
                },
              });
            const hasMore =
              releases?.meta.pagination.total != releases?.data.length;

            return mainRelease && releases ? (
              <div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
                  <div style={{ gridArea: "1/1/3/3" }}>
                    <Release
                      big
                      release={
                        mainRelease?.data?.attributes?.release?.data
                          ? mainRelease.data.attributes.release.data
                          : undefined
                      }
                    />
                  </div>
                  {releases?.data.map((release: ReleaseEntity, index) => (
                    <div
                      style={
                        isSmallScreen
                          ? {}
                          : index == 0
                          ? { gridArea: "1 / 3 / 2 / 4" }
                          : index == 1
                          ? { gridArea: "2 / 3 / 3 / 4" }
                          : {}
                      }
                    >
                      <Release release={release} />
                    </div>
                  ))}
                </div>
                <div className="w-full flex justify-center my-40">
                  {hasMore && (
                    <div
                      onClick={() => fetchMore()}
                      className="mx-auto cursor-pointer bg-black hover:bg-white text-3xl text-white hover:text-black border-3 border-solid border-white px-32 py-8"
                    >
                      {t("більше релізів")}
                    </div>
                  )}
                </div>
              </div>
            ) : null;
          }}
        </ReleasesQuery>
      </div>
    </FadeIn>
  );
};

export const Release = ({
  release,
  big = false,
}: {
  release?: ReleaseEntity;
  big?: boolean;
}) => {
  const navigate = useNavigate();
  const { t } = useLang();

  const handleClick = () => {
    let link = release?.attributes?.Link || "";

    if (link.startsWith("/")) {
      navigate(link);
    } else {
      if (!link.startsWith("http")) {
        link = "https://" + link;
      }
      const linkUrl = new URL(link);
      const pageURL = new URL(window.location.toString());
      if (linkUrl.host == pageURL.host) {
        navigate(linkUrl.pathname);
      } else {
        window.open(link, "_blank");
      }
    }
  };

  return release ? (
    <div onClick={handleClick} className="cursor-pointer group">
      <div
        className="w-full  pt-[80%] bg-cover bg-center bg-no-repeat"
        style={bgImageStyle(release.attributes?.Image?.data?.attributes?.url)}
      ></div>
      <div
        className={`w-full relative pt-[15%] sm:pt-[30%] md:pt-[30%] lg:pt-[25%] xl:pt-[20%] 2xl:pt-[30%] bg-cover bg-center bg-no-repeat border-1 border-solid border-black`}
        style={bgImageStyle(release.attributes?.Image?.data?.attributes?.url)}
      >
        <div
          className=" w-full h-[calc(100%+2px)] absolute bottom-[-2px]"
          style={{
            background: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <div
            className={`h-full flex flex-col justify-between text-white ${
              big ? "ml-14 mt-8" : "ml-8 mt-3"
            }`}
          >
            <div>
              <div
                className={`${
                  big ? "text-40" : "text-xl leading-8 md:leading-6"
                } font-medium group-hover:font-bold`}
              >
                {release.attributes?.Title}
              </div>
              <div
                className={`${
                  big ? "text-30" : "text-20"
                } font-normal group-hover:font-semibold`}
              >
                {release.attributes?.Subtitle}
              </div>
            </div>

            <div
              className={`${
                big ? "text-xl" : "text-sm"
              } font-normal text-white text-right absolute bottom-0 right-0 mr-8 mb-4`}
            >{`${getDaysAgo(release.attributes?.Date)} ${t("днi тому")}`}</div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
