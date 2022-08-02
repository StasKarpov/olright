import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { LangProvider } from "./context/lang";
import { TRANSLATION } from "./queries/translation";
import Query from "./components/Query";
import { Query as QueryType, TranslationEntity } from "./types";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Articles from "./pages/Articles";
import Releases from "./pages/Releases";
import Playlists from "./pages/Playlists";
import Special from "./pages/Special";

import { ApolloProvider } from "@apollo/react-hooks";
import client from "./utils/apolloClient";

function App() {
  return (
    <ApolloProvider client={client}>
      <Query darkLoader loaderClassName="h-[100vh]" query={TRANSLATION}>
        {({ data: { translations } }: { data: QueryType }) => (
          <div className="dark:bg-black">
            <div className="bg-cover relative" id="app-container">
              <div className="absolute top-0 h-full w-full z-0">
                <div
                  id="article-overlay-container"
                  className="z-0 md:container w-full h-full bg-transparent"
                />
              </div>
              <LangProvider translationQueryResult={translations?.data || []}>
                <Router>
                  <Header />
                  <div className="relative z-10 min-h-[calc(100vh-25rem)]">
                    <Routes>
                      <Route path="/">
                        <Route index element={<Home />} />
                        <Route path="/articles" element={<Articles />}>
                          <Route path=":articleId" element={<Article />} />
                        </Route>
                        <Route path="/special" element={<Special />}>
                          <Route path=":articleId" element={<Article />} />
                        </Route>

                        <Route path="/releases" element={<Releases />} />
                        <Route path="/playlists" element={<Playlists />} />
                      </Route>
                    </Routes>
                  </div>
                  <Footer />
                </Router>
              </LangProvider>
            </div>
          </div>
        )}
      </Query>
    </ApolloProvider>
  );
}

export default App;
