//REACTDOM
const { Route, Switch } = ReactRouterDOM;

//PAGES
import { MailList } from './pages/MailList.jsx';
import { EmailDetails } from './pages/EmailDetails.jsx';
import { MailCompose } from './pages/MailCompose.jsx';



export class MailApp extends React.Component {
  render() {
    return (
      <main className="mail-main main-layout">
        <Switch>
          <Route path="/mail/:filter/:mailId" component={EmailDetails} />
          <Route path="/mail/new" component={MailCompose} />
          <Route path="/mail/" component={MailList} />
        </Switch>
      </main>
    );
  }
}
