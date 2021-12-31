export function GoogleBookList({ books, onAdd }) {
    // console.log('ass', books)


    if (!books.length) return <p>No Books Found</p>


    return <ul className="search-results">
        {books.map((book) => {
            // console.log('in map', book)
            return <li key={book.id} onClick={()=> onAdd(book)}>{book.volumeInfo.title} <img src="../assets/img/plus-button.png"/></li>
        })}
    </ul>


}