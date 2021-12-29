const { Link } = ReactRouterDOM
//SERVICES
import { utilService } from "../../../services/util.service.js"
//CMPS
import { TxtLength } from "./TxtLength.jsx"



export function MailPreview({ mail }) {
    mail.isRead = true
    console.log('sadasdasd', mail)
    return <section className="mail-preview">
        <Link className="mail-preview-link clean-link flex align-center space-between" to={`mail/edit/${mail.id}`}>
            {/* <div className=" "> */}
                <div className="sender-name">
                    <p>{mail.nickname}</p>
                </div>
                {/* <div className="mail-subject flex justify-between"> */}

                    <p>{mail.subject}</p>
                    <TxtLength text={mail.body} />
                    {/* <p>{mail.body}</p> */}
                {/* </div> */}
                <div className="sent-at">
                    <h3>{utilService.handleTimestamp(mail.sentAt)}</h3>
                </div>
        </Link>
            {/* </div> */}
    </section>





}