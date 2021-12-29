const { NavLink } = ReactRouterDOM;

export class MailFolderList extends React.Component {


    render() {
        return <section className="mail-side-nav">
            <ul className="clean-list">

                <li>
                    <NavLink className="clean-link" to="/mail/inbox">Inbox</NavLink>
                </li>
                <li>
                    <NavLink className="clean-link" to="/mail/starred"> Starred</NavLink>
                </li>
                <li>
                    <NavLink className="clean-link" to="/mail/sent"> Sent</NavLink>
                </li>
                <li>
                    <NavLink className="clean-link" to="/mail/trash">Deleted mails</NavLink>
                </li>

            </ul>
        </section>
    }

}