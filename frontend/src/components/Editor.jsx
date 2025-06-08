import React, { useState, useEffect, useRef  } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Editor({ selectedNote, onChange }) {
  const [noteData, setNoteData] = useState({
    title: '',
    content: '',
    folder: '',
  });
  const [mode, setMode] = useState('edit'); // edit | preview
  const textareaRef = useRef(null);

  useEffect(() => {
    setNoteData({
      title: selectedNote?.title || '',
      content: selectedNote?.content || '',
      folder: selectedNote?.folder || '',
    });
  }, [selectedNote]);


  function handleChange(field, value) {
    const updated = { ...noteData, [field]: value };
    setNoteData(updated);
    if (selectedNote) {
      onChange({ ...selectedNote, ...updated });
    }
  }

  function insertMarkdown(md) {
  const textarea = textareaRef.current;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const text = noteData.content;
  const selected = text.slice(start, end);

  let mdText = '';
  switch (md) {
    case 'bold':
      mdText = selected ? `**${selected}**` : '**жирный текст**';
      break;
    case 'italic':
      mdText = selected ? `_${selected}_` : '_курсив_';
      break;
    case 'link':
      mdText = selected ? `[${selected}](http://)` : '[ссылка](http://)';
      break;
    default:
      return;
  }

  const newContent = text.slice(0, start) + mdText + text.slice(end);
  handleChange('content', newContent);

  // Вернём фокус и установим курсор после вставки
  requestAnimationFrame(() => {
    textarea.focus();
    const cursorPos = start + mdText.length;
    textarea.setSelectionRange(cursorPos, cursorPos);
  });
}



  if (!selectedNote) return <div className="p-4 text-gray-500">Выберите заметку или создайте новую</div>;

  return (
    <div className="flex flex-col h-full">
      <input
        className="border-b p-2 text-xl font-semibold outline-none"
        value={noteData.title}
        onChange={e => handleChange('title', e.target.value)}
        placeholder="Заголовок заметки"
      />
      <input
        type="text"
        value={noteData.folder}
        onChange={e => handleChange('folder', e.target.value)}
        placeholder="Папка (например: Проекты)"
        className="border px-2 py-1 w-full mb-2"
      />
      <div className="flex gap-2 border-b p-2 bg-white items-center">
        <button className="px-2 py-1 border rounded text-sm hover:bg-gray-100" onClick={() => insertMarkdown('bold')}>
          Bold
        </button>
        <button className="px-2 py-1 border rounded text-sm hover:bg-gray-100" onClick={() => insertMarkdown('italic')}>
          Italic
        </button>
        <button className="px-2 py-1 border rounded text-sm hover:bg-gray-100" onClick={() => insertMarkdown('link')}>
          Link
        </button>
        <div className="ml-auto flex gap-2">
          <button
            onClick={() => setMode('edit')}
            className={`px-2 py-1 text-sm rounded border ${mode === 'edit' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
          >
            ✏️ Редактировать
          </button>
          <button
            onClick={() => setMode('preview')}
            className={`px-2 py-1 text-sm rounded border ${mode === 'preview' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
          >
            👀 Предпросмотр
          </button>
        </div>
      </div>
      {mode === 'edit' ? (
        <textarea
          ref={textareaRef}
          className="flex-1 p-3 w-full resize-none outline-none bg-gray-50"
          value={noteData.content}
          onChange={e => handleChange('content', e.target.value)}
          placeholder="Начни писать..."
        />
      ) : (
        <div className="flex-1 p-3 overflow-auto bg-white border rounded">
          <ReactMarkdown breaks={true}>{noteData.content}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
