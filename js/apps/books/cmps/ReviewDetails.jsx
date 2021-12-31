export function ReviewDetails(props) {
    const { reviews } = props;
    return (
      <React.Fragment>
        {reviews.map((review) => {
          return (
            <div className="review" key={review.id}>
              <h4>Name: {review.fullName}</h4>
              <p>Review: {review.text}</p>
              <p>Time: {review.date}</p>
            </div>
          );
        })}
      </React.Fragment>
    );
  }