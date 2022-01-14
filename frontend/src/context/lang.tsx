import React, { ReactElement } from "react";
import enLocale from "date-fns/locale/en-US";
import ruLocale from "date-fns/locale/ru";
import moment from "moment";
import _ from "lodash";
import {
  TranslationEntityResponseCollection,
  TranslationEntity,
} from "../types";

export type LangCode = "en" | "ru" | "ua";

export type Translation = {
  [langCode in LangCode]?: {
    // flagUrl: string;
    [key: string]: string;
  };
};

interface ILangContext {
  t: Function;
  getAvailableLangs: () => Array<LangCode>;
  lang: LangCode;
  setLang: Function;
  dateFnsLocale?: Object;
}

const initLang = (localStorage.getItem("userLanguage") as LangCode) || "ua";

const LangContext = React.createContext<ILangContext>({} as ILangContext);

const dateFnsLocaleMap = {
  en: enLocale,
  ru: ruLocale,
  ua: ruLocale,
};

function LangProvider({
  translationQueryResult,
  ...props
}: {
  translationQueryResult: Array<TranslationEntity>;
  children: ReactElement;
}): ReactElement {
  const [lang, setLanguage] = React.useState<LangCode>(initLang);

  const translation =
    translationQueryResult?.reduce(
      (acc: Translation, translation: TranslationEntity) =>
        ({
          en: {
            ...acc.en,
            [translation.attributes?.Key as string]: translation.attributes?.EN,
          },
          ru: {
            ...acc.ru,
            [translation.attributes?.Key as string]: translation.attributes?.RU,
          },
          ua: {
            ...acc.ua,
            [translation.attributes?.Key as string]: translation.attributes?.UA,
          },
        } as Translation),
      { en: {}, ru: {}, ua: {} } as Translation
    ) || ({ en: {}, ru: {}, ua: {} } as Translation);

  const getAvailableLangs = (): Array<LangCode> =>
    (Object.keys(translation) as Array<LangCode>).map(
      (langCode: LangCode) => langCode
    );

  const unknownTranslations = React.useRef<Translation>({});

  moment.locale(lang);

  const setLang = (lang: LangCode) => {
    setLanguage(lang);
    moment.locale(lang);
    localStorage.setItem("userLanguage", lang);
  };

  const t = (key: string): string => {
    if (translation[lang] && translation[lang]?.[key]) {
      return translation[lang]?.[key] || key;
    } else {
      //save unknown translation
      if (!unknownTranslations.current[lang]) {
        unknownTranslations.current[lang] = {
          //flagUrl: "",
          languageName: "",
        };
      }
      unknownTranslations.current[lang]![key] = "";
      return key;
    }
  };

  return (
    <LangContext.Provider
      value={{
        getAvailableLangs,
        lang,
        setLang,
        t,
        dateFnsLocale: dateFnsLocaleMap[lang],
      }}
      {...props}
    />
  );
}

const useLang = () => React.useContext(LangContext);

export { useLang, LangProvider };
