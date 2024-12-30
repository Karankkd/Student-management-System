import express from 'express';
import frontroutes from './routes/frontendroutes.js';
import db from './config/DBconnect.js';
import { fileURLToPath } from 'url';
import path from 'path';
import adminroutes from './routes/adminroutes.js';
import session from 'express-session';

// Get the __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
db();


const secretkey = '20160090825'
app.use(session({secret:secretkey , resave:false , saveUninitialized:false}))




// Use JSON middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use frontend routes
app.use('/', frontroutes);
app.use('/', adminroutes);

app.listen(3232, () => {
    console.log('Server is running');
});

//  http://127.0.0.1:3232