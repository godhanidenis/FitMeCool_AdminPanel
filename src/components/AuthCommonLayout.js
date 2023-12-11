import React, { useEffect, useState } from "react";
import ImageLoadingSkeleton from "./Modal/ImageLoadingSkeleton";
import AuthCover from "../Assets/authCover.png";

const AuthCommonLayout = ({ children }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = AuthCover;
    img.onload = () => {
      setLoaded(true);
    };
  }, []);

  return (
    <div className="bg-background w-full">
      <div className="bg-white flex w-full sm:gap-10 min-h-[100vh] overflow-auto">
        <div className="md:w-[50%] w-full flex flex-col p-6 sm:p-10 justify-center sm:justify-start">
          {children}
        </div>
        <div
          className="hidden md:block md:w-[50%] bg-cover bg-repeat-round"
          style={{
            backgroundImage: `url(${loaded && AuthCover})`,
            display: !loaded && "none",
          }}
        />

        {!loaded && (
          <ImageLoadingSkeleton className="!hidden md:!block md:!w-[50%] !h-screen" />
        )}
      </div>
    </div>
  );
};

export default AuthCommonLayout;
