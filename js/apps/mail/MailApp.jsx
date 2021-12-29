//REACTDOM
const { Route, Switch } = ReactRouterDOM;

//PAGES
import { MailList } from './pages/MailList.jsx';
import { EmailDetails } from './pages/EmailDetails.jsx';




export class MailApp extends React.Component {
 

  render() {
    // console.log(this.state.mails);
    return (
      <section>
        <main>
          <Switch>
            
            <Route path="/mail/edit/:mailId" component={EmailDetails} />
            <Route path="/mail" component={MailList}/>
          </Switch>
        </main>
      </section>
    );
  }
}
