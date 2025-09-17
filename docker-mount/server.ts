import express, { Express, Request, Response } from 'express';
import ejs from 'ejs';
import path from 'path';
import sqlite3 from 'sqlite3';

const app: Express = express();

const hostname = '0.0.0.0';
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up view engine
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.set('views', path.join(__dirname, 'public'));

// Route for the home page
app.get('/', (req: Request, res: Response) => {
   res.render('index.html');
});

// Route for the mount page
app.get('/mount', (req: Request, res: Response) => {
   res.render('mount.html');
});

// Route to serve JSON data
app.get('/api/data', async (req: Request, res: Response) => {
  const dbPath = path.join(__dirname, 'definitions.db');
  const db = new sqlite3.Database(dbPath);

  db.all('SELECT row_id, term, meaning FROM definitions ORDER BY row_id', (err: Error | null, rows: any[]) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Database query failed' });
      db.close();
      return;
    }

    res.json({
      message: 'Hello World from JSON API',
      timestamp: new Date(),
      data: rows
    });

    db.close();
  });
});

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  console.log(`JSON API available at http://${hostname}:${port}/api/data`);
});