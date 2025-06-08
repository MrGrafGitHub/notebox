import React, { useState } from 'react';

function buildNoteTree(notes) {
  const tree = {};

  notes.forEach(note => {
    const parts = (note.folder || '').split('/').filter(Boolean);
    let current = tree;

    for (const part of parts) {
      if (!current[part]) current[part] = {};
      current = current[part];
    }

    if (!current._notes) current._notes = [];
    current._notes.push(note);
  });

  return tree;
}

function TreeNode({ tree, path = '', onSelect, selectedId }) {
  const [openFolders, setOpenFolders] = useState({});

  const toggle = (folderPath) => {
    setOpenFolders(prev => ({
      ...prev,
      [folderPath]: !prev[folderPath]
    }));
  };

  return (
    <ul className="ml-2">
      {Object.entries(tree).map(([key, value]) => {
        if (key === '_notes') {
          return value.map(note => (
            <li
              key={note.id}
              onClick={() => onSelect(note)}
              className={`p-2 cursor-pointer rounded hover:bg-gray-100 ${
                selectedId === note.id ? 'bg-gray-200' : ''
              }`}
            >
              <div className="font-semibold">{note.title || 'Без названия'}</div>
              <div className="text-sm text-gray-500 truncate">{note.content}</div>
            </li>
          ));
        }

        const folderPath = path ? `${path}/${key}` : key;
        const isOpen = openFolders[folderPath];

        return (
          <li key={folderPath}>
            <div
              onClick={() => toggle(folderPath)}
              className="mt-2 font-bold text-blue-700 cursor-pointer select-none flex items-center"
            >
              <span className="mr-1">{isOpen ? '▼' : '▶'}</span>
              {key}
            </div>
            {isOpen && (
              <TreeNode
                tree={value}
                path={folderPath}
                onSelect={onSelect}
                selectedId={selectedId}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function NoteList({ notes, onSelect, selectedId, onNewNote }) {
  const tree = buildNoteTree(notes);

  return (
    <div className="w-60 border-r bg-white overflow-y-auto flex flex-col p-2">
      <button
        onClick={onNewNote}
        className="mb-2 p-2 bg-green-500 text-white text-sm rounded hover:bg-green-600"
      >
        + Создать заметку
      </button>

      <TreeNode
        tree={tree}
        onSelect={onSelect}
        selectedId={selectedId}
      />
    </div>
  );
}
