export function NoteImg({ note }) {
    return (
        <div  className="note-img flex direction-column align-center" style={note.style}>
            <img src={note.info.url} alt="img" />
            <h2 contentEditable suppressContentEditableWarning={true}>{note.info.title}</h2>
            <i className="fas fa-image type"></i>
        </div>
    )
}