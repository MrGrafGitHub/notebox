import React, { useEffect, useState } from 'react';
import NoteList from './components/NoteList';
import Editor from './components/Editor';
import { getNotes, saveNote, deleteNote } from './api';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    loadNotes();
  }, []);

  async function loadNotes() {
    const data = await getNotes();
    setNotes(data);
    setSelected(data[0] || null);
  }

  function handleEdit(note) {
    console.log('handleEdit note:', note);
    setSelected(note);
    setNotes(prevNotes => prevNotes.map(n => (n.id === note.id ? note : n)));
  }

  function normalizeFolderPath(path) {
    if (!path) return '';
    path = path.trim();
    path = path.replace(/\\/g, '/');
    path = path.replace(/^\/+|\/+$/g, '');
    path = path.replace(/\/{2,}/g, '/');
    return path;
  }

  async function handleSave() {
    if (selected) {
      const normalized = {
        ...selected,
        folder: normalizeFolderPath(selected.folder),
      };
      const saved = await saveNote(normalized);
      setNotes(prevNotes => prevNotes.map(n => (n.id === saved.id ? saved : n)));
      setSelected(saved);
    }
  }

  async function handleNewNote() {
    const newNote = { title: '', content: '', folder: '' };
    const saved = await saveNote(newNote);
    setNotes(prev => [saved, ...prev]);
    setSelected(saved);
  }

  async function handleDelete(id) {
    await deleteNote(id);
    setNotes(prev => {
      const filtered = prev.filter(n => n.id !== id);
      if (selected?.id === id) setSelected(filtered[0] || null);
      return filtered;
    });
  }

  return (
    <div className="flex h-screen">
      <NoteList notes={notes} onSelect={setSelected} selectedId={selected?.id} onNewNote={handleNewNote} />
      <div className="flex flex-col flex-1">
        <div className="p-2 border-b bg-white flex justify-between items-center">
          <div className="text-lg font-bold">Редактор</div>
          <div>
            {selected && (
              <>
                <button
                  onClick={handleSave}
                  className="px-4 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 mr-2"
                >
                  Сохранить
                </button>
                <button
                  onClick={() => handleDelete(selected.id)}
                  className="px-4 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-700"
                >
                  Удалить
                </button>
              </>
            )}
          </div>
        </div>
        <Editor selectedNote={selected} onChange={handleEdit} />
      </div>
    </div>
  );
}
