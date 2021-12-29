import { noteService } from './services/note.service.js';
import { NoteList } from './cmps/NoteList.jsx'
import { NoteFilter } from './cmps/NoteFilter.jsx';

export class NoteApp extends React.Component {
  state = {
    notes: [],
    filterBy: {
      type: 'all',
    }
  };

  componentDidMount() {
    this.loadNotes();
  }

  loadNotes = () => {
    noteService.query().then((notes) => {
      this.setState({ notes });
    });
  };

  onAddNote = (note, callback) => {
    NoteService.addNote(note).then(() => {
        this.loadNotes()
        callback && callback()
    })
}
  onFilterChange = (filterBy) => {
    this.setState({ filterBy }, () => this.loadNotes)
  }

  render() {
    const { notes } = this.state;
    if (!this.state.notes.length)
      return <p>There are no notes to be shown...</p>;
    console.log(notes);
    return (
      <section className="note-app">
        <NoteFilter />
        <NoteList notes={notes} />
      </section>
    );
  }
}
