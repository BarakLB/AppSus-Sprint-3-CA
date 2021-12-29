export function DynamicNoteType({note}) {
    if (!note || note && !note.info) return null;

    return (
        <section className="note-container">
            {note.info.video && <iframe src={note.info.video} width="100%"  height="200" />}
            {note.info.url && <img src={note.info.url}/>}
                <div className="note-ctx">
                    {note.info.title && <h4>{note.info.title}</h4>}
                    <p>{note.info.txt}</p>
                </div>

                    <ul>
                        {note.info.todo && note.info.todo.map((todo) => {
                            return <li key={todo.id}>{todo.txt}</li>
                        })}
                    </ul>
        </section>
    )
}