const { NavLink, Link } = ReactRouterDOM;

export class MailFolderList extends React.Component {


    render() {
        const { onSetFoldersFilter } = this.props
        return <section className="mail-side-nav">

            <Link className=" clean-link" to="/mail/new">
                <button className="compose-btn">
                <i className="fas fa-plus"></i>New mail
                </button>
                </Link>

            <ul className="side-ul clean-list">
                <li className="flex align-center">
                    <NavLink  className="clean-link" to="/mail/inbox" onClick={()=>onSetFoldersFilter('inbox')}>
                    Inbox </NavLink><i className="fas fa-box-open"></i>
                </li>
                <li className="flex align-center">
                    <NavLink className="clean-link" to="/mail/starred" onClick={()=>onSetFoldersFilter('starred')}>
                    Starred </NavLink><i className="fas fa-star"></i> 
                </li>
                <li className="flex align-center"> 
                    <NavLink className="clean-link" to="/mail/sent" onClick={()=>onSetFoldersFilter('sent')}>
                    Sent </NavLink><i className="fas fa-paper-plane"></i>
                </li>
                <li className="flex align-center">
                    <NavLink className="clean-link" to="/mail/trash" onClick={()=>onSetFoldersFilter('trash')}>
                    Trash </NavLink><i className="fas fa-trash"></i>
                </li>

            </ul>
        </section>
    }

}