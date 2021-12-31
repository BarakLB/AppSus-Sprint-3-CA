import { utilService } from "../services/util.service.js"
import { booksService } from "../services/books.service.js"
import { TextLength } from "../cmps/text-length.jsx"
import { AddReview } from "../cmps/AddReview.jsx"
import { Loader } from "../cmps/Loader.jsx"
import { BookReview, BookReviews } from "../cmps/BookReviews.jsx"



export class BookDetails extends React.Component {





    state = {
        book: null
    }

    componentDidMount() {
        const id = this.props.match.params.bookId;
        console.log(id)
        booksService.getBookById(id).then((res) => {
            this.setState({ book: res });
        });
    }


    //   loadBook  = () => {

    //   }

    onGoBack = () => {
        this.props.history.push('/book')
    }
    render() {
        const { book } = this.state
        // console.log(this.state)
        // const { title, subtitle, authors, publishedDate, description, pageCount, categories,
        // thumbnail, listPrice } = this.state.book

        if (!book) return <Loader />
        return <section className="book-details main-layout">
            <button className="x" onClick={this.onGoBack}>X</button>
            <img src={book.thumbnail} alt="" />
            <h1>{book.title}</h1>
            <h3>{book.subtitle}</h3>
            <h3>Authors: {book.authors}</h3>
            <h3>Published At: {utilService.publishDateTxt(book)}</h3>
            <h3 className={utilService.classNameByPrice(book)}>
                Price: {book.listPrice.amount + ' '}
                {utilService.getCurrencySymbol(book.listPrice.currencyCode) + ' '}
                <span className={utilService.checkOnSale(book)}> {utilService.checkOnSale(book)} </span></h3>
            <TextLength text={book.description + utilService.makeLorem()} />
            <h3>Categories:</h3>
            <h3>{book.categories.map((item, idx) => <span key={idx}>{item} </span>)}</h3>
            <h3>Number of Pages: {utilService.pageCountTxt(book)}</h3>
            <BookReviews book={book} />
            <button className="go-back-btn" onClick={this.onGoBack}>Go Back →</button>

        </section>
    }
}
