"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: For production, dependencies should be included in the Docker image rather than installed at runtime
// Check if dependencies are installed, if not install them
try {
    require('express');
    require('ejs');
}
catch (e) {
    console.log('Dependencies not found, installing...');
    const { execSync } = require('child_process');
    // Run npm install in the current directory where package.json is located
    execSync('npm install', { stdio: 'inherit', cwd: __dirname });
    console.log('Dependencies installed successfully');
}
const express_1 = __importDefault(require("express"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const hostname = '0.0.0.0';
const port = 3000;
// Serve static files from the "public" directory
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// Set up view engine
app.set('view engine', 'html');
app.engine('html', ejs_1.default.renderFile);
app.set('views', path_1.default.join(__dirname, 'public'));
// Route for the home page
app.get('/', (req, res) => {
    res.render('index.html');
});
// Route for the mount page
app.get('/mount', (req, res) => {
    res.render('mount.html');
});
// Route to serve JSON data
app.get('/api/data', (req, res) => {
    const data = [
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
