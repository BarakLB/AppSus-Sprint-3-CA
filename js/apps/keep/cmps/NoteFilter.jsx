export class NoteFilter extends React.Component {
  state = {
    filterBy: {
      type: '',
    },
  };

  handleChange = (ev) => {
    const field = ev.target.name;
    const value = ev.target.value;
    this.setState(
      ({ filterBy }) => ({
        filterBy: { ...filterBy, [field]: value },
      }),
      () => {
        this.props.onSetFilter(this.state.filterBy);
      }
    );
  };

  onFilter = (ev) => {
    ev.preventDefault();
    this.props.onSetFilter(this.state.filterBy);
  };

  render() {
    return (
      <select
        className="filter-notes"
        name="type"
        value={this.state.filterBy.type}
        onChange={this.handleChange}
      >
        <option value="">All</option>
        <option value="NoteTodos">Todos</option>
        <option value="NoteText">Text</option>
        <option value="NoteImg">Image</option>
        <option value="NoteVideo">Video</option>
      </select>
    );
  }
}
