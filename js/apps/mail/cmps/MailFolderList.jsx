const { NavLink } = ReactRouterDOM;

export class MailFolderList extends React.Component {


    render() {
        const { onSetFoldersFilter } = this.props
        return <section className="mail-side-nav">

            <div className="user-info">
                <img  alt="" src="assets/img/puki.png" />
                <h1>Puki Ben David</h1>
            </div>
            <ul className="side-ul clean-list">
                

                <li className="flex align-center">
                    <NavLink className=" clean-link navlink" to="/mail/new">
                        <i className="fas fa-plus"></i> New mail</NavLink>
                </li>
                <li className="flex align-center">
                    <NavLink className="clean-link navlink" to="/mail" onClick={() => onSetFoldersFilter('inbox')}>
                        <i className="fas fa-box-open"></i> Inbox</NavLink>
                </li>
                <li className="flex align-center">
                    <NavLink className="clean-link navlink" to="/mail" onClick={() => onSetFoldersFilter('starred')}>
                        <i className="fas fa-star"></i> Starred</NavLink>
                </li>
                <li className="flex align-center">
                    <NavLink className="clean-link navlink" to="/mail" onClick={() => onSetFoldersFilter('sent')}>
                        <i className="fas fa-paper-plane"></i> Sent</NavLink>
                </li>
                <li className="flex align-center">
                    <NavLink className="clean-link navlink" to="/mail" onClick={() => onSetFoldersFilter('trash')}>
                        <i className="fas fa-trash"></i> Trash</NavLink>
                </li>

            </ul>
        </section>
    }

}