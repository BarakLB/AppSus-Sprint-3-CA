const { Link } = ReactRouterDOM
//SERVICES
import { utilService } from "../../../services/util.service.js"
import { mailService } from '../services/mail.service.js';
//CMPS
import { TxtLength } from "./TxtLength.jsx"



export function MailPreview({ mail }) {
    
    return <section className="mail-preview" >

        <button > <i className="fas fa-star"></i></button>

        <Link className="mail-preview-link clean-link flex align-center space-between" to={`mail/edit/${mail.id}`} onClick={() => mailService.updateIsRead(mail)} >
            <div className="sender-name">
                <p>{mail.nickname}</p>
            </div>
            <TxtLength text={mail.subject} />
            <TxtLength text={mail.body} />
            <div className="sent-at">
                <h3>{utilService.handleTimestamp(mail.sentAt)}</h3>
            </div>
        </Link>
    </section>





}