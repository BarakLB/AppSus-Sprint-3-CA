import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/storage.service.js';

export const mailService = {
  query,
  getUser,
  getMailById,
  updateIsRead,
  starClicked,
  deleteMail,
};

const loggedinUser = {
  email: 'puki@appsus.com',
  fullname: 'Puki Ben David',
};

const KEY = 'mailsDB';
const DELETED_KEY = 'deletedDB';
_createMails();

function query(filterBy = null, sortBy = null) {
  let mails = _loadMailsFromStorage();

  if (!filterBy && !sortBy) return Promise.resolve(mails);
  if (filterBy.status) {
    mails = _getMailsByFilter(filterBy, mails)
  }
  if (sortBy) {
    mails = getMailsBySort(sortBy)
  }
  if (filterBy.txt) {
    mails = getMailsBySearch(filterBy.txt, mails)
  }
  return Promise.resolve(mails)
}

function getMailsBySort(sortBy = null) {

  let mails = _loadMailsFromStorage()

  let sortedMails = []
  if (sortBy === 'date') {
    sortedMails = mails.sort((a, b) => {
      return b.sentAt - a.sentAt
    })
    _SaveMailsToStorage(sortedMails)
    return sortedMails
  }
  else if (sortBy === 'subject') {
    sortedMails = mails.sort((a, b) => {
      return a.subject.localeCompare(b.subject);
    })
    _SaveMailsToStorage(sortedMails)
    return sortedMails
  }
}

function getMailIdx(mailId) {
  const mails = _loadMailsFromStorage()
  return mails.findIndex(mail => mail.id === mailId)
}


function addMail(subject, body, to) {
  return {
    id: utilService.makeId(),
    subject,
    body,
    isRead: false,
    sentAt: Date.now(),
    to,
    from: loggedinUser.email,
    nickname: loggedinUser.fullname,
    isStarred: false,
    isSent: true,
    isDeleted: false,
  }
}


function updateIsRead(mail) {
  let i = getMailIdx(mail.id)
  let mails = _loadMailsFromStorage()
  mails[i].isRead = true
  _SaveMailsToStorage(mails)
}

function _getMailsByFilter(filterBy, mails) {
  if (!mails) return
  let filteredMails;
  if (!filterBy.status) filterBy.status = 'inbox'

  if (filterBy.status === 'inbox') filteredMails = mails.filter(mail => !mail.isDeleted)
  if (filterBy.status === 'starred') filteredMails = mails.filter(mail => mail.isStarred)
  if (filterBy.status === 'sent') filteredMails = mails.filter(mail => mail.isSent)
  if (filterBy.status === 'trash') filteredMails = mails.filter(mail => mail.isDeleted)

  // if (filterBy.txt) filteredMails = getMailsBySearch(filterBy.txt, filteredMails)
  return Promise.resolve(filteredMails)


}

function getMailsBySearch(txt, mails) {
  console.log('txt:', txt);

  mails = mails.filter((mail) => {
    return (
      mail.subject.toLowerCase().includes(txt.toLowerCase()) ||
      mail.body.toLowerCase().includes(txt.toLowerCase()) ||
      mail.nickname.toLowerCase().includes(txt.toLowerCase())
    )
  })
  console.log('here', mails.filter(mail => mail.subject.includes(txt) && mail.body.includes(txt)))
  return mails
}


function getUser() {
  return Promise.resolve(loggedinUser);
}

function getMailById(mailId) {
  let mails = _loadMailsFromStorage();
  return Promise.resolve(mails.find((mail) => mail.id === mailId))
}

function starClicked(mail) {
  console.log(mail)
  let mails = _loadMailsFromStorage()
  let i = getMailIdx(mail.id)
  mails[i].isStarred = !mails[i].isStarred
  _SaveMailsToStorage(mails)
  return Promise.resolve()
}

function deleteMail(mailId) {
  let mails = _loadMailsFromStorage()
  const idx = getMailIdx(mailId)
  let deleted = _loadMailsFromStorage(DELETED_KEY)
  console.log('deleted:', deleted);

  mails[idx].isDeleted = true
  // deleted.push(mails[idx])
  mails.splice(idx, 1)
  _SaveMailsToStorage(mails)
  // _saveDeletedMailsToStorage(deleted)
  console.log(mails[idx])
  return Promise.resolve()
}


function _createMails() {
  let mails = _loadMailsFromStorage();

  if (!mails || !mails.length) {
    mails = [
      {
        id: utilService.makeId(),
        subject: 'Hello Puki!',
        body: 'Hey, man! I missed you so much! I just learned React and I hope you enjoy in Coding Academy Course'
          + utilService.makeLorem(),
        isRead: false,
        sentAt: 1551133930594,
        to: loggedinUser.email,
        from: 'momo@momo.com',
        nickname: 'Momo',
        isStarred: false,
        isSent: false,
        isDeleted: false,
      },
      {
        id: utilService.makeId(),
        subject: 'Daniel Shaked invited you to DanielShaked test1',
        body: '@DanielShaked has invited you to collaborate on the DanielShaked/test1 repository '
          + utilService.makeLorem(),
        isRead: true,
        sentAt: 1640948987611,
        to: loggedinUser.email,
        from: 'danielShakedKingy@momo.com',
        nickname: 'GitHub.Inc',
        isStarred: false,
        isSent: false,
        isDeleted: false,
      },
      {
        id: utilService.makeId(),
        subject: '[Slack] New message from Oren Yaniv',
        body: 'Yo Puki, good job with your last project! ' + utilService.makeLorem(),
        isRead: false,
        sentAt: 1640780664700,
        to: loggedinUser.email,
        from: 'orenyan@momo.com',
        nickname: 'Oren',
        isStarred: true,
        isSent: false,
        isDeleted: false,
      },
      {
        id: utilService.makeId(),
        subject: 'Oren, I need a little help with my react application',
        body: 'Hello Oren, Can you please help me fix some bugs in my app? cant make it on my own, Puki ' + utilService.makeLorem(),
        isRead: false,
        sentAt: 1240780664700,
        to: 'orenyan@momo.com',
        from: loggedinUser.email,
        nickname: 'Puki',
        isStarred: true,
        isSent: true,
        isDeleted: false,

      },
      {
        id: utilService.makeId(),
        subject: 'Find what\'s new in AliExpress',
        body: 'Hello Puki, Come and check what\'s new in the latest categories you visited ' + utilService.makeLorem(),
        isRead: true,
        sentAt: 1240780664700,
        to: 'orenyan@momo.com',
        from: 'AliExpress@momo.com',
        nickname: 'AliExpress',
        isStarred: true,
        isSent: false,
        isDeleted: true,
      },
    ];
  }
  // let deleted = [];
  // deleted = mails.filter(mail => mail.isDeleted)
  // mails.filter(mail => !mail.isDeleted)
  // _saveDeletedMailsToStorage(deleted)

  _SaveMailsToStorage(mails);
}

function _SaveMailsToStorage(mails) {
  storageService.saveToStorage(KEY, mails);
}

function _saveDeletedMailsToStorage(mails) {
  storageService.saveToStorage(DELETED_KEY, mails)
}

function _loadMailsFromStorage(key = KEY) {
  return storageService.loadFromStorage(key);
}
