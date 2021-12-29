//SERVICES
import { mailService } from '../services/mail.service.js';


//CMPS
import { MailPreview } from '../cmps/MailPreview.jsx';


export class MailList extends React.Component {

    state = {
        mails: [],
        criteria: {
            status: 'inbox',
            txt: null,
            isRead: null,
            isStared: null,
            lables: null,
        },
    };

    componentDidMount() {
        this.loadMails();
    }

    loadMails = () => {
        mailService.query().then((mails) => {
            this.setState({ mails });
        });
    };

    render() {
        const {mails} = this.state
        
        if (!this.state.mails.length) return <p>No Mails</p>
        console.log(mails)
        return (
            <section>
               { mails.map((mail) => {
            return <MailPreview key={mail.id} mail={mail}/>
               })}
            </section>
        )
    }
}