import { mailService } from "../services/mail.service.js";
export class MailCompose extends React.Component {

    state = {
        mail: {
            to: '',
            subject: '',
            body: '',
        }
    }

    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.type === "number" ? +target.value : target.value;
        this.setState((prevState) => ({
            mail: { ...prevState.mail, [field]: value },
        }));
    }

    onAddMail = (ev) => {
        ev.preventDefault()
        mailService.addMailToArr(this.state.mail)
        this.props.history.push('/mail');
    }

    render() {
        return <section className="new-mail ">
            <h1>Send New Mail</h1>
            <form className="new-mail-form flex direction-column " onSubmit={this.onAddMail}>
                <input type="email" name="to" placeholder="Send to: example@example.com" onChange={this.handleChange} />
                <input type='text' name="subject" placeholder="Subject" onChange={this.handleChange} />
                <textarea name="body" placeholder="Message" rows="12" collumns="55" onChange={this.handleChange} />
                <button type="submit" value="send" >Submit</button>
            </form>
        </section>
    }
}