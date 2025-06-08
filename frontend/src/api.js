const API_BASE = "http://127.0.0.1:5000/api";

export async function getNotes() {
  const res = await fetch(`${API_BASE}/notes`);
  if (!res.ok) throw new Error("Ошибка загрузки заметок");
  return res.json();
}

export async function saveNote(note) {
  const method = note.id ? "PUT" : "POST";
  const url = note.id ? `${API_BASE}/note/${note.id}` : `${API_BASE}/note`;

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });

  if (!res.ok) throw new Error("Ошибка сохранения заметки");
  return res.json();
}

export async function deleteNote(id) {
  const res = await fetch(`${API_BASE}/note/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Ошибка удаления заметки");
  return res.json();
}
