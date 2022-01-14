import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LangProvider } from "./context/lang";
import { TRANSLATION } from "./queries/translation";
import Query from "./components/Query";
import { Query as QueryType, TranslationEntity } from "./types";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Articles from "./pages/Articles";

import { ApolloProvider } from "@apollo/react-hooks";
import client from "./utils/apolloClient";

function App() {
  return (
    <ApolloProvider client={client}>
      <Query query={TRANSLATION}>
        {({ data: { translations } }: { data: QueryType }) => (
          <LangProvider translationQueryResult={translations?.data || []}>
            <Router>
              <Header />
              <div className="min-h-[calc(100vh-25rem)] mt-28">
                <Routes>
                  <Route path="/">
                    <Route index element={<Home />} />
                    <Route path="/articles" element={<Articles />}>
                      <Route path=":articleId" element={<Article />} />
                    </Route>
                  </Route>
                </Routes>
              </div>
              <Footer />
            </Router>
          </LangProvider>
        )}
      </Query>
    </ApolloProvider>
  );
}

export default App;
