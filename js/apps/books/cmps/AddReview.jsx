import { booksService } from '../services/books.service.js';

export class AddReview extends React.Component {
    state = {
        fullName: null,
        text: null,
    };
    componentDidMount() {
        this.nameInput.focus();
    }

    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        this.setState((prevState) => ({ ...prevState, [field]: value }));
    };

    submitReview = (ev) => {
        ev.preventDefault();
        const {bookId} = this.props.match.params;
        booksService.createReview(this.state, bookId);
        this.props.history.push(`/book/${bookId}`);
    };
    render() {
        return (
            <section className="review-page">
            <form className="add-review-container" onSubmit={this.submitReview}>
                <input
                    type="text"
                    name="fullName"
                    ref={(input) => {
                        this.nameInput = input;
                    }}
                    placeholder="Enter Your Full Name"
                    onChange={this.handleChange}
                />
                <textarea
                    name="text"
                    cols="60"
                    rows="10"
                    placeholder="Enter Review"
                    onChange={this.handleChange}
                ></textarea>
                <button>Submit</button>
            </form>
            </section>
        );
    }
}


// export class ReviewAdd extends React.Component {
//     state = {
//         review: {
//             fullName: '',
//             rate: 0,
//             txt: '',
//             createdAt:'',
//         }
//     }


//     handleChange = ({ target }) => {
//         const field = target.name
//         const value = target.type === 'number' ? +target.value : target.value
//         this.setState((prevState) => ({ review: { ...prevState.review, [field]: value } }))
//     }


//     onSubmitReview = (ev) => {
//         ev.preventDefault()
//         const { bookId } = this.props
//         booksService.addReview(this.state.review, bookId)
//         this.cleanForm()
//     }


//     cleanForm = () => {
//         this.setState({ review: { fullName: '', rate: 0, txt: '' } })
//     }


//     render() {
//         const { bookId } = this.props.match.params

//         return <form className="review-form" type="submit">
//             <label>Enter full name: <input></input></label>
//             <div className="rating">
//                 <label>
//                     <input type="radio" name="stars" value="1" />
//                     <span className="icon">★</span>
//                 </label>
//                 <label>
//                     <input type="radio" name="stars" value="2" />
//                     <span className="icon">★</span>
//                     <span className="icon">★</span>
//                 </label>
//                 <label>
//                     <input type="radio" name="stars" value="3" />
//                     <span className="icon">★</span>
//                     <span className="icon">★</span>
//                     <span className="icon">★</span>
//                 </label>
//                 <label>
//                     <input type="radio" name="stars" value="4" />
//                     <span className="icon">★</span>
//                     <span className="icon">★</span>
//                     <span className="icon">★</span>
//                     <span className="icon">★</span>
//                 </label>
//                 <label>
//                     <input type="radio" name="stars" value="5" />
//                     <span className="icon">★</span>
//                     <span className="icon">★</span>
//                     <span className="icon">★</span>
//                     <span className="icon">★</span>
//                     <span className="icon">★</span>
//                 </label>
//             </div>
//             <label>Add Review:<textarea></textarea></label>
//             <button>Submit</button>
//         </form>
//     }
// }