import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/storage.service.js';

export const noteService = {
  query,
  getNoteById,
  addNote,
  getPinnedNotes,
  getEmbedUrl,
  addTodo,
  removeTodo,
  addNewNoteTodo,
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
    const notesToShow = notes.filter((note) => {
      let headerMatches;
      let txtMatches;
      // let todoMatches;
      const searchStr = filterBy.txt.toLowerCase();

      if (note.info.header) headerMatches = note.info.header.toLowerCase().includes(searchStr)
      if (note.info.txt) txtMatches = note.info.txt.toLowerCase().includes(searchStr)
      // if (note.info.todos.length) {
      //   todoMatches = note.info.todos.filter((todo, idx) => {
      //     return note.info.todos[idx].txt.toLowerCase().includes(searchStr)
      //   })
      // }

      return headerMatches || txtMatches;  
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

  return Promise.resolve(notes);
}

function getEmbedUrl(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return (match && match[2].length === 11)
      ? match[2]
      : null;
}

function addNewNoteTodo(todo) {
  return Promise.resolve({ id: utilService.makeId(), txt: todo, doneAt: null })
}

function addTodo(noteId, todo) {
  let notes = _loadNotesFromStorage();
  let pinnedNotes = _loadNotesFromStorage('pinnedDB');
  let note = notes.find(note => note.id === noteId);
  if (!note) note = pinnedNotes.find(note => note.id === noteId);

  note.info.todos.push({ id: utilService.makeId(), txt: todo, doneAt: null })
  _saveNotesToStorage(notes);
  _savePinnedNotesToStorage(pinnedNotes);
}

function removeTodo(noteId, todoId) {
  let notes = _loadNotesFromStorage();
  let pinnedNotes = _loadNotesFromStorage('pinnedDB');
  let note = notes.find(note => note.id === noteId);
  if (!note) note = pinnedNotes.find(note => note.id === noteId);
  const idx = note.info.todox.findIndex(todo => todo.id !== todoId);

  note.info.todos.splice(idx, 1);
  _saveNotesToStorage(notes);
  _savePinnedNotesToStorage(pinnedNotes);

  return Promise.resolve();
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
            { id: utilService.makeId(), txt: 'Code & Sleep', doneAt: Date.now, },
          ],
        },
      },
      {
        id: utilService.makeId(),
        type: 'todo',
        isPinned: false,
        info: {
          img: null,
          video: null,
          header: "Gotta do it:",
          txt: null,
          todos: [
            {
              id: utilService.makeId(),
              txt: 'Feed the dog',
              doneAt: Date.now,
            },
            { id: utilService.makeId(), txt: 'Watch this movie', doneAt: Date.now, },
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