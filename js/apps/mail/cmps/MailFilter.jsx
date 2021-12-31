
export class MailFilter extends React.Component {

    state = {


        txt: '',
        isRead: 'all',
        sortBy: 'date',

    }

    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        this.setState((prevState) => ({ ...prevState, [field]: value }), () => {
            console.log(this.state)
            const { txt, isRead, sortBy } = this.state;
            this.props.onFilter(txt, isRead);
            this.props.onSort(sortBy);
        }
        );
    };



    render() {
        const { txt, isRead, sortBy } = this.state;
    
     
        return <section className="top-search flex justify-center">
            <div className="search-mail-container flex justify-center ">
                <label htmlFor="search"><i className="fas fa-search"></i>
                    <input className="search-input" type="text" id="search" placeholder="Search here..." name="txt" value={txt}
                        onChange={this.handleChange}></input>
                </label>
            </div>

            <div className="filter-mail-container">
                <label htmlFor="filter-by"><i className="fas fa-filter"></i> Filter by: </label>
                <select id="filter-by" name="isRead" value={isRead} onChange={this.handleChange}>
                    <option value={'all'}>All</option>
                    <option value={true}>Read</option>
                    <option value={'false'}>Unread</option>
                </select>
                <label htmlFor="sort-by"><i className="fas fa-sort"></i> Sort by:</label>
                <select id="sort-by" value={sortBy} name="sortBy" onChange={this.handleChange}>
                    <option value="date">Date</option>
                    <option value="subject">Subject</option>
                </select>
            </div>

        </section>
    }
}