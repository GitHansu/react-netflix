import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Dropdown from "react-bootstrap/Dropdown";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";

const Movies = () => {
  // movieSlice (store) 에서 값을 가져오기
  const popularSelector = useSelector((state) => state.movie.popularMovies);
  const popular = [...popularSelector];
  const [filterPopular, setFilterPopular] = useState(popular);

  console.log("popop", popular);
  console.log("moviecard selector", popularSelector);

  // 제목별 정렬 내림차순, 오름차순
  const titleDown = () => {
    const newPopular = popular.sort((a, b) =>
      b.title.toLowerCase() < a.title.toLowerCase() ? -1 : 1
    );
    setFilterPopular(newPopular);
  };
  const titleUp = () => {
    const newPopular = popular.sort((a, b) =>
      a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1
    );
    setFilterPopular(newPopular);
  };

  // 평점별 정렬 내림차순, 오름차순
  const avgDown = () => {
    let newPopular = popular.sort((a, b) => b.vote_average - a.vote_average);
    setFilterPopular(newPopular);
  };
  const avgUp = () => {
    let newPopular = popular.sort((a, b) => a.vote_average - b.vote_average);
    setFilterPopular(newPopular);
  };

  // 인기도별 정렬 내림차순, 오름차순
  const popularDown = () => {
    let newPopular = popular.sort((a, b) => b.popularity - a.popularity);
    setFilterPopular(newPopular);
  };
  const popularUp = () => {
    let newPopular = popular.sort((a, b) => a.popularity - b.popularity);
    setFilterPopular(newPopular);
  };

  // const movieSorted = (keyword, sortMethod) => {
  //   let list = [...filterPopular];

  //   if (keyword === "평점") {
  //     result =
  //       sortMethod === "asc"
  //         ? list.sort((a, b) => a.vote_average - b.vote_average)
  //         : list.sort((a, b) => b.vote_average - a.vote_average);
  //   }

  //   let result = filter.sort((a, b) => a.vote_average - b.vote_average);
  //   setFilterPopular(result);
  // };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>인기 영화 필터링</h1>
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <div>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>인기영화 필터링</Accordion.Header>
                  <Accordion.Body style={{ backgroundColor: "black" }}>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="outline-danger"
                        id="dropdown-basic"
                      >
                        정렬방식을 선택하세요
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={titleUp}>
                          제목 오름차순
                        </Dropdown.Item>
                        <Dropdown.Item onClick={titleDown}>
                          제목 내림차순
                        </Dropdown.Item>
                        <Dropdown.Item onClick={avgUp}>
                          평점 오름차순
                        </Dropdown.Item>
                        <Dropdown.Item onClick={avgDown}>
                          평점 내림차순
                        </Dropdown.Item>
                        <Dropdown.Item onClick={popularUp}>
                          인기도 오름차순
                        </Dropdown.Item>
                        <Dropdown.Item onClick={popularDown}>
                          인기도 내림차순
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </Col>
          <Col sm={9} className="movie-card-list">
            {filterPopular.map((item) => (
              <Card
                key={item.id}
                style={{ width: "13rem", marginBottom: "20px" }}
              >
                <Card.Img
                  variant="top"
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`}
                />
                <Card.Body>
                  <Card.Text style={{ textAlign: "center" }}>
                    <span>{item.title}</span> <br />
                    <br />
                    <span> {item.release_date}</span>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Movies;
