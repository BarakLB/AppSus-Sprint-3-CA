const { NavLink, Link } = ReactRouterDOM;

export class MailFolderList extends React.Component {


    render() {
        return <section className="mail-side-nav">
<Link className="compose-btn clean-link" to="/mail/new"><i className="fas fa-plus"></i>New mail</Link> 

            <ul className="clean-list">
                <li>
                    <NavLink className="clean-link" to="/mail/inbox">
                    <i className="fas fa-box-open"></i>Inbox</NavLink>
                </li>
                <li>
                    <NavLink className="clean-link" to="/mail/starred">
                    <i className="fas fa-star"></i> Starred</NavLink>
                </li>
                <li>
                    <NavLink className="clean-link" to="/mail/sent"> 
                    <i className="fas fa-paper-plane"></i>Sent</NavLink>
                </li>
                <li>
                    <NavLink className="clean-link" to="/mail/trash">
                    <i className="fas fa-trash"></i>Deleted mails</NavLink>
                </li>

            </ul>
        </section>
    }

}