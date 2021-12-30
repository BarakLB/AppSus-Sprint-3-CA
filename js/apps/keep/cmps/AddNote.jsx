import { NoteDetails } from "./NoteDetails.jsx";

export class AddNote extends React.Component {
    state = {
        color: '#cccccc',
    }

    showModalRef = React.createRef();

    handleWindowClick = (ev) => {
        if (this.showModalRef.current && ev.target === this.showModalRef.current) {
            if (this.showModalRef.current) this.showModalRef.current.style.display = "none"
        }
    }

    handleColorChange = (color) => {
        this.setState({ color })
    }

    handleSubmit = (noteInfo) => {
        const { color } = this.state;
        this.props.onAddNote({ ...noteInfo, color }, () => this.setState({ color: '#cccccc' }))
    }

    render() {
        return (
            <section className="add-note">
                <button onClick={() => this.showModalRef.current.style.display = "block"} className="create-note-btn">Create Note</button>
                <div className="add-modal" ref={this.showModalRef} onMouseDown={this.handleWindowClick}>
                    <div className="modal-ctx" style={{ backgroundColor: this.state.color }}>
                    <NoteDetails
                            isNew={true}
                            handleSubmit={(noteInfo) => {
                                this.handleSubmit(noteInfo)
                                this.showModalRef.current.style.display = "none"
                            }}
                            handleColorChange={this.handleColorChange}
                        />
                    </div>
                </div>
            </section>
        )
    }
}