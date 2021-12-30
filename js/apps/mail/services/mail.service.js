import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/storage.service.js';

export const mailService = {
  query,
  getUser,
  getMailById,
  updateIsRead,
};

const loggedinUser = {
  email: 'puki@appsus.com',
  fullname: 'Puki Ben David',
};

const KEY = 'mailsDB';
_createMails();

function query(filterBy = null) {
  const mails = _loadMailsFromStorage();
  if (!filterBy) return Promise.resolve(mails);
  const filteredMails = _getMailsByFilter(filterBy)
  // console.log(filteredMails)
  return Promise.resolve(filteredMails);
}


function getMailIdx(mailId) {
  const mails = _loadMailsFromStorage()
  console.log(mails.findIndex(mail => mail.id === mailId))
  return mails.findIndex(mail => mail.id === mailId)
}



function updateIsRead(mail) {
  let i = getMailIdx(mail.id)
  let mails = _loadMailsFromStorage()
  mails[i].isRead = true
  _SaveMailsToStorage(mails)
}

function _getMailsByFilter(filterBy) {
  console.log('getmail filterBy:', filterBy);

  let mails = _loadMailsFromStorage()
  mails.filter((mail) => {
    return mail.isRead + '' === filterBy.isRead
  })
  console.log(mails)
}

function getUser() {
  return Promise.resolve(loggedinUser);
}

function getMailById(mailId) {
  let mails = _loadMailsFromStorage();
  return Promise.resolve(mails.find((mail) => mail.id === mailId))
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
        nickname: 'Momo'
      },
      {
        id: utilService.makeId(),
        subject: 'Daniel Shaked invited you to DanielShaked test1',
        body: '@DanielShaked has invited you to collaborate on the DanielShaked/test1 repository',
        isRead: true,
        sentAt: 155133900594,
        to: loggedinUser.email,
        from: 'danielShakedKingy@momo.com',
        nickname: 'GitHub.Inc'
      },
      {
        id: utilService.makeId(),
        subject: '[Slack] New message from Oren Yaniv',
        body: 'Yo Puki, good job with your last project!',
        isRead: false,
        sentAt: 1640780664700,
        to: loggedinUser.email,
        from: 'orenyan@momo.com',
        nickname: 'Oren',
        isStarred: true,
      },
      {
        id: utilService.makeId(),
        subject: 'Oren, I need a little help with my react application',
        body: 'Hello Oren, Can you please help me fix some bugs in my app? cant make it on my own, Puki',
        isRead: false,
        sentAt: 1240780664700,
        to: 'orenyan@momo.com',
        from: loggedinUser.email,
        nickname: 'Oren',
        isStarred: true,
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
