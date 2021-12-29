import { mailService } from '../services/mail.service.js'
import { utilService } from '../../../services/util.service.js'
import {Loader} from '../../../cmps/Loader.jsx'

export class EmailDetails extends React.Component {
    state = {
        mail: null
    }

    componentDidMount() {
        this.loadMail()
    }

    loadMail = () => {
        const id = this.props.match.params.mailId;
        console.log(id)
        mailService.getMailById(id)
            .then(mail => {
                if (!mail) this.props.history.push('/')
                this.setState({ mail })
            })
    }


    render() {
        const { mail } = this.state
        if (!mail) return <Loader/>
        return <section className="mail-preview">
            <h3>Sent At: {utilService.handleTimestamp(mail.sentAt)}</h3>
            <h4>From: {mail.nickname}, {mail.from}</h4>
            <h1> {mail.subject}</h1>
            <p>{mail.body}</p>
        </section>
    }
}