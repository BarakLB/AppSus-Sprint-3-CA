export class TxtLength extends React.Component {
    state = {
      isFullyShown: false,
    };
  
    render() {
      const { isFullyShown } = this.state;
      const { text } = this.props;
      return (
        <section>
            <p>{isFullyShown ? text : text.slice(0, 20)}</p>
        </section>
      );
    }
  }