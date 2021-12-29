import { utilService } from "../../../services/util.service.js"

const { Link } = ReactRouterDOM



export function MailPreview({ mail }) {
    mail.isRead = true
    console.log('sadasdasd',mail)
    return <section className="flex">
        <Link className="clean-link" to={`mail/edit/${mail.id}`}>
            <div className="sender-name">
                <p>{mail.nickname}</p>
            </div>
            <div className="mail-subject">
                <p>{mail.subject}</p>
                <p>{mail.body}</p>
            </div>
            <div className="sent-at">
                <h3>{utilService.handleTimestamp(mail.sentAt)}</h3>
            </div>
        </Link>
    </section>





}