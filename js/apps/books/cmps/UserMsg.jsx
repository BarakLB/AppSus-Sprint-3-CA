import { eventBus } from "../services/event-bus.service.js"

export class UserMsg extends React.Component{

    state = {
        msg: null,
        
    }
    removeEventBus = null;
    timoutId = null;

    componentDidMount() {
       this.removeEventBus = eventBus.on('user-msg', (msg) => {
           clearTimeout(this.timoutId)
            this.setState({msg}, this.onAutoClose)
        })
    }

    onAutoClose = () => {
        this.timoutId = setTimeout(() => {
            this.setState({msg:null})
        }, 2000)

    }
    
onCloseMsg = () => {
    clearTimeout(this.timoutId)
    this.setState({msg:null})
}

    componentWillUnmount() {
        this.removeEventBus();
    }

    render() {
        const { msg } = this.state

        if (!msg) return <React.Fragment></React.Fragment>
        return (<div className={`user-msg ${msg.type}`}>
            <h2>{msg.txt}</h2>
        </div>)
    }
}
