import React, { useEffect, useState } from "react";
import api from "../api";
import { MovieReducerActions } from "../redux/reducers/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/Banner";
import MovieSlide from "../components/MovieSlide";
import Loading from "../components/Loading";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  // movieSlice (store) 에서 값을 가져오기
  const popularSelector = useSelector((state) => state.movie.popularMovies);
  const topRateSelector = useSelector((state) => state.movie.topRatedMovies);
  const upComingSelector = useSelector((state) => state.movie.upComingMovies);

  //3가지 종류의 영화목록을 묶어서 요청하는 함수
  const getMovieList = async () => {
    setIsLoading(true);
    const popularList = api.get("/movie/popular?language=ko-KR&page=1");
    const topRatedList = api.get("/movie/top_rated?language=ko-KR&page=1");
    const upComingList = api.get("/movie/upcoming?language=ko-KR&page=1");
    const genreList = api.get("/genre/movie/list?language=ko-KR");

    const [popular, topRated, upComing, genre] = await Promise.all([
      popularList,
      topRatedList,
      upComingList,
      genreList,
    ]);
    // 로딩 완료 시점
    setIsLoading(false);

    console.log("popular", popular.data);
    console.log("topRated", topRated.data);
    console.log("upComing", upComing.data);
    console.log("genre", genre.data);

    //
    dispatch(
      MovieReducerActions.initData({
        popular: popular.data,
        topRated: topRated.data,
        upComing: upComing.data,
        genre: genre.data,
      })
    );
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Banner movie={popularSelector[0]} />
          <h1>인기있는 영화</h1>
          <MovieSlide movies={popularSelector} />
          <h1>평점높은 영화</h1>
          <MovieSlide movies={topRateSelector} />
          <h1>개봉예정 영화</h1>
          <MovieSlide movies={upComingSelector} />
        </>
      )}
    </div>
  );
};

export default Home;
