//SERVICES
import { mailService } from '../services/mail.service.js';

//PAGES
import {MailCompose} from './MailCompose.jsx'

//CMPS
import { MailPreview } from '../cmps/MailPreview.jsx';
import { MailFolderList } from '../cmps/MailFolderList.jsx';
import { MailFilter } from '../cmps/MailFilter.jsx';
import {Loader} from '../../../cmps/Loader.jsx'

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

    // loadMails = (filterBy = null, sortBy = null)  => {
    //     mailService.query().then((mails) => {
    //         this.setState({ mails });
    //     });
    // };
    loadMails = (filterBy = null, sortBy = null) => {
        const { criteria } = this.state;
        mailService.mailsToShow( criteria, filterBy, sortBy)
            .then(mails => this.setState({ mails }));
    }


    onSetCriteria = (currStatus) => {
        const { criteria } = this.state
        const statusArr = ['inbox', 'starred', 'sent', 'deleted']

        if(statusArr.includes(currStatus)) {
            this.setState(prevState => ({criteria: {...prevState.criteria, status:currStatus}}, this.loadMails))
        }
    }
    render() {
        const { mails } = this.state

        if (!this.state.mails.length) return <Loader/>
        return (
            <section>
                {/* <MailCompose /> */}
                <MailFilter /> 
                <div className="mails-container">
                <MailFolderList  />
                    {mails.map((mail) => {
                        return <MailPreview key={mail.id} mail={mail} />
                    })}
                </div >

            </section>
        )
    }
}
