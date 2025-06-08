import sqlite3

def create_db_with_note(db_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Создаём таблицу заметок
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    """)

    # Добавляем одну тестовую заметку
    cursor.execute("""
    INSERT INTO notes (title, content) VALUES (?, ?)
    """, ("Первая заметка", "Это содержимое первой заметки."))

    conn.commit()
    conn.close()

if __name__ == "__main__":
    create_db_with_note("notes.db")
    print("База с одной заметкой создана успешно!")
