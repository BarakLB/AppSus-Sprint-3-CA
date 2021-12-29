const { Route, Switch } = ReactRouterDOM;

import { mailService } from './services/mail.service.js';

export class MailApp extends React.Component {
  state = {
    mails: [],
    criteria: {
      status: 'inbox',
      txt: null,
      isRead: null,
      isStared: null,
      lables: null,
    },
  };

  componentDidMount() {
    this.loadMails();
  }

  loadMails = () => {
    mailService.query().then((mails) => {
      this.setState({ mails });
    });
  };

  render() {
    console.log(this.state.mails);
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
