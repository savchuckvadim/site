// modules/db/index.ts
import Database from 'better-sqlite3';

export function openDB() {
  const db = new Database('./db/gallery.db', { verbose: console.log });

  db.exec(`
      CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      order_number INTEGER DEFAULT 0
    );
  `);

  console.log("База данных подключена");
  return db;
}
