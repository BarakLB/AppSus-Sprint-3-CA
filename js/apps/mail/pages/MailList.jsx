//SERVICES
import { mailService } from '../services/mail.service.js';



//CMPS
import { MailPreview } from '../cmps/MailPreview.jsx';
import { MailFolderList } from '../cmps/MailFolderList.jsx';
import { MailFilter } from '../cmps/MailFilter.jsx';


export class MailList extends React.Component {

    state = {
        mails: [],
        filterBy: {
            status: 'inbox',
            txt: '',
        },
        sortBy: 'date',
    };

    componentDidMount() {
        this.loadMails(this.state.filterBy);
    }

    loadMails = (filterBy = null, sortBy = null) => {
        mailService.query(filterBy, sortBy).then((mails) => {
            this.setState({ mails });
        });

    };


    onFilter = (txt, isRead) => {
        this.setState((prevState) => ({ ...prevState, filterBy: { ...prevState.filterBy, txt, isRead } }),
            () => this.loadMails(this.state.filterBy, this.state.sortBy))
    }

    onSort = (sortBy) => {
        this.setState((prevState) => ({ ...prevState, sortBy }),
            () => this.loadMails(this.state.filterBy, this.state.sortBy))
    }

    toggleStar = (mail) => {
        mailService.starClicked(mail).then(this.loadMails(this.state.filterBy,this.state.sortBy))
    }


    onSetFoldersFilter = (selected) => {
        this.setState({ filterBy: { status: selected } },
            () => this.loadMails(this.state.filterBy))
    }

    onSetSortBy = (value) => {
        this.setState({ sortBy: value })
    }

    onDeleteMail = (mail) => {
        console.log(this.state.filterBy)
        mailService.deleteMail(mail.id).then(() => this.loadMails(this.state.filterBy, this.state.sortBy))

    }

    onMoveToTrash = (mailId) => {
        const idx = this.state.mails.findIndex((mail) => mail.id === mailId);
        if (this.state.mails[idx].isDeleted) {
            mailService.deleteMail(mailId).then(() => this.loadMails(this.state.filterBy, this.state.sortBy));
        } else {
            mailService.moveToTrash(mailId).then(() => this.loadMails(this.state.filterBy, this.state.sortBy));
        }
    };

    render() {
        const { mails } = this.state
        return (

            <section>
                <MailFilter onSort={this.onSort} onFilter={this.onFilter}
                    loadMails={this.loadMails} status={this.state.status} />
                <div className="mails-container">

                    <MailFolderList onSetFoldersFilter={this.onSetFoldersFilter} />
                    <div className="mails-preview-container">
                        <div className="mail-list-headers flex space-around">
                            <h3>Name</h3>
                            <h3>Subject</h3>
                            <h3>Mail body</h3>
                            <h3>Date</h3>
                        </div>
                        {mails && mails.map((mail) => {
                            return <MailPreview key={mail.id} mail={mail}
                                toggleStar={this.toggleStar}
                                onMoveToTrash={this.onMoveToTrash}
                                onDeleteMail={this.onDeleteMail} />
                        })}
                    </div>
                </div >

            </section>
        )
    }
}
