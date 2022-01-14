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
