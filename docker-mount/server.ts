// TODO: For production, dependencies should be included in the Docker image rather than installed at runtime
// Check if dependencies are installed, if not install them
try {
  require('express');
  require('ejs');
} catch (e) {
  console.log('Dependencies not found, installing...');
  const { execSync } = require('child_process');
  // Run npm install in the current directory where package.json is located
  execSync('npm install', { stdio: 'inherit', cwd: __dirname });
  console.log('Dependencies installed successfully');
}

import express, { Express, Request, Response } from 'express';
import ejs from 'ejs';
import path from 'path';

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
app.get('/api/data', (req: Request, res: Response) => {
   interface ApiData {
     id: number;
     name: string;
   }
   const data: ApiData[] = [
     { id: 1, name: 'Item 1' },
     { id: 2, name: 'Item 2' },
     { id: 3, name: 'Item 3' }
   ];
   res.json({
     message: 'Hello World from JSON API',
     timestamp: new Date(),
     data
   });
});

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  console.log(`JSON API available at http://${hostname}:${port}/api/data`);
});