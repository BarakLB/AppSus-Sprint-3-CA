import { noteService } from '../services/note.service.js';
import { DynamicColor } from './DynamicColor.jsx';

export class NoteDetails extends React.Component {
  state = {
    img: '',
    video: '',
    header: '',
    txt: '',
    todos: [],
    newTodoValue: '',
  };

  imageRef = React.createRef();
  videoRef = React.createRef();
  newTodoRef = React.createRef();

  componentDidMount() {
    if (!this.props.isNew) {
      this.loadNote();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isNew) return;
    if (prevProps.note !== this.props.note) {
      this.loadNote();
      return;
    }
    const todosProps = prevProps.note.info.todos;
    if (todosProps.length !== prevState.todos.length) {
      this.setState({ todos: [...todosProps] });
    }
  }

  loadNote = () => {
    if (this.props.note) this.setState({ ...this.props.note.info });
  };

  handleImgChange = () => {
    const img = new FileReader();
    img.readAsDataURL(this.imgRef.current.files[0]);
    img.onloadend = () => {
      this.vidRef.current.value = '';
      this.setState({ img: img.result, video: null });
    };
  };

  handleTodoChange = ({ target }) => {
    const field = target.name;
    // const value = target.value;
    const todos = ['check1'];
    this.setState((prevState) => ({ ...prevState, [field]: todos }));
  };

  onAddTodo = () => {
    const { newTodo } = this.state;
    if (!newTodo) return;
    if (this.props.isNew) {
      noteService.addNewNoteTodo(newTodo).then((todo) => {
        this.setState({ todos: [...this.state.todos, todo] });
      });
    } else {
      noteService.addTodo(this.props.note.id, newTodo);
    }
    this.newTodoRef.current.value = '';
    this.setState({ newTodo: '' });
  };

  handleChange = ({ target: { name, value } }) => {
    if (name === 'video') {
      const embedUrl = noteService.getEmbedUrl(value);
      if (!embedUrl) return;
      const embedVideo = '//www.youtube.com/embed/' + embedUrl;
      this.imageRef.current.value = '';
      this.setState({ video: embedVideo, img: null });
      return;
    }
  };

  handleTextChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState((prevState) => ({ ...prevState, [field]: value }));
  };

  handleSubmit = () => {
    const { img, video, header, txt, todos } = this.state;
    const noteInfo = { img, video, header, txt, todos };
    this.props.handleSubmit(noteInfo);
    this.setState({
      img: '',
      video: '',
      title: '',
      txt: '',
      todos: [],
      newTodoValue: '',
    });
  };

  handleRemoveTodo = (todoId) => {
    const { todos } = this.state;
    const newTodos = todos.filter((todo) => todo.id !== todoId);

    noteService.removeTodo(this.props.note.id, todoId).then(() => {
      this.setState({ todos: newTodos });
    });
  };

  render() {
    const { img, video, header, txt, todos } = this.state;
    console.log(this.state);
    return (
      <div className="note-details-container">
        <div className="note-details-img-container">
          {img && <img src={img} />}
        </div>
        <div className="note-details-img-icon">
          <span>Upload Image</span>{' '}
          <button
            className="icon-button"
            onClick={() => this.imageRef.current.click()}
          >
            <i className="fas fa-upload"></i>
          </button>
        </div>
        <input
          type="file"
          className="note-details-img-input"
          id="edit-image"
          ref={this.imageRef}
          onChange={this.handleChangeFile}
        />

        <input
          type="text"
          ref={this.vidRef}
          name="video"
          placeholder="Youtube Url"
          onChange={this.handleChange}
        />
        {video && <iframe src={video} width="100%" height="200" />}

        <input
          type="text"
          name="header"
          placeholder="Note Header"
          onChange={this.handleTextChange}
          value={header}
        />
        <textarea
          name="txt"
          placeholder="Note Content"
          onChange={this.handleTextChange}
          value={txt}
        />
        {todos.map((todo) => (
          <div key={todo.id} className="note-details-todo-container">
            <div>{todo.txt}</div>
            <button
              className="icon-button"
              onClick={() => this.handleRemoveTodo(todo.id)}
            >
              <i className="far fa-times-circle"></i>
            </button>
          </div>
        ))}
        <div className="note-details-todo-container">
          <input
            ref={this.todoRef}
            type="text"
            name="todos"
            placeholder="Add Todo"
            onChange={this.handleTodoChange}
          />
          <button className="icon-button" onClick={() => this.onAddTodo()}>
            <i className="fas fa-plus-circle"></i>
          </button>
        </div>

        {this.props.isNew && (
          <DynamicColor handleColorChange={this.props.handleColorChange} />
        )}
        <button className="main-button" onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}
