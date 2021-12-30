import { noteService } from './services/note.service.js';
import { NoteList } from './cmps/NoteList.jsx'
import { NoteFilter } from './cmps/NoteFilter.jsx';
import { AddNote } from './cmps/AddNote.jsx';

export class NoteApp extends React.Component {
  state = {
    notes: [],
    filterBy: {
      type: 'all',
      txt: '',
    }
  };

  componentDidMount() {
    this.loadNotes();
  }

  loadNotes = (filterBy) => {
    noteService.getPinnedNotes().then(pinnedNotes => {
        this.setState({ pinnedNotes })
    })
    noteService.query(filterBy).then(notes => {
        this.setState({ notes })
    })
}

  onAddNote = (note, onSuccess) => {
    noteService.addNote(note).then(() => {
        this.loadNotes()
        onSuccess && onSuccess()
    })
}
  onFilterChange = (filterBy) => {
    this.setState({ filterBy }, () => this.loadNotes)
  }

  render() {
    const { notes } = this.state;
    if (!this.state.notes.length)
      return <p>There are no notes to be shown...</p>;
    return (
      <section className="note-app main-layout">
        <NoteFilter loadNotes={this.loadNotes} />
        <AddNote onAddNote={this.onAddNote} />
        <NoteList notes={notes} />
      </section>
    );
  }
}
