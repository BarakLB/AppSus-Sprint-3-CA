import {BookPreview} from './book-preview.jsx'

export function BookList({books}) {

    return (
        <section className="book-list main-layout">
            {books.map(book => <BookPreview key={book.id} book={book} />)}
        </section>
    )

}