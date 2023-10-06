import React, { useState } from "react";
import Badge from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  // genre 불러오기
  const genreSelector = useSelector((state) => state.movie.genreList);

  // detail 페이지로 이동
  const goToDetail = () => {
    navigate(`/movies/${movie.id}`);
  };

  const [isHover, setIsHover] = useState(false);
  const handleMouseOver = () => {
    setIsHover(true);
  };

  const handleMouseOut = () => {
    setIsHover(false);
  };

  return (
    <div
      onClick={goToDetail}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className="movie-card"
      key={movie.id}
      style={{
        height: "200px",
        width: "350px",
        backgroundImage: `url(https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${movie.backdrop_path})`,
      }}
    >
      <div className="overlay">
        <h2 style={{ marginLeft: "10px", marginTop: "30px" }}>{movie.title}</h2>
        <br></br>
        <div>
          {movie.genre_ids.map((id) => {
            // find 일치한 정보들 중 첫번쨰 요소만 반환하는 함수
            const genre = genreSelector.find((item) => item.id === id);
            if (genre) {
              return (
                <Badge
                  variant="danger"
                  style={{ marginLeft: "10px", marginBottom: "50px" }}
                  key={id}
                >
                  {genre.name}
                </Badge>
              );
            }
            return null;
          })}
        </div>
        <span
          style={{ marginLeft: "10px" }}
        >{`평점 : ${movie.vote_average}점`}</span>
        <span style={{ marginLeft: "10px" }}>|</span>
        <span style={{ marginLeft: "10px" }}>
          {movie.adult ? "성인" : "청소년"}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
