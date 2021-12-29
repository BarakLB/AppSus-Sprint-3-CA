import { NotePreview } from './NotePreview.jsx';

export function NoteList({ notes }) {
  return (
    <section className="note-list">
      <h2>Pinned Notes</h2>
      <div className="pinned-notes"></div>
      <h2>Day-To-Day Notes</h2>
      <div className="daily-notes">
        {notes.map((note) => (
          <NotePreview key={note.id} note={note} />
        ))}
      </div>
    </section>
  );
}
