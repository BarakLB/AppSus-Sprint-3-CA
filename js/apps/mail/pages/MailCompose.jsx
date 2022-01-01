export class MailCompose extends React.Component {

    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
     
    };

    render() {
        return <section className="new-mail">
            <form className="new-mail-form flex direction-column">
                <input type='text' name="user-name" placeholder="Name" />
                <input type="email" name="user-email" placeholder="Email" />
                <textarea name="message" placeholder="Message" rows="12" collumns="55" />
                <button type="submit" value="send" >Submit</button>
            </form>
        </section>
    }
}