import React from "react";
import PropTypes from "prop-types";
import strings from "../../app/strings";

export const About = () => {
  return (
    <>
      <div className="bg-dark mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
        <div className="my-3 py-3">
          <h2 className="display-5">What is gr8ful4?</h2>
          <p className="lead">
            I designed gr8ful4 to provide accountability in practicing
            gratitude. Gr8ful4 is shorthand for grateful for.
          </p>
        </div>
      </div>
      <div className="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
        <div className="my-3 p-3">
          <h2 className="display-5">How should I use gr8ful4?</h2>
          <p className="lead">
            This is a place to share your gratitude, a place to decide to be
            happy. It is a tool to make daily gratitude an easier practice. You
            should view gr8ful4 as your public journal of gratitude, and strive
            to share one honest thing you are gr8ful4 each and every day.
          </p>
        </div>
      </div>
      <div className=" p-lg-5 mx-auto my-5">
        <h1 className="display-4 font-weight-normal">
          "Folks are usually about as happy as they make up their minds to be"
        </h1>
        <h2 className="display-6">- Abraham Lincoln</h2>
      </div>
      <div className="my-4"></div>
    </>
  );
};
