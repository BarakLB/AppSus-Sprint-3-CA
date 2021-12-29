import { noteService } from './services/note.service.js';

export class NoteApp extends React.Component {
  state = {
    notes: [],
  };

  componentDidMount() {
    this.loadNotes();
  }

  loadNotes = () => {
    noteService.query().then((notes) => {
      this.setState({ notes });
    });
  };

  render() {
    const { notes } = this.state;
    if (!this.state.notes.length)
      return <p>There are no notes to be shown...</p>;
    console.log(notes);
    return (
      <section className="note-app">
        <NoteList notes={notes} />
      </section>
    );
  }
}
