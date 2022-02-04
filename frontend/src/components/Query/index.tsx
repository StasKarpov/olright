import React from "react";
import Loader from "react-loader-spinner";

import { useQuery } from "@apollo/react-hooks";

const Query = ({
  children,
  query,
  variables,
  disableLoader = false,
  loaderClassName = "",
  darkLoader = false,
}: any) => {
  const { data, loading, error, fetchMore } = useQuery(query, {
    variables,
  });
  if (loading)
    return disableLoader ? null : (
      <div
        className={`w-full flex justify-center my-20 ${
          darkLoader ? "bg-black" : "bg-white"
        } ${loaderClassName}`}
      >
        <Loader
          type="Oval"
          color={darkLoader ? "#fff" : "#000"}
          height={100}
          width={100}
        />
      </div>
    );

  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  return children({ data, fetchMore, loading });
};

export default Query;
