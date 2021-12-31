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
            status: 'inbox',
            txt: '',
            isRead: '',
        },
        sortBy: 'date',
        deletedMails: [],
    };

    componentDidMount() {
        this.loadMails(this.state.filterBy);
    }

    loadMails = (filterBy = null, sortBy = null) => {
        console.log('in loadmails', filterBy, sortBy)
        mailService.query(filterBy, sortBy).then((mails) => {
            this.setState({ mails });
        });
    };


    onFilter = (txt, isRead) => {
        console.log('check', txt, isRead)
        this.setState((prevState) => ({ ...prevState, filterBy: { ...prevState.filterBy, txt, isRead } }),
            () => this.loadMails(this.state.filterBy, this.state.sortBy))
    }

    onSort = (sortBy) => {
        console.log(sortBy)
        this.setState((prevState) => ({ ...prevState, sortBy }),
            () => this.loadMails(this.state.filterBy, this.state.sortBy))
    }

    toggleStar = (mail) => {
        mailService.starClicked(mail).then(this.loadMails)
    }


    onSetFoldersFilter = (selected) => {
        this.setState({ filterBy: { status: selected } },
            () => this.loadMails(this.state.filterBy))
    }

    onSetSortBy = (value) => {
        this.setState({ sortBy: value })
    }

    render() {
        const { mails, filterBy } = this.state
        console.log(this.state, 'maillist state')

        // if (!this.state.mails.length) return <Loader />
        return (

            <section>
                <MailFilter onSort={this.onSort} onFilter={this.onFilter}
                    loadMails={this.loadMails} status={this.state.status} />
                <div className="mails-container">

                    <MailFolderList onSetFoldersFilter={this.onSetFoldersFilter} />
                    <div className="mails-preview-container">
                        <div className="mail-list-headers flex space-between">
                            <h3>Name</h3>
                            <h3>Subject</h3>
                            <h3>Mail body</h3>
                            <h3>Date</h3>
                        </div>
                        {mails && mails.map((mail) => {
                            return <MailPreview key={mail.id} mail={mail} toggleStar={this.toggleStar} />
                        })}
                    </div>
                </div >

            </section>
        )
    }
}
