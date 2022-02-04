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

export default () => {
  React.useEffect(() => {
    darkModeOn();
    setStyleVariable("--active-link-color", "rgb(251, 4, 93)");
  }, []);

  return (
    <FadeIn>
      <div className="container mt-20 md:mt-0">
        <Query darkLoader query={MAIN_RELEASE}>
          {({ data: { mainRelease } }: { data: QueryType }) => (
            <div className="w-full p-0 md:py-52 md:px-80">
              <Release
                big
                release={
                  mainRelease?.data?.attributes?.release?.data
                    ? mainRelease.data.attributes.release.data
                    : undefined
                }
              />
            </div>
          )}
        </Query>
        <Query
          disableLoader
          query={RELEASES}
          variables={{ offset: 0, limit: 8 }}
        >
          {({
            data: { releases },
            fetchMore,
          }: {
            data: QueryType;
            fetchMore: Function;
          }) => (
            <Releases
              releases={releases?.data}
              hasMore={releases?.meta.pagination.total != releases?.data.length}
              fetchMore={() =>
                fetchMore({
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
                })
              }
            />
          )}
        </Query>
      </div>
    </FadeIn>
  );
};

const Releases = ({
  releases,
  hasMore,
  fetchMore,
}: {
  releases?: Array<ReleaseEntity>;
  hasMore: Boolean;
  fetchMore: Function;
}) => {
  const { t } = useLang();
  return releases ? (
    <div>
      <div className="mt-20 md:mt-0 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
        {releases.map((release: ReleaseEntity) => (
          <Release release={release} />
        ))}
      </div>

      <div className="flex justify-center my-40">
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
    <div onClick={handleClick} className="cursor-pointer">
      <div
        className="w-full pt-[80%] bg-cover bg-center bg-no-repeat"
        style={bgImageStyle(release.attributes?.Image?.data?.attributes?.url)}
      ></div>
      <div
        className={`w-full relative ${
          big
            ? "pt-[20%] md:pt-[35%] xl:pt-[20%] 2xl:pt-[30%]"
            : "pt-[30%] md:pt-[40%] xl:pt-[30%] 2xl:pt-[35%]"
        } bg-cover bg-center bg-no-repeat border-1 border-solid border-black`}
        style={bgImageStyle(release.attributes?.Image?.data?.attributes?.url)}
      >
        <div
          className="group w-full h-[calc(100%+4px+1rem)] absolute bottom-[-2px]"
          style={{
            background: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(300px)",
          }}
        >
          <div className={`text-white ${big ? "ml-14 mt-8" : "ml-8 mt-3"}`}>
            <div
              className={`${
                big ? "text-60" : "text-40"
              } font-medium group-hover:font-bold`}
            >
              {release.attributes?.Title}
            </div>
            <div
              className={`${
                big ? "text-50" : "text-30"
              } font-normal group-hover:font-semibold`}
            >
              {release.attributes?.Subtitle}
            </div>
            {big && (
              <div className="text-xl font-normal text-white text-right mr-8">{`${getDaysAgo(
                release.attributes?.Date
              )} ${t("днi тому")}`}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
