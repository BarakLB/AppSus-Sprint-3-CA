const { Link } = ReactRouterDOM


export function BookPreview({ book }) {
    const { title, thumbnail, listPrice, authors } = book
    function getCurrencySign() {
        var signs = ['$', '€', ' ₪ ']
        switch (listPrice.currencyCode) {
            case 'EUR':
                return signs[1];
            case 'USD':
                return signs[0];
            case 'ILS':
                return signs[2];
        }
    }

    // const {bookId} = this.props.match.params

    return  <Link to={`/book/${book.id}`}>
        <section className="book-card clean-link" >
       
        <img src={thumbnail} alt="" />
        <h2 className="card-title">Title: {title}</h2>
        <h3>Authors: {authors}</h3>
        <h3>Price: <span>{listPrice.amount} {getCurrencySign()}</span></h3>
        </section >
    </Link>
    
}