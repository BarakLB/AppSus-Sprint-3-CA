import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/storage.service.js';

export const mailService = {
  query,
  getUser,
  getMailById,
};

const loggedinUser = {
  email: 'puki@appsus.com',
  fullname: 'Puki Ben David',
};

const KEY = 'mailsDB';
_createMails();

function query() {
  const mails = _loadMailsFromStorage();
  return Promise.resolve(mails);
}

function getUser() {
  return Promise.resolve(loggedinUser);
}

function getMailById(mailId) {
  let mail = _loadMailsFromStorage();
  mail.find((mail) => mail.id === mailId);
  return Promise.resolve(mail);
}

function _createMails() {
  let mails = _loadMailsFromStorage();

  if (!mails || !mails.length) {
    mails = [
      {
        id: utilService.makeId(),
        subject: 'Hello Puki!',
        body: 'Hey, man! I missed you so much! I just learned React and I hope you enjoy in Coding Academy Course',
        isRead: false,
        sentAt: 1551133930594,
        to: loggedinUser.email,
        from: 'momo@momo.com',
      },
      {
        id: utilService.makeId(),
        subject: 'Daniel Shaked invited you to DanielShaked test1',
        body: '@DanielShaked has invited you to collaborate on the DanielShaked/test1 repository',
        isRead: true,
        sentAt: 155133900594,
        to: loggedinUser.email,
        from: 'danielShakedKingy@momo.com',
      },
      {
        id: utilService.makeId(),
        subject: '[Slack] New message from Oren Yaniv',
        body: 'Yo Puki, good job with your last project!',
        isRead: false,
        sentAt: 1551133930594,
        to: loggedinUser.email,
        from: 'orenyan@momo.com',
      },
    ];
  }

  _SaveMailsToStorage(mails);
}

function _SaveMailsToStorage(mails) {
  storageService.saveToStorage(KEY, mails);
}

function _loadMailsFromStorage() {
  return storageService.loadFromStorage(KEY);
}
