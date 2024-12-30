import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




// Set up storage configuration
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, path.join(__dirname, '../public/image'));
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' +file.originalname;
        cb(null, name);
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });




export default upload;
