import { NoteTodos } from "./NoteTodos.jsx";
import { NoteText } from "./NoteText.jsx";
import { NoteImg } from "./NoteImg.jsx";
import { NoteVideo } from "./NoteVideo.jsx";

export function DynamicNoteCmp({ note }) {

    switch (note.type) {
        case 'NoteText':
            return <NoteText note={note}  />
        case 'NoteTodos':
            return <NoteTodos note={note}  />
        case 'NoteImg':
            return <NoteImg note={note}  />
        case 'NoteVideo':
            return <NoteVideo note={note}  />
    }
    return <div>nothing inside...</div>
}