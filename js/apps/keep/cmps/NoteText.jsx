export function NoteText({ note }) {
    return (
        <div style={note.style} className="note-text flex direction-column align-center" contentEditable suppressContentEditableWarning={true} >
            <h2>{note.info.txt}</h2>
            <i className="fas fa-font type"></i>
        </div>
    )
}