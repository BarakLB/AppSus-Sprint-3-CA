import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/storage.service.js';

export const mailService = {
  query,
  getUser,
  getMailById,
  updateIsRead,
  starClicked,
  deleteMail,
  moveToTrash,
  addMailToArr,
};

const loggedinUser = {
  email: 'puki@appsus.com',
  fullname: 'Puki Ben David',
};

const KEY = 'mailsDB';

_createMails();

function query(filterBy = null, sortBy = null) {
  let mails = _loadMailsFromStorage();
  
  if (!filterBy && !sortBy) return Promise.resolve(mails);
  if (filterBy.status) mails = _getMailsByFilter(filterBy, mails)
  if (sortBy) mails = getMailsBySort(sortBy, mails)
  if (filterBy.txt) mails = getMailsBySearch(filterBy.txt, mails)
  
  return Promise.resolve(mails)
}

function getMailsBySort(sortBy = null, mails) {
  let sortedMails = []
  if (sortBy === 'date') {
    sortedMails = mails.sort((a, b) => {
      return b.sentAt - a.sentAt
    })
  }
  else if (sortBy === 'subject') {
    sortedMails = mails.sort((a, b) => {
      return a.subject.localeCompare(b.subject);
    })
  }
  return sortedMails
}

function getMailIdx(mailId) {
  const mails = _loadMailsFromStorage()
  return mails.findIndex(mail => mail.id === mailId)
}

function addMailToArr(mail){
let newMail = addMail(mail)
let mails = _loadMailsFromStorage()
mails.unshift(newMail)
_SaveMailsToStorage(mails)
}

function addMail({subject, to, body}) {
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

  if (filterBy.status === 'inbox') filteredMails = mails.filter(mail => mail.from !== loggedinUser.email && !mail.isDeleted)
  if (filterBy.status === 'starred') filteredMails = mails.filter(mail => mail.isStarred)
  if (filterBy.status === 'sent') filteredMails = mails.filter(mail => mail.isSent)
  if (filterBy.status === 'trash') filteredMails = mails.filter(mail => mail.isDeleted)

  return filteredMails


}

function getMailsBySearch(txt, mails) {
  mails = mails.filter((mail) => {
    return (
      mail.subject.toLowerCase().includes(txt.toLowerCase()) ||
      mail.body.toLowerCase().includes(txt.toLowerCase()) ||
      mail.nickname.toLowerCase().includes(txt.toLowerCase())
    )
  })
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
  mails[idx].isDeleted = true
  _SaveMailsToStorage(mails)
  return Promise.resolve()
}


function moveToTrash(mailId) {
  let mails = _loadMailsFromStorage()
  const idx = getMailIdx(mailId)
  if (mails[idx].isDeleted) {
    deleteMail(mailId);
    return;
  }
  mails[idx].isDeleted = true;
  _SaveMailsToStorage(mails);
  return Promise.resolve();
}


function _createMails() {
  let mails = _loadMailsFromStorage();

  if (!mails || !mails.length) {
    mails = [
      {
        id: utilService.makeId(),
        subject: 'Dear Puki Ben David!',
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
        nickname: loggedinUser.fullname,
        isStarred: true,
        isSent: true,
        isDeleted: false,

      },
      {
        id: utilService.makeId(),
        subject: 'Find what\'s new in AliExpress',
        body: 'Hello Puki, Come and check what\'s new in the latest categories you visited ' + utilService.makeLorem(),
        isRead: true,
        sentAt: 1470780664700,
        to: 'orenyan@momo.com',
        from: 'AliExpress@momo.com',
        nickname: 'AliExpress',
        isStarred: true,
        isSent: false,
        isDeleted: true,
      },
      {
        id: utilService.makeId(),
        subject: 'Hello Puki, push to git!',
        body: 'Hey Puki Don\'t forget to make a push for your final project'
          + utilService.makeLorem(),
        isRead: false,
        sentAt: 1440780664700,
        to: loggedinUser.email,
        from: 'AlonDai@momo.com',
        nickname: 'Alon-Dai',
        isStarred: false,
        isSent: false,
        isDeleted: false,
      },
      {
        id: utilService.makeId(),
        subject: '12 new jobs for \'full stack engineer\'',
        body: `Your job alert for full stack engineer 12 new jobs in Israel match your preferences.
        Full Stack EngineerQEDMA Quantum Computing · Tel Aviv, Israel (On-site)
         Actively recruiting`,
        isRead: false,
        sentAt: 1641102286489,
        to: loggedinUser.email,
        from: 'shuki@momo.com',
        nickname: 'Shuki',
        isStarred: true,
        isSent: false,
        isDeleted: false,
      },
    ];
  }
  _SaveMailsToStorage(mails);
}

function _SaveMailsToStorage(mails) {
  storageService.saveToStorage(KEY, mails);
}


function _loadMailsFromStorage(key = KEY) {
  return storageService.loadFromStorage(key);
}
