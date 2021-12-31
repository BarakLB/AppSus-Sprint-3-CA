export function NoteVideo({ note}) {
    return  <div className="note-video" style={note.style} >
        <iframe  width="100%" height="240" src={note.info.url} frameBorder="0" allowFullScreen ></iframe>
        <h2 contentEditable suppressContentEditableWarning={true}>{note.info.title}</h2>
        <i className="fab fa-youtube type"></i>
    </div>
}