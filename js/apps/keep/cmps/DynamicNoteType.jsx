export function DynamicNoteType({note}) {
    if (!note || note && !note.info) return null;

    return (
        <section className="note-container">
            {note.info.video && <iframe src={note.info.video} width="100%"  height="315"></iframe>}
            {note.info.img && <img src={note.info.img}/>}
                <div className="note-ctx">
                    {note.info.header && <h4>{note.info.header}</h4>}
                    <p>{note.info.txt}</p>
                </div>

                    <ul>
                        {note.info.todos && note.info.todos.map((todo, idx) => {
                            return <li key={idx}>{todo.txt}</li>
                        })}
                    </ul>
        </section>
    )
}