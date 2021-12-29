const { Route, Switch } = ReactRouterDOM;

import { MailList } from './pages/MailList.jsx';

import { mailService } from './services/mail.service.js';

export class MailApp extends React.Component {
 

  render() {
    // console.log(this.state.mails);
    return (
      <section>
        <main>
          <Switch>
            <Route path="/mail" component={MailList}></Route>
          </Switch>
        </main>
      </section>
    );
  }
}
