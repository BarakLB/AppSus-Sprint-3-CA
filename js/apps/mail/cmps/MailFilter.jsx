export class MailFilter extends React.Component {

    state = {
        filterBy: {
            // status: '',
            txt: '',
            isRead: null,
            isStared: null,
        },
        sortBy: 'date'
    }

    onFilter = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState((prevState) => ({ ...prevState, filterBy: { ...prevState.filterBy, [field]: value } }))
         
    }

    onSort = (ev) => {
        const value = ev.target.value;
        console.log(value)
        this.setState((prevState) => ({ ...prevState, sortBy: value }));
    }

    render() {
        const { txt, currFilter } = this.state.filterBy;
        console.log(this.state)
        return <section className="flex justify-center">
            <div className="search-mail-container flex justify-center ">
                <label htmlFor="search"><i className="fas fa-search"></i>
                    <input className="search-input" type="text" id="search" placeholder="Search here..." name="txt" value={txt}
                        onChange={this.onFilter}></input>
                </label>
            </div>

            <div className="filter-mail-container">
                <label htmlFor="filter-by"><i className="fas fa-filter"></i> Filter by: </label>
                <select id="filter-by" name="isRead" value={currFilter} onChange={this.onFilter}>
                    <option value={null}>All</option>
                    <option value={true}>Read</option>
                    <option value={false}>Unread</option>
                </select>
                <label htmlFor="sort-by"><i className="fas fa-sort"></i> Sort by:</label>
                <select id="sort-by" name="sortBy" onChange={this.onSort}>
                    <option value="date">Date</option>
                    <option value="subject">Subject</option>
                </select>
            </div>

        </section>
    }
}