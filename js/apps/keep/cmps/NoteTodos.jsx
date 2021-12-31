export function NoteTodos({ note }) {
    return (
        <div className="note-todos" style={note.style}  >
            {note.info.todos.map((todo, idx) =>
                <div key={idx} className="" >
                    <li contentEditable suppressContentEditableWarning={true}>{todo.txt}</li>
                </div>
                )}
            <i className="fas fa-list type"></i>
        </div>
    )
}