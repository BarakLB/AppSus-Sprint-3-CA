export function MailPreview({mail}) {
    console.log('mail:', mail)
return <section>
    <div className= "sender-name">
        <h3>{mail.nickname}</h3>
    </div>
    <div className= "mail-subject">
        <h3>{mail.subject}</h3>
    </div>

</section>


    

    
}