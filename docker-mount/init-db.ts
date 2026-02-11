import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.join(__dirname, 'prisma', 'definitions.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS definitions (
    row_id INTEGER PRIMARY KEY AUTOINCREMENT,
    term TEXT NOT NULL,
    meaning TEXT NOT NULL
  )`);

  // Insert initial data
  const terms = [
    { term: 'Node.js', meaning: 'A JavaScript runtime environment built on Chrome\'s V8 engine, used for building scalable server-side applications and network applications.' },
    { term: 'Docker', meaning: 'A platform for developing, shipping, and running applications inside lightweight, portable containers that ensure consistency across environments.' },
    { term: 'Bind Mount', meaning: 'A Docker volume type that maps a specific file or directory from the host machine directly into a container, allowing real-time file sharing.' },
    { term: 'JSON', meaning: 'JavaScript Object Notation, a lightweight data-interchange format that is easy for humans to read and write, and easy for machines to parse and generate.' }
  ];

  terms.forEach(({ term, meaning }) => {
    db.run(`INSERT OR IGNORE INTO definitions (term, meaning) VALUES (?, ?)`, [term, meaning]);
  });

  console.log('Database and table "definitions" created successfully. Initial data inserted.');
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Database connection closed.');
});