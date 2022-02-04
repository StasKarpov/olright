import React from "react";
import Query from "../components/Query";
import FadeIn from "react-fade-in";

import { Query as QueryType, PlaylistEntity } from "../types";
import { MAIN_PLAYLIST, PLAYLISTS } from "../queries/releases";
import { bgImageStyle } from "../utils/index";
import { useNavigate } from "react-router-dom";
import { darkModeOn, setStyleVariable } from "../utils/theme";
import { useLang } from "../context/lang";

import spotifyIcon from "../assets/svg/spotify.svg";
import itunesIcon from "../assets/svg/itunes.svg";

export default () => {
  React.useEffect(() => {
    darkModeOn();
    setStyleVariable("--active-link-color", "rgba(163, 114, 193)");
  }, []);
  return (
    <FadeIn>
      <div className="container">
        <Query darkLoader query={MAIN_PLAYLIST}>
          {({ data: { mainPlaylist } }: { data: QueryType }) => (
            <div className="w-full p-0 md:py-52 md:px-32">
              <MainPlaylist
                playlist={
                  mainPlaylist?.data?.attributes?.playlist?.data
                    ? mainPlaylist.data.attributes.playlist.data
                    : undefined
                }
              />
            </div>
          )}
        </Query>
        <Query
          disableLoader
          query={PLAYLISTS}
          variables={{ offset: 0, limit: 6 }}
        >
          {({
            data: { playlists },
            fetchMore,
          }: {
            data: QueryType;
            fetchMore: Function;
          }) => (
            <Playlists
              playlists={playlists?.data}
              hasMore={
                playlists?.meta.pagination.total != playlists?.data.length
              }
              fetchMore={() =>
                fetchMore({
                  variables: { offset: playlists?.data.length },
                  updateQuery: (prev: any, { fetchMoreResult }: any) => {
                    if (!fetchMoreResult) return prev;
                    return Object.assign({}, prev, {
                      playlists: {
                        __typename: "PlaylistEntityResponseCollection",
                        meta: prev.playlists.meta,
                        data: [
                          ...prev.playlists.data,
                          ...fetchMoreResult.playlists.data,
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

const Playlists = ({
  playlists,
  hasMore,
  fetchMore,
}: {
  playlists?: Array<PlaylistEntity>;
  hasMore: Boolean;
  fetchMore: Function;
}) => {
  const { t } = useLang();
  return playlists ? (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-14 mt-20 md:mt-0">
        {playlists.map((playlist: PlaylistEntity) => (
          <Playlist playlist={playlist} />
        ))}
      </div>

      <div className="flex justify-center my-40">
        {hasMore && (
          <div
            onClick={() => fetchMore()}
            className="mx-auto cursor-pointer bg-black hover:bg-white text-3xl text-white hover:text-black border-3 border-solid border-white px-32 py-8"
          >
            {t("більше плєйлістів")}
          </div>
        )}
      </div>
    </div>
  ) : null;
};

const Playlist = ({ playlist }: { playlist?: PlaylistEntity }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    let link = playlist?.attributes?.Link || "";

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

  return playlist ? (
    <div className="cursor-pointer mx-4">
      <div
        className="w-full pt-[80%] bg-cover bg-center bg-no-repeat"
        style={bgImageStyle(playlist.attributes?.Image?.data?.attributes?.url)}
      ></div>
      <div
        className={`w-full relative pt-[70%] xl:pt-[50%] 2xl:pt-[60%] bg-cover bg-center bg-no-repeat border-1 border-solid border-black`}
        style={bgImageStyle(playlist.attributes?.Image?.data?.attributes?.url)}
      >
        <div
          className="group w-full h-[calc(100%+4px)] absolute bottom-0 flex flex-col justify-between"
          style={{
            background: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(300px)",
          }}
        >
          <div
            onClick={handleClick}
            className={`${
              playlist.attributes?.Link ? "cursor-pointer" : ""
            } text-white text-30 sm:text-40 font-semibold text-left md:text-right mx-8 mt-3`}
          >
            <div>{playlist.attributes?.Title}</div>
            <div>{playlist.attributes?.Subtitle}</div>
          </div>
          <div className="flex justify-start md:justify-end mb-10 mx-4">
            <img
              style={{ width: "5rem" }}
              onClick={() => {
                if (playlist.attributes?.LinkITunes)
                  window.open(playlist.attributes?.LinkITunes || "");
              }}
              className="m-4 cursor-pointer"
              src={itunesIcon}
            ></img>
            <img
              style={{ width: "5rem" }}
              onClick={() => {
                if (playlist.attributes?.LinkSpotify)
                  window.open(playlist.attributes?.LinkSpotify || "");
              }}
              className="m-4 cursor-pointer"
              src={spotifyIcon}
            ></img>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

const MainPlaylist = ({ playlist }: { playlist?: PlaylistEntity }) => {
  const navigate = useNavigate();
  const { t } = useLang();

  const handleClick = () => {
    let link = playlist?.attributes?.Link || "";

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

  const getDaysAgo = () => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

    const today: Date = new Date();
    const playlistDate: Date = new Date(playlist?.attributes?.Date);

    // To calculate the no. of days between two dates
    return Math.round(
      Math.abs((today.getTime() - playlistDate.getTime()) / oneDay)
    );
  };

  return playlist ? (
    <div className="flex">
      <div
        className="w-[60%] pt-[80%] bg-cover bg-center bg-no-repeat"
        style={bgImageStyle(playlist.attributes?.Image?.data?.attributes?.url)}
      ></div>
      <div
        className={`w-[40%] relative  bg-cover bg-center bg-no-repeat border-1 border-solid border-black`}
        style={bgImageStyle(playlist.attributes?.Image?.data?.attributes?.url)}
      >
        <div
          className="group w-full h-full absolute bottom-0 text-right flex justify-between flex-col p-10 pl-2 md:pl-10"
          style={{
            background: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(300px)",
          }}
        >
          <div className="text-xl font-normal text-white">{`${getDaysAgo()} ${t(
            "днi тому"
          )}`}</div>
          <div>
            <div
              onClick={handleClick}
              className={`${
                playlist.attributes?.Link ? "cursor-pointer" : ""
              } text-white text-40 md:text-60 font-bold ml-8 mt-3`}
            >
              <div>{playlist.attributes?.Title}</div>
              <div>{playlist.attributes?.Subtitle}</div>
            </div>
            <div className="flex justify-end mt-10">
              <img
                style={{ width: "5rem" }}
                onClick={() => {
                  if (playlist.attributes?.LinkITunes)
                    window.open(playlist.attributes?.LinkITunes || "");
                }}
                className="m-4 cursor-pointer"
                src={itunesIcon}
              ></img>
              <img
                style={{ width: "5rem" }}
                onClick={() => {
                  if (playlist.attributes?.LinkSpotify)
                    window.open(playlist.attributes?.LinkSpotify || "");
                }}
                className="m-4 cursor-pointer"
                src={spotifyIcon}
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
