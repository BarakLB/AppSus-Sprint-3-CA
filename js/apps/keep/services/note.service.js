import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/storage.service.js';

export const noteService = {
  query,
  getNoteById,
  addNote,
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

function addNote(noteInfo) {
  const notes = _loadNotesFromStorage();
  const newNote = {
    id: utilService.makeId(),
    isPinned: false,
    info: {
      img: noteInfo.img,
      video: noteInfo.video,
      header: noteInfo.header,
      txt: noteInfo.txt,
      todos: [...(noteInfo.todos || [])]
    }
  }

  notes.unshift(newNote);
  _saveNotesToStorage(notes)
}

function _createNotes() {
  let notes = _loadNotesFromStorage();
  if (!notes || !notes.length) {
    notes = [
      {
        id: utilService.makeId(),
        type: 'text',
        isPinned: true,
        info: {
          img: 'https://robohash.org/2',
          video: null,
          header: 'Go for it!',
          txt: 'Fullstack Me Baby!',
          todos: [],
        },
      },
      {
        id: utilService.makeId(),
        type: 'photo',
        isPinned: false,
        info: {
          img: 'https://robohash.org/1',
          video: null,
          header: 'Go for it!',
          txt: null,
          todos: [],
        },
      },
      {
        id: utilService.makeId(),
        type: 'video',
        isPinned: false,
        info: {
          img: null,
          video: 'https://www.youtube.com/embed/rt-2cxAiPJk',
          header: null,
          txt: 'You have to watch this movie!',
          todos: [],
        },
      },
      {
        id: utilService.makeId(),
        type: 'todo',
        isPinned: false,
        info: {
          img: null,
          video: null,
          header: "Don't Forget:",
          txt: null,
          todos: [
            {
              id: utilService.makeId(),
              txt: 'Finish up your projects',
              doneAt: Date.now,
            },
            { id: utilService.makeId(), txt: 'Code & Sleep' },
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
