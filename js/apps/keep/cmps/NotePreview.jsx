export function NotePreview({ note, removeNote, styleNote,togglePinNote }) {
    const colors = ['DarkSeaGreen', 'CornflowerBlue', 'LightSlateGray', 'LemonChiffon']
    return (
        <div className="manage-notes flex">
            <div className="change-color"><i className="fas fa-palette"></i>
                <div className="color-palette flex">
                    {colors.map((color, idx) =>
                        <div className={`circle single-color-${color}`} key={idx} onClick={() => { styleNote(note.id, color) }}></div>)}
                </div>
            </div>
            <i className="far fa-trash-alt" onClick={() => removeNote(note.id)}></i>
            <i className="fas fa-thumbtack" onClick={() => togglePinNote(note)}></i>
        </div>
    )

}