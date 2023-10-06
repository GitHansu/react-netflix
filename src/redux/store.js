import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import movieReducer from "./reducers/movieSlice";
import logger from "redux-logger";

/*
    Store : state, reducer, 내장함수 등을 관리하는 역할
            하나의 어플리케이션에 하나의 Store만 생성

    configureStore() : store를 생성하는 함수

    react middleware : action과 reducer 사이에 특정 함수를 실행하는 중간 처리기
*/

export default configureStore({
  reducer: {
    movie: movieReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
