import React from "react";

export default ({ className, src }: { className: string; src?: string }) => {
  const [imageLoading, setImageLoading] = React.useState(true);

  return src ? (
    <img
      className={`${className} transition-all duration-300 ${
        imageLoading ? "opacity-0" : "opacity-100"
      }`}
      onLoad={() => setImageLoading(false)}
      src={src}
    />
  ) : null;
};
