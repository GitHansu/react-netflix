import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import Badge from "react-bootstrap/Button";

const MovieDetail = () => {
  const [movieInfo, setMovieInfo] = useState([]);
  const [movieReview, setMovieReview] = useState([]);
  const { id } = useParams();

  console.log("param", id);

  const getMovieDetail = async () => {
    let res = await api.get(`/movie/${id}?language=ko-KR`);
    setMovieInfo(res.data);
  };
  const getReviews = async () => {
    let res = await api.get(`/movie/${id}/reviews?language=en-US&page=1`);
    setMovieReview(res.data.results);
  };

  useEffect(() => {
    getMovieDetail();
    getReviews();
  }, []);

  // detail 데이터 받아오기
  // useEffect(() => {
  //   api.get(`/movie/${id}?language=ko-KR`).then((res) => {
  //     console.log("detail", res.data);
  //     setMovieInfo(res.data);
  //   });
  // }, [id]);

  // review 데이터 받아오기
  // useEffect(() => {
  //   api.get(`/movie/${id}/reviews?language=en-US&page=1`).then((res) => {
  //     console.log("review", res.data);
  //     setMovieReview(res.data.results);
  //   });
  // }, [id]);

  console.log("movieinfo", movieInfo);
  console.log("movieReview", movieReview);

  return (
    <div>
      {movieInfo ? (
        <div className="container movie-details">
          <div className="poster">
            <img
              src={`https://www.themoviedb.org/t/p/original${movieInfo.poster_path}`}
              alt="poster"
            />
          </div>
          <div className="info">
            <div className="genre">
              {movieInfo.genres ? (
                movieInfo.genres.map((item) => (
                  <Badge variant="danger" key={item.id}>
                    {item.name}
                  </Badge>
                ))
              ) : (
                <span>Loading genres...</span>
              )}
            </div>
            <h1>{movieInfo.title}</h1>
            <h4>{movieInfo.tagline}</h4>
            <div>
              <span>출시일 : {movieInfo.release_date} </span>
              <span>러닝타임 : {movieInfo.runtime}분 </span>
              <span>평점 : {movieInfo.vote_average}점 </span>
              <span>{movieInfo.adults ? "성인" : "청소년"}</span>
            </div>
            <div className="overview">{movieInfo.overview}</div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="container review-box">
        {movieReview.map((item) => (
          <div className="review-item">
            <h4>{item.author}</h4>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetail;
