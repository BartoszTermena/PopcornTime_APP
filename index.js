const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
var cors = require('cors')
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
app.use(cors())
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
app.set('view engine', 'ejs')
app.get('/', (req, res) => {
    res.send("hello")
})

app.get('/files', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if(!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      })
    }
    return res.json(files)
  })
})

app.get('/files/:filename', (req, res) => {
  gfs.files.findOne({filename: req.params.filename}, (err, file) => {
    if(!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exist'
      })
    }
    return res.json(file)
  })
})

app.get('/video/:filename', (req, res) => {
  gfs.files.findOne({filename: req.params.filename}, (err, file) => {
    if(!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exist'
      })
    }
    const readstream = gfs.createReadStream(file.filename)
    readstream.pipe(res)
  })
})

app.post('/upload', upload.single('file'), (req,res) => {
    res.json({file: req.file})
    console.log(req.file)
})


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
})