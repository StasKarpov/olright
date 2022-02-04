import { ArticleEntity } from "../types";
import { toAbsoluteUrl } from ".";

export const isDarkMode = () => {
  const html = document.querySelector("html");
  if (html) {
    return html.classList.contains("dark");
  }
};

export const darkModeOn = () => {
  const html = document.querySelector("html");
  if (html) {
    if (!html.classList.contains("dark")) {
      html.classList.add("dark");
    }
  }
};

export const darkModeOff = () => {
  const html = document.querySelector("html");
  if (html) {
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
    }
  }
};

export const setStyleVariable = (variableName: string, value: string) => {
  document.documentElement.style.setProperty(variableName, value);
};

type ArticleConfig = {
  articleContainerBackground?: string;
  articleContainerBackdropFilter?: string;
  activeLinkColor?: string;
};

export const initTheme = () => {
  setStyleVariable("--active-link-color", "rgba(13, 8, 242, 1)");
  setStyleVariable("--article-container-background", "transparent");
  setStyleVariable("--article-container-backdrop-filter", "none");
  setStyleVariable("--app-container-background", "transparent");
};

export const setupArticleTheme = (article: ArticleEntity) => {
  //setup dark theme settings

  if (article.attributes?.Dark) {
    darkModeOn();
    setStyleVariable("--active-link-color", "white");
  } else {
    darkModeOff();
    setStyleVariable("--active-link-color", "black");
  }

  //setup background image
  if (article.attributes?.BackgroundImage?.data?.attributes?.url) {
    // const backgroundImage = document.getElementById(
    //   "background-image"
    // ) as HTMLImageElement;
    // if (backgroundImage)
    //   backgroundImage.src = toAbsoluteSrc(
    //     article.attributes?.BackgroundImage?.data?.attributes?.url
    //   );
    setStyleVariable(
      "--app-container-background",
      toAbsoluteUrl(article.attributes?.BackgroundImage?.data?.attributes?.url)
    );
  }

  //other css config
  const articleCssConfig: ArticleConfig = article.attributes?.ArticleCssConfig;

  if (articleCssConfig?.activeLinkColor) {
    setStyleVariable("--active-link-color", articleCssConfig.activeLinkColor);
  } else {
    const isSmallScreen = window.innerWidth < 768;
    if (isSmallScreen) {
      setStyleVariable("--active-link-color", "white");
    }
  }

  if (articleCssConfig?.articleContainerBackground) {
    setStyleVariable(
      "--article-container-background",
      articleCssConfig.articleContainerBackground
    );
  }

  if (articleCssConfig?.articleContainerBackdropFilter) {
    setStyleVariable(
      "--article-container-backdrop-filter",
      articleCssConfig.articleContainerBackdropFilter
    );
  }
};
