import { booksService } from "../services/books.service.js";
import { GoogleBookList } from "./GoogleBookList.jsx";

export class AddBook extends React.Component {

    state = {
        title: null,
        googleBooks: [],
    }

// bookTitle = React.createRef()

 

    handleChange = ({ target }) => {
        
        const field = target.name;
        const value = target.value;
        this.setState((prevState) => ({ ...prevState, [field]: value }));
        booksService.getGoogleBooks(this.state.title).then((books)=> 
        this.setState({googleBooks: books.items}))
        
      
        
    };

    render() {
        console.log(this.state.title)
        return <section className="add-book-container">
            <label>Search book by Google API:
                <input type="text"
                    name="title"

                    placeholder="Enter Book Title"
                    onChange={this.handleChange}
                >
                </input>
            </label>
           <GoogleBookList books={this.state.googleBooks} onAdd={this.props.onAdd}/>

        </section>
    }
}