import React from "react";
import errorPageBg from "../images/errorPageBG.jpg";

const ErrorPage = () => {
  return (
    <div
      id="error-page"
      className="flex flex-col items-center justify-start h-screen text-center bg-cover bg-center"
      style={{ backgroundImage: `url(${errorPageBg})` }}
    >
      <h2 className="text-3xl font-bold text-black mb-4 mt-16">Oops!</h2>
      <h3 className="text-xl font-bold text-black mb-2">
        Sorry, an unexpected error has occurred.
      </h3>
      <p className="text-base-lg font-bold italic text-black">
        <i>The page you requested could not be found.</i>
      </p>
    </div>
  );
};

export default ErrorPage;
