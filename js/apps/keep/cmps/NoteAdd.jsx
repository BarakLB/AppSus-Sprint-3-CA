import { noteService } from '../services/note.service.js'

export class NoteAdd extends React.Component {

    state = {
        note: {
            type: 'NoteText',
            isPinned: true,
            info: {},
            style: {
                backgroundColor: "#618685"
            }
        },
        inputText: '',

        placeholder: 'Write yourself a note',
    }

    refInput = React.createRef();

    handleChooseType = (noteType) => {
        const note = { ...this.state.note }
        let placeholder;
        note.type = noteType;
        switch (noteType) {
            case 'NoteText':
                placeholder = 'Write yourself a note'
                break;
            case 'NoteImg':
                placeholder = 'Enter image URL...'
                break;
            case 'NoteVideo':
                placeholder = 'Enter video URL...'
                break;
            case 'NoteTodos':
                placeholder = 'Enter comma separated list...'
                break;
        }
        this.setState({ note, inputText: '', placeholder })
    }

    handleChangeInput = (ev) => {
        ev.preventDefault();
        const note = { ...this.state.note };
        const inputText = ev.target.value;
        switch (note.type) {
            case 'NoteText':
                note.info = { txt: inputText }
                break;
            case 'NoteImg':
            case 'NoteVideo':
                note.info = { url: inputText, title: '' }
                break;
            case 'NoteTodos':
                const todosTxts = inputText.split(',')
                const todos = todosTxts.map(todoTxt => { return { txt: todoTxt } })
                note.info = { todos };
                break;

        }

        this.setState({ note, inputText: inputText });
    };

    saveNote = (ev) => {
        ev.preventDefault();
        const { note, inputText } = this.state
        if (!inputText) return
        if (note.type === 'NoteVideo') {
            note.info.url = note.info.url.replace('watch?v=', 'embed/');
        }
        noteService.saveNote(note)
            .then(note => {
                this.props.notes()
                this.setState({
                    note: {
                        isPinned: true,
                        type: note.type,
                        info: {}
                    },
                    inputText: '',
                    style: {
                        backgroundColor: "#618685"
                    }
                })
            })
    };

    render() {
        const { note, inputText, placeholder } = this.state
        return (
            <div className="add-note flex ">
                <form className="note-input flex" onSubmit={this.saveNote}>
                    <input value={inputText} name="inputText" ref={this.refInput}
                        type="text" placeholder={placeholder}
                        onChange={this.handleChangeInput} required />
                </form>
                <div className="choose-type-buttons flex ">
                    <button className={`${(note.type === 'NoteText') && 'active'}`} onClick={() => { this.handleChooseType('NoteText') }}><i className="fas fa-font"></i></button>
                    <button className={`${(note.type === 'NoteTodos') && 'active'}`} onClick={() => { this.handleChooseType('NoteTodos') }}><i className="fas fa-list"></i></button>
                    <button className={`${(note.type === 'NoteImg') && 'active'}`} onClick={() => { this.handleChooseType('NoteImg') }}><i className="fas fa-image"></i></button>
                    <button className={`${(note.type === 'NoteVideo') && 'active'}`} onClick={() => { this.handleChooseType('NoteVideo') }}><i className="fab fa-youtube"></i></button>
                </div>
            </div>
        )
    }
}