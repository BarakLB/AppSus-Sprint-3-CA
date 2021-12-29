export class MailFilter extends React.Component {

    state = {
        filterBy: {
            txt: '',
            currFilter: '',
        },
        sortBy: 'Date'
    }

    onFilter = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState((prevState) => ({ ...prevState, filterBy: { ...prevState.filterBy, [field]: value } }))
    }

    onSort = (ev) => {
        const value = ev.target.value;
        this.setState((prevState) => ({ ...prevState, sortBy: value }),
            () => { this.onSort() });
    }

    render() {
        const { txt, currFilter } = this.state.filterBy;
        console.log(txt)
        console.log('curr', currFilter)
        return <section className="flex justify-center">
            <div className="search-mail-container flex justify-center ">
                <label htmlFor="search"><i className="fas fa-search"></i>
                    <input className="search-input" type="text" id="search" placeholder="Search here..." name="txt" value={txt}
                        onChange={this.onFilter}></input>
                </label>
            </div>

            <div className="filter-mail-container">
                <label htmlFor="filter-by"><i className="fas fa-filter"></i> Filter by: </label>
                <select id="filter-by" name="currFilter" value={currFilter} onChange={this.onFilter}>
                    <option value="all" >All</option>
                    <option value="read">Read</option>
                    <option value="unread">Unread</option>
                </select>
                <label htmlFor="sort-by"><i className="fas fa-sort"></i> Sort by:</label>
                <select id="sort-by" name="sortBy" onChange={this.onSort}>
                    <option value="date">Date</option>
                </select>
            </div>

        </section>
    }
}