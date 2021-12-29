import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/storage.service.js';

export const noteService = {
  query,
  getNoteById,
};

const KEY = 'noteDB';
_createNotes();

function query() {
  const notes = _loadNotesFromStorage();
  return Promise.resolve(notes);
}

function getNoteById(noteId) {
  let notes = _loadNotesFromStorage();
  return Promise.resolve(notes.find((note) => note.id === noteId));
}

function _createNotes() {
  let notes = _loadNotesFromStorage();
  if (!notes || !notes.length) {
    notes = [
      {
        id: utilService.makeId(),
        type: 'note-txt',
        isPinned: true,
        info: {
          txt: 'Fullstack Me Baby!',
        },
      },
      {
        id: utilService.makeId(),
        type: 'note-img',
        info: {
          url: 'https://robohash.org/1',
          title: 'Bobi and Me',
        },
        style: {
          backgroundColor: '#00d',
        },
      },
      {
        id: utilService.makeId(),
        type: 'note-todos',
        info: {
          label: 'Get my stuff together',
          todos: [
            { txt: 'Driving license', doneAt: null },
            { txt: 'Coding power', doneAt: 187111111 },
          ],
        },
      },
    ];
  }

  _saveNotesToStorage(notes);
}

function _saveNotesToStorage(notes) {
  storageService.saveToStorage(KEY, notes);
}

function _loadNotesFromStorage() {
  return storageService.loadFromStorage(KEY);
}
