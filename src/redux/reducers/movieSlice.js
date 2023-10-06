import { createSlice } from "@reduxjs/toolkit";

// createSlice() : state, reducer를 정의하는 함수
// - state 초기화
// - state를 변경하는 함수 정의 -> reducer

// name : reducer의 특정이름을 정의하는 속성
// initialState : state를 초기화하는 속성
// reducers : 컴포넌트에서 state 변경요청 시 수행하는 Action 기능을 정의하는 속성

export const movieSlice = createSlice({
  name: "movie",
  initialState: {
    popularMovies: [],
    topRatedMovies: [],
    upComingMovies: [],
    genreList: [],
  },
  reducers: {
    initData: (state, action) => {
      console.log("movie/initData", action);

      let { payload } = action; // 구조분해를 통해 payload 속성값만 접근

      console.log("[movieslice]", payload);

      state.popularMovies = payload.popular.results;
      state.topRatedMovies = payload.topRated.results;
      state.upComingMovies = payload.upComing.results;
      state.genreList = payload.genre.genres;
    },
    // reducer 함수 정의 시 , 매개변수에 반드시 state 정의
    // 정의한 state는 initialState에 접근할 수 있음
    // action -> {type, payload} 형태로 반환
    // type : 명령 타입 ex)숫자를 증가해라(increment), 숫자를 감소해라(decrement)
    // payload : 외부로부터 넘겨받은 데이터를 저장하는 속성
  },
});

// 컴포넌트에서 reducer 함수를 실행할 수 있게 내보내기
// export const { increment, decrement, increment2, incrementByAmount } =
//   counterSlice.actions;
export const MovieReducerActions = movieSlice.actions;

// store에서 접근할 수 있도록 내보내기
export default movieSlice.reducer;
