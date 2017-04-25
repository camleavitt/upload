var express = require('express')
var multer = require('multer')
var app = express()
var port = process.env.PORT || 1337
var path = require('path')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({ storage: storage })

app.use(express.static('public'))

app.post('/upload', upload.single('file'), function (req, res, next) {
  let {path} = req.file
  console.log(`^uploads^ new upload: ${path}`)
  res.redirect(path)
})

app.listen(port, function () {
  console.log('^uploads^')
})
