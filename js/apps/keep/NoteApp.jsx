import { noteService } from "./services/note.service.js";
import { NoteList } from './cmps/NoteList.jsx'
import { NoteAdd } from "./cmps/NoteAdd.jsx";
import { NoteFilter } from "./cmps/NoteFilter.jsx";

export class NoteApp extends React.Component {

    state = {
        notes: [],
        filterBy: {}
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        noteService.query(this.state.filterBy.type)
            .then(notes => {
                this.setState({ notes })
            })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadNotes)
    }

    removeNote = (noteId) => {
        noteService.deleteNote(noteId)
            .then(notes => {
                this.setState({ notes })
            })
    }

    styleNote = (noteId, color) => {
        noteService.updateColor(noteId, color)
            .then(notes => {
                this.setState({ notes })
            })
    }

    copyNote = (note, ev) => {
        ev.stopPropagation();
        noteService.copyNote(note)
            .then(notes => {
                this.setState({ notes })
            })
    }


    togglePinNote = (note) => {
        noteService.togglePinned(note)
            .then(notes => {
                this.setState({ notes })
                notes.filter((note) => {
                    return (!note.isPinned)
                })
            })
    }

    loadPinnedNotes(val) {
        const pinnedNotes = this.state.notes.filter(note => note.isPinned)
        const unPinnedNotes = this.state.notes.filter(note => !note.isPinned)
        return val ? pinnedNotes : unPinnedNotes
    }


    render() {
        const { notes } = this.state
        const pinnedNotes = this.loadPinnedNotes(true)
        const unPinnedNotes = this.loadPinnedNotes(false)
        if (!notes) return <div>Loading...</div>
        return (
            <section className="main-app-notes main-layout flex direction-column justify-center align-center">
                <NoteAdd notes={this.loadNotes} />
                <NoteFilter onSetFilter={this.onSetFilter} />
                <div className="pinned-notes"> <h1>Pinned-notes</h1><hr />
                    <NoteList notes={pinnedNotes} removeNote={this.removeNote} styleNote={this.styleNote} togglePinNote={this.togglePinNote} />
                </div>
                <div className="unPinned-notes"><h1>Unpinned-notes </h1><hr />
                    <NoteList notes={unPinnedNotes} removeNote={this.removeNote} styleNote={this.styleNote} togglePinNote={this.togglePinNote} />
                </div>
            </section>
        )
    }
}