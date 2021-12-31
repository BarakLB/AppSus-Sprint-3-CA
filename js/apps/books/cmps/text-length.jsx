export class TextLength extends React.Component {
  state = {
    isFullyShown: false,
  };

  render() {
    const { isFullyShown } = this.state;
    const { text } = this.props;
    return (
      <section>
        <h3>Description:</h3>
        <div className="description">
          <p>{isFullyShown ? text : text.slice(0, 99)}</p>
          <button className="readmore-btn" onClick={() => this.setState({ isFullyShown: !isFullyShown })}>
            {isFullyShown ? '...Read Less' : '...Read More'}
          </button>
        </div>
      </section>
    );
  }
}