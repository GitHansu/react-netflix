import React from "react";
import { UseSelector } from "react-redux";

const Banner = ({ movie }) => {
  const div_style = {
    backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movie.poster_path})`,
  };

  return (
    <div style={div_style} className="banner">
      <div className="banner-info">
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
};

export default Banner;
