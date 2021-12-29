import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/storage.service.js';

export const noteService = {
  query,
  getNoteById,
  addNote,
  getPinnedNotes,

};

const KEY = 'noteDB';
_createNotes();

function query(filterBy) {
  const notes = _loadNotesFromStorage();
  if (!filterBy) return Promise.resolve(notes);
  if (filterBy.type) {
    const shownNotes = notes.filter((note) => {
      if (filterBy.type === 'todos') return note.info.todos.length;
      return note.info[filterBy.type];
    })

    return Promise.resolve(shownNotes);

  }else if (filterBy.txt) {
    const searchStr = filterBy.txt
    const notesToShow = gNotes.filter(note => {
        if (note.info.txt) return note.info.txt.toLowerCase().includes(searchStr)
        if (note.info.title) return note.info.title.toLowerCase().includes(searchStr)
        if (note.info.todos) return note.info.todos.some(todo => todo.includes(searchStr))
    })

    return Promise.resolve(notesToShow);
  }

  return Promise.resolve(notes);
}

function getNoteById(noteId) {
  let notes = _loadNotesFromStorage();
  return Promise.resolve(notes.find((note) => note.id === noteId));
}

function getPinnedNotes() {
  let pinnedNotes = _loadNotesFromStorage('pinnedDB');
  let notes = _loadNotesFromStorage();

  if (!pinnedNotes || !pinnedNotes.length) {
    pinnedNotes = []
    const pinnedNotesIds = notes.filter(note => note.isPinned).map(note => note.id)
    pinnedNotesIds.forEach(id => {
      const idx = notes.findIndex(note => note.id === id)
      const currNote = notes[idx];

      pinnedNotes.push(currNote);
      notes.splice(idx, 1)
    })
  }
  _savePinnedNotesToStorage(pinnedNotes);
  
  return Promise.resolve(pinnedNotes); 
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

function _loadNotesFromStorage(key = KEY) {
  return storageService.loadFromStorage(key);
}

function _savePinnedNotesToStorage(pinnedNotes) {
  storageService.saveToStorage('pinnedDB', pinnedNotes)
}