import { noteService } from '../services/note.service.js';
import { DynamicNoteType } from './DynamicNoteType.jsx';

export class NotePreview extends React.Component {
  state = {
    note: null,
  };

  componentDidMount(){
    const { note } = this.props;
    this.setState({ note });
    console.log(note);
  }

  render() {
    const { note } = this.state;

    if (!note) return <div>Loading...</div>;
    return <article className="note-preview flex justify-between direction-column" id={note.id}>
        <DynamicNoteType note={note} />
    </article>;
  }
}
