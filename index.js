const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const mongoose = require('mongoose')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const methodOverride = require('method-override')

const app = express()

//Middleware
app.use(bodyParser.json())
app.use(methodOverride('_method'))

//Mongo URI
const mongoURI = 'mongodb://bartosz:test123@ds127736.mlab.com:27736/popcorn-time'
//Mongo connection
const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true })

//Gridfs-stream
let gfs;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('uploads')
})
//Storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
});
const upload = multer({ storage });

app.get('/', (req, res) => {
    res.send("Hello")
})
app.post('/upload', upload.single('file'), (req,res) => {
    console.log(req.file)
    res.send("file saved on server");
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
})