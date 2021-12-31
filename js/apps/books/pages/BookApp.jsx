import { booksService } from '../services/books.service.js'
import { eventBus } from '../services/event-bus.service.js'
// import { Loader } from '../cmps/Loader.jsx'
import { BookFilter } from '../cmps/book-filter.jsx'
import { BookList } from '../cmps/book-list.jsx'
import { AddBook } from '../cmps/AddBook.jsx'
import { BookDetails } from './book-details.jsx'
import { UserMsg } from "./UserMsg.jsx";



export class BookApp extends React.Component {
    state = {
        books: [],
        filterBy: null,

    }

    componentDidMount() {
        this.loadBooks()
    }

    loadBooks = () => {
        const { filterBy } = this.state
        booksService.query(filterBy).then(books => {
            this.setState({ books })
        })
    }


    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadBooks);

    };


onAddBook = (book)=> {
    console.log('im adding')
    booksService.addBook(book).then(this.loadBooks)
    eventBus.emit('user-msg', {txt:'Book Added', type:'success'})
}

    render() {
        const { books } = this.state
        return (
            <section className="books-app">
                <AddBook onAdd={this.onAddBook}/>
                <BookFilter onSetFilter={this.onSetFilter} />
                <BookList books={books} />
            </section>
        )
    }
}