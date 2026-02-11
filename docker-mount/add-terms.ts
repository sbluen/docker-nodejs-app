import * as sqlite3 from 'sqlite3';
import * as path from 'path';
import type { Statement } from 'sqlite3';

const dbPath = path.join(__dirname, 'prisma', 'definitions.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // Insert new terms (OR IGNORE to avoid duplicates)
  const newTerms = [
    { term: 'Express.js', meaning: 'A fast, unopinionated, minimalist web framework for Node.js that simplifies the development of server-side applications.' },
    { term: 'TypeScript', meaning: 'An open-source programming language developed and maintained by Microsoft, which is a strict syntactical superset of JavaScript and adds optional static typing.' },
    { term: 'jQuery', meaning: 'A fast, small, and feature-rich JavaScript library that makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API.' }
  ];

  newTerms.forEach(({ term, meaning }) => {
    db.run(`INSERT OR IGNORE INTO definitions (term, meaning) VALUES (?, ?)`, [term, meaning], function(this: sqlite3.RunResult, err: Error | null) {
      if (err) {
        console.error(`Error inserting ${term}:`, err.message);
      } else {
        console.log(`Inserted or already exists: ${term} (row_id: ${this.lastID})`);
      }
    });
  });

  console.log('Migration complete: Added new terms to definitions table.');
});

db.close(function(err: Error | null) {
  if (err) {
    console.error(err.message);
  }
  console.log('Database connection closed.');
});