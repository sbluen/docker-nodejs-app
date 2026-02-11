import * as sqlite3 from 'sqlite3';
import * as path from 'path';

const dbPath = path.join(__dirname, '..', 'prisma', 'definitions.db');
const db = new sqlite3.Database(dbPath);
db.serialize(() => {
    // Insert SQLite (OR IGNORE to avoid duplicates)
    db.run(`INSERT OR IGNORE INTO definitions (term, meaning) VALUES ('SQLite', 'A lightweight, serverless, self-contained relational database engine that stores data in a single file, making it ideal for embedded applications, mobile apps, and small to medium-sized projects where simplicity and zero-configuration are key.')`, function (err) {
        if (err) {
            console.error('Error inserting SQLite:', err.message);
        }
        else {
            console.log(`SQLite inserted or already exists (row_id: ${this.lastID})`);
        }
    });
    // Insert JSON API (OR IGNORE to avoid duplicates; using INSERT instead of UPDATE without WHERE to avoid updating all rows)
    db.run(`INSERT OR IGNORE INTO definitions (term, meaning) VALUES ('JSON API', 'An application programming interface using JavaScript Object Notation, a lightweight data-interchange format that is easy for humans to read and write, and easy for machines to parse and generate.')`, function (err) {
        if (err) {
            console.error('Error inserting JSON API:', err.message);
        }
        else {
            console.log(`JSON API inserted or already exists (row_id: ${this.lastID})`);
        }
    });
    console.log('Migration complete: 20250917_updates applied.');
});
db.close(function (err) {
    if (err) {
        console.error(err.message);
    }
    console.log('Database connection closed.');
});
