import React from "react";

const MovieReview = ({ review }) => {
  return (
    <div className="review-item">
      {review
        ? review.map((item) => (
            <>
              <h4>{item.author}</h4>
              <p>{item.content}</p>
            </>
          ))
        : ""}
    </div>
  );
};

export default MovieReview;
