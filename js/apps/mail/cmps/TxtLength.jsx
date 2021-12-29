export class TxtLength extends React.Component {
    state = {
      isFullyShown: false,
    };
  
    render() {
      const { isFullyShown } = this.state;
      const { text } = this.props;
      return (
        <section>
            <p>{isFullyShown ? text : text.slice(0, 40)}</p>
            {/* <button className="readmore-btn" onClick={() => this.setState({ isFullyShown: !isFullyShown })}>
              {isFullyShown ? '...Read Less' : '...Read More'}
            </button> */}
        </section>
      );
    }
  }