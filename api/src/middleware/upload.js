
const fs = require('fs');
const multer = require("multer");
const path = require('path');

const ROOT_DIR = process.cwd();

const maxSize = 20 * 1024 * 1024;






let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const date = new Date();
        const uploadPath = path.join(ROOT_DIR, 'uploads', `${date.getFullYear()}`, `${date.getMonth()}`, `${date.getDate()}`);


        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, {
                recursive: true
            });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        let fileName = `${new Date().getTime()}--${file.originalname}`;
        cb(null, fileName);
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single("file");


module.exports = upload;