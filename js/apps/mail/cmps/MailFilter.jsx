
export class MailFilter extends React.Component {

    state = {
        txt: '',
        sortBy: 'date',
    }

    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        this.setState((prevState) => ({ ...prevState, [field]: value }), () => {
            const { txt, sortBy } = this.state;
            this.props.onFilter(txt);
            this.props.onSort(sortBy);
        }
        );
    };



    render() {
        const { txt, sortBy } = this.state;
        return <section className="top-search flex justify-center">
            <div className="search-mail-container flex justify-center ">
                <label htmlFor="search"><i className="fas fa-search"></i>
                    <input className="search-input" type="text" id="search" placeholder="Search here..." name="txt" value={txt}
                        onChange={this.handleChange}></input>
                </label>
            </div>

            <div className="filter-mail-container">
                <label htmlFor="sort-by"><i className="fas fa-sort"></i> Sort by:</label>
                <select id="sort-by" value={sortBy} name="sortBy" onChange={this.handleChange}>
                    <option value="date">Date</option>
                    <option value="subject">Subject</option>
                </select>
            </div>

        </section>
    }
}