import sqlite3
from config import DB_PATH, DB_PASSWORD

def connect():
    conn = sqlite3.connect(DB_PATH)
    conn.execute(f"PRAGMA key='{DB_PASSWORD}';")
    return conn

def get_all_notes():
    conn = connect()
    cur = conn.cursor()
    cur.execute("SELECT id, title, content, folder, created_at, updated_at FROM notes ORDER BY updated_at DESC")
    notes = [{"id": r[0], "title": r[1], "content": r[2], "folder": r[3] or '', "created_at": r[4], "updated_at": r[5]} for r in cur.fetchall()]
    conn.close()
    return notes

def get_note(note_id):
    conn = connect()
    cur = conn.cursor()
    cur.execute("SELECT id, title, content, folder FROM notes WHERE id=?", (note_id,))
    r = cur.fetchone()
    conn.close()
    if r:
        return {"id": r[0], "title": r[1], "content": r[2], "folder": r[3] or ''}
    return {}

def create_note(title, content, folder=''):
    conn = connect()
    cur = conn.cursor()
    cur.execute("INSERT INTO notes (title, content, folder) VALUES (?, ?, ?)", (title, content, folder))
    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return get_note(new_id)

def update_note(note_id, title, content, folder=''):
    conn = connect()
    cur = conn.cursor()
    cur.execute(
        "UPDATE notes SET title=?, content=?, folder=?, updated_at=CURRENT_TIMESTAMP WHERE id=?",
        (title, content, folder, note_id)
    )
    conn.commit()
    conn.close()
    return get_note(note_id)

def delete_note(note_id):
    conn = connect()
    cur = conn.cursor()
    cur.execute("DELETE FROM notes WHERE id=?", (note_id,))
    conn.commit()
    conn.close()
    return {"success": True}
