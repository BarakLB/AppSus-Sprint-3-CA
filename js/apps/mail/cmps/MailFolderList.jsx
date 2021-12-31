const { NavLink, Link } = ReactRouterDOM;

export class MailFolderList extends React.Component {


    render() {
        const { onSetFoldersFilter } = this.props
        return <section className="mail-side-nav ">



            <ul className="side-ul clean-list">

                <li className="flex align-center">
                    <NavLink className=" clean-link navlink" to="/mail/new">
                        {/* <button className="compose-btn"> */}
                        <i className="fas fa-plus"></i>New mail
                        {/* </button> */}
                    </NavLink>
                </li>
                <li className="flex align-center">
                    <NavLink className="clean-link navlink" to="/mail/inbox" onClick={() => onSetFoldersFilter('inbox')}>
                        <i className="fas fa-box-open"></i> Inbox</NavLink>
                </li>
                <li className="flex align-center">
                    <NavLink className="clean-link navlink" to="/mail/starred" onClick={() => onSetFoldersFilter('starred')}>
                        <i className="fas fa-star"></i>  Starred</NavLink>
                </li>
                <li className="flex align-center">
                    <NavLink className="clean-link navlink" to="/mail/sent" onClick={() => onSetFoldersFilter('sent')}>
                        <i className="fas fa-paper-plane"></i> Sent</NavLink>
                </li>
                <li className="flex align-center">
                    <NavLink className="clean-link navlink" to="/mail/trash" onClick={() => onSetFoldersFilter('trash')}>
                        <i className="fas fa-trash"></i> Trash</NavLink>
                </li>

            </ul>
        </section>
    }

}