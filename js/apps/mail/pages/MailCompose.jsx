export class MailCompose extends React.Component {

    render() {
        return <section className="new-mail">
            <form className="new-mail-form flex direction-column">
                <input type='text' name="user-name" placeholder="Name" />
                {/* <br/> */}
                <input type="email" name="user-email" placeholder="Email" />
                {/* <br/> */}
                <textarea name="message" placeholder="Message" rows="12" collumns="55"/>
                {/* <br/> */}
                <button type="submit" value="send" >Submit</button>
            </form>

        </section>
    }

}