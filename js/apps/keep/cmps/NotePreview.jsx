import { noteService } from '../services/note.service.js';

export class NotePreview extends React.Component {
  state = {
    note: null,
  };

  render() {
    const { note } = this.state;

    if (!note) return <div>Loading...</div>;
    return <article className="note-preview" id={note.id}></article>;
  }
}
