import { STRAPI_BASE_URL } from "../config";

export const toAbsoluteSrc = (url: string | undefined) => {
  var r = new RegExp("^(?:[a-z]+:)?//", "i");
  if (url) {
    if (r.test(url)) {
      //url is absolute
      return `${url}`;
    } else {
      return `${STRAPI_BASE_URL}${url}`;
    }
  } else {
    return "";
  }
};

export const toAbsoluteUrl = (url: string | undefined) => {
  return `url(${toAbsoluteSrc(url)})`;
};

export const bgImageStyle = (imgSrc?: string) => ({
  backgroundImage: toAbsoluteUrl(imgSrc || ""),
});

export const isSameDomain = (url: string = "") => {
  console.log(url);
  var hrefURL = new URL(url);
  const pageURL = new URL(window.location.toString());
  console.log(pageURL);
  if (hrefURL.host == pageURL.host) {
    return true;
  } else {
    return false;
  }
};

export const getDaysAgo = (date: Date | string) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

  const today: Date = new Date();
  const playlistDate: Date = new Date(date);

  // To calculate the no. of days between two dates
  return Math.round(
    Math.abs((today.getTime() - playlistDate.getTime()) / oneDay)
  );
};
