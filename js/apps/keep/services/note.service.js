import { storageService } from '../../../services/storage.service.js';
import { utilService } from '../../../services/util.service.js';

export const noteService = {
  query,
  getNoteById,
  deleteNote,
  updateColor,
  saveNote,
  togglePinned,
};

const KEY = 'notesDB';
_createNotes();

function query(filterBy) {
  let notes = _loadNotesFromStorage(KEY);
  if (filterBy) {
    const filteredNotes = notes.filter((note) => {
      return note.type === filterBy;
    });
    return Promise.resolve(filteredNotes);
  }

  return Promise.resolve(notes);
}

function togglePinned(noteToUpdate) {
  let notes = _loadNotesFromStorage();
  let noteIdx = notes.findIndex((note) => {
    return noteToUpdate.id === note.id;
  });

  (!noteToUpdate.isPinned) ? (noteToUpdate.isPinned = true) : (noteToUpdate.isPinned = false);
  notes.splice(noteIdx, 1, noteToUpdate);
  _saveNotesToStorage(notes);

  return Promise.resolve(notes);
}

function getNoteById(noteId) {
  let notes = _loadNotesFromStorage();
  var note = notes.find((note) => note.id === noteId);
  return Promise.resolve(note);
}

function deleteNote(noteId) {
  let notes = _loadNotesFromStorage();
  var noteIdx = notes.findIndex((note) => {
    return noteId === note.id;
  });
  notes.splice(noteIdx, 1);
  _saveNotesToStorage(notes);
  return Promise.resolve(notes);
}

function _updateNote(noteToUpdate) {
  let notes = _loadNotesFromStorage();
  var noteIdx = notes.findIndex((note) => {
    return note.id === noteToUpdate.id;
  });

  notes.splice(noteIdx, 1, noteToUpdate);
  _saveNotesToStorage(notes);
  return Promise.resolve(noteToUpdate);
}

function updateColor(noteId, color) {
  let notes = _loadNotesFromStorage();
  const noteToUpdate = notes.find((note) => note.id === noteId);
  noteToUpdate.style = { backgroundColor: color };
  _saveNotesToStorage(notes);
  return Promise.resolve(notes);
}

function saveNote(note) {
  return note.id ? _updateNote(note) : _addNote(note);
}

function _addNote(note) {
  let notes = _loadNotesFromStorage();
  note.id = utilService.makeId();
  notes.unshift(note);
  _saveNotesToStorage(notes);
  return Promise.resolve(note);
}

function _saveNotesToStorage(notes) {
  storageService.saveToStorage(KEY, notes);
}

function _loadNotesFromStorage() {
  return storageService.loadFromStorage(KEY);
}

function _createNotes() {
  let notes = _loadNotesFromStorage();

  if (!notes || !notes.length) {
    notes = [
      {
        id: utilService.makeId(),
        type: 'NoteVideo',
        isPinned: false,
        info: {
          url: 'https://www.youtube.com/embed/JfVOs4VSpmA',
          title: 'You have to watch it!',
        },
        style: {
          backgroundColor: '#fefbd8',
        },
      },
      {
        id: utilService.makeId(),
        type: 'NoteText',
        isPinned: true,
        info: {
          txt: 'Fullstack Me Baby!',
        },
        style: {
          backgroundColor: '#4040a1',
        },
      },
      {
        id: utilService.makeId(),
        type: 'NoteImg',
        isPinned: false,
        info: {
          url: 'https://robohash.org/1',
          title: 'My cool Robot!',
        },
        style: {
          backgroundColor: '#36486b',
        },
      },
      {
        id: utilService.makeId(),
        type: 'NoteTodos',
        isPinned: false,
        info: {
          label: 'Gotta do it',
          todos: [
            { txt: 'Code & Sleep', doneAt: null },
            { txt: 'Turn off the Computer', doneAt: null },
          ],
        },
        style: {
          backgroundColor: '#781D42',
        },
      },
      {
        id: utilService.makeId(),
        type: 'NoteTodos',
        isPinned: true,
        info: {
          label: 'Do it today!',
          todos: [
            { txt: 'Add', doneAt: null },
            { txt: 'Commit', doneAt: null },
            { txt: 'Push ', doneAt: null },
            { txt: 'Sleep!', doneAt: null },
          ],
        },
        style: {
          backgroundColor: '#fefbd8',
        },
      },
      {
        id: utilService.makeId(),
        type: 'NoteTodos',
        isPinned: false,
        info: {
          label: 'How was it:',
          todos: [
            { txt: 'Feed the dog', doneAt: null },
            { txt: 'Buy groceries', doneAt: null },
            { txt: "Like Barak's last pic", doneAt: null },
            { txt: 'Get a cool suit', doneAt: null },
          ],
        },
        style: {
          backgroundColor: '#fefbd8',
        },
      },

      {
        id: utilService.makeId(),
        type: 'NoteVideo',
        isPinned: false,
        info: {
          url: 'https://www.youtube.com/embed/4UZrsTqkcW4',
          title: 'Watch this & Become Pro',
        },
        style: {
          backgroundColor: '#D77FA1',
        },
      },
      {
        id: utilService.makeId(),
        type: 'NoteVideo',
        isPinned: true,
        info: {
          url: 'https://www.youtube.com/embed/DgRrrOt0Vr8',
          title: 'Build it with React!',
        },
        style: {
          backgroundColor: '#ECB365',
        },
      },
      {
        id: utilService.makeId(),
        type: 'NoteImg',
        isPinned: true,
        info: {
          url: 'https://media3.giphy.com/media/l4KhKRcaYb43LVqq4/giphy.gif?cid=ecf05e4777phncztbex66swjkxuo0pnwzu0b0n1jyyp4kwxa&rid=giphy.gif&ct=g',
          title: 'Love this duck',
        },
        style: {
          backgroundColor: '#36486b',
        },
      },
      {
        id: utilService.makeId(),
        type: 'NoteText',
        isPinned: true,
        info: {
          txt: 'Good Vibes',
        },
        style: {
          backgroundColor: '#676FA3',
        },
      },
      {
        id: utilService.makeId(),
        type: 'NoteVideo',
        isPinned: true,
        info: {
          url: 'https://www.youtube.com/embed/1IPu_1ecLyQ',
          title: 'Check This Car!',
        },
        style: {
          backgroundColor: '#406882',
        },
      },
      {
        id: utilService.makeId(),
        type: 'NoteVideo',
        isPinned: true,
        info: {
          url: 'https://www.youtube.com/embed/aL4THIvtmiI',
          title: 'Listen to the beats',
        },
        style: {
          backgroundColor: '#A6CF98',
        },
      },
      {
        id: utilService.makeId(),
        type: 'NoteImg',
        isPinned: true,
        info: {
          url: 'https://media4.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif?cid=ecf05e471film667pqzg31gy1nvspcljg91ebzbk07rk6kcu&rid=giphy.gif&ct=g',
          title: 'Code all day',
        },
        style: {
          backgroundColor: '#7CD1B8',
        },
      },
      {
        id: utilService.makeId(),
        type: 'NoteText',
        isPinned: false,
        info: {
          txt: 'Remember to eat your vegetables',
        },
        style: {
          backgroundColor: '#ECB365',
        },
      },
    ];
  }

  _saveNotesToStorage(notes);
}
