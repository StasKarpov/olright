import React from "react";
import { useLocation } from "react-router-dom";

export default () => {
  const { pathname } = useLocation();

  return <h1>{pathname}</h1>;
};
