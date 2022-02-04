import React from "react";

export default ({}) => {
  const [loading, setLoading] = React.useState(false);

  return (
    <img
      id="background-image"
      className={`absolute top-0 h-full w-full transition-all duration-500 ${
        loading ? "opacity-0" : "opacity-100"
      }`}
      onLoad={() => setLoading(false)}
    />
  );
};
