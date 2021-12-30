//SERVICES
import { mailService } from '../services/mail.service.js';



//CMPS
import { MailPreview } from '../cmps/MailPreview.jsx';
import { MailFolderList } from '../cmps/MailFolderList.jsx';
import { MailFilter } from '../cmps/MailFilter.jsx';
import { Loader } from '../../../cmps/Loader.jsx'

export class MailList extends React.Component {

    state = {
        mails: [],
        filterBy: {
            status: '',
        },
    };

    componentDidMount() {
        this.loadMails();
    }

    loadMails = (filterBy = null, sortBy = null) => {
        mailService.query(filterBy).then((mails) => {
            this.setState({ mails });
        });
    };



    onSetFilterBy = (selected) => {
        this.setState({filterBy:{status:selected}})

    }

    render() {
        const { mails, filterBy } = this.state
        console.log(this.state, 'sadasd')

        if (!this.state.mails.length) return <Loader />
        return (
            <section>
                {/* <MailCompose /> */}
                <MailFilter onSetFilterBy={this.onSetFilterBy} />
                <div className="mails-container">
                    <MailFolderList onSetFilterBy={this.onSetFilterBy} />
                    <div className="mail-list-headers flex space-between">
                        <h3>Name</h3>
                        <h3>Subject</h3>
                        <h3>Mail body</h3>
                        <h3>Date</h3>
                    </div>
                    {mails && mails.map((mail) => {
                        return <MailPreview key={mail.id} mail={mail} />
                    })}
                </div >

            </section>
        )
    }
}
