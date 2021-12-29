export class NoteController extends React.Component {
    state = {
        type: 'text',
        placeHolder: 'Enter Your Text',
        input: '',
    }

    changeInputText = (ev) => {
        const inputType = ev.target.name;
        switch (inputType) {
            case 'text':
                this.setState({ placeHolder: 'Enter Your Text', type: 'text', input: '' })
                break;
            case 'video':
                this.setState({ placeHolder: 'Enter YouTube URL', type: 'video', input: '' })
                break;
            case 'photo':
                this.setState({ placeHolder: 'Enter Photo URL', type: 'photo', input: '' })
                break;
            case 'todo':
                this.setState({ placeHolder: 'Enter Tasks Seperated by comma', type: 'todo', input: '' })
                break;
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => ({ ...prevState, [field]: value }))
    }

    addNoteClick = () => {
        const { addNote } = this.props;
        if (!this.state.input.length) return
        addNote(this.state);
        this.setState({ input: '' })
        showUserMsg('Note added!', 'success')
    }

    render() {
        const { placeHolder, input } = this.state;
        
        return (
            <div className="add-note-container" flex align-center>
              <textarea name="input" value={input} onChange={this.handleChange} placeholder={placeHolder}></textarea>
                <button name="text" onClick={this.changeInputText}><i className="fas fa-font fa-2x"></i></button>
                <button name="video" onClick={this.changeInputText}><i className="fab fa-youtube fa-2x"></i></button>
                <button name="photo" onClick={this.changeInputText}><i className="fas fa-image fa-2x"></i></button>
                <button name="todo" onClick={this.changeInputText}><i className="fas fa-tasks fa-2x"></i></button>
                <button className="add-btn" name="add" onClick={this.addNoteClick}><i className="fas fa-plus fa-2x"></i></button>
            </div>
        )
    }
}