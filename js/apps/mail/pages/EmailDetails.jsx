import { mailService } from '../services/mail.service.js'
import { utilService } from '../../../services/util.service.js'
import { Loader } from '../../../cmps/Loader.jsx'

const {Link} = ReactRouterDOM 

export class EmailDetails extends React.Component {
    state = {
        mail: null
    }

    componentDidMount() {
        this.loadMail()
        
    }

    loadMail = () => {
        const id = this.props.match.params.mailId;
        mailService.getMailById(id)
            .then(mail => {
                if (!mail) this.props.history.push('/')
                this.setState({ mail })
            })
    }


    render() {
        const { mail } = this.state
        
        if (!mail) return <Loader />
        return <section className="mail-details flex direction-column">

            <Link className="clean-link back-to-mails" to="/mail">  <i className="fas fa-envelope-open-text"></i> Back to Email</Link>
            <div className="mail-details-container">
                <h1>{mail.subject}</h1>
                <h4>From: {mail.nickname}, {mail.from}</h4>
                <p>{mail.body}</p>
                <h3>Sent At: {utilService.handleTimestamp(mail.sentAt)}</h3>
            </div>
        </section>
    }
}