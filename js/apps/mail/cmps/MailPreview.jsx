const { Link } = ReactRouterDOM
//SERVICES
import { utilService } from "../../../services/util.service.js"
import { mailService } from '../services/mail.service.js';
//CMPS
import { TxtLength } from "./TxtLength.jsx"



export function MailPreview({ mail, toggleStar, onDeleteMail , onMoveToTrash}) {
  

    return <section className={(mail.isRead) ? 'mail-preview flex align-center space-between read' :
     'mail-preview flex align-center space-between'}>
   


            <button className="star-btn" onClick={() => toggleStar(mail)}>
                <i className={((mail.isStarred) ? "fas fa-star clicked" : "fas fa-star")} ></i>
            </button>
        <Link className="mail-preview-link clean-link flex align-center space-between" to={`mail/edit/${mail.id}`} onClick={() => mailService.updateIsRead(mail)} >
            <div className="sender-name">
                <p>{mail.nickname}</p>
            </div>
            <div></div>
            <TxtLength text={mail.subject} />
            <TxtLength text={mail.body} />
            <div className="sent-at">

                <h3>{utilService.handleTimestamp(mail.sentAt)}</h3>
            </div>

        </Link>
            <button className="delete-btn" onClick={() => onMoveToTrash(mail.id)}><i className="fas fa-trash"></i> </button>
    </section>





}