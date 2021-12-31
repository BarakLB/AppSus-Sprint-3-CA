const {Link} = ReactRouterDOM
import { ReviewDetails } from './ReviewDetails.jsx';
import { AddReview } from './AddReview.jsx';


export class BookReviews extends React.Component {
  state = {
    reviews: null,
    isReviewShown: false,
  };
  componentDidMount() {
    const { book } = this.props;
    this.setState({
      reviews: book.reviews,
    });
  }

  render() {
    const { isReviewShown, reviews } = this.state;
    const { book } = this.props;
    return (
      <div className="reviews-container">
        {reviews && <ReviewDetails reviews={reviews} />}
        {isReviewShown && <AddReview id={book.id} />}
        <Link className="add-reviews-btn" to={`/book/addReview/${book.id}`}>Add Review</Link>
      </div>
      
    );
  }
}