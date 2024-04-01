

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/teams/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' +file.originalname)
    }
})

const storagePlayer = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/players/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' +file.originalname)
    }
})

const upload = multer({ storage: storage }).single('image')

const uploadPlayerImg = multer({ storage: storagePlayer }).single('image')


const uploadImg = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message })
        }
        req.body.imagename = req.file.filename
        next()
    })
}
const uploadImgPlayer = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message })
        }
        req.body.imagename = req.file.filename
        next()
    })
}

const storageCert = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/certificate/') // Assurez-vous que ce répertoire existe
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' +file.originalname)
    }
});

const uploadCert = multer({ storage: storageCert }).single('certificate');



const storageImg = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/image/') // Assurez-vous que ce répertoire existe
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' +file.originalname)
    }
});

const uploadImgUser = multer({ storage: storageImg }).single('image');


module.exports = {
    uploadImg,
    uploadImgPlayer,
   uploadImgUser,
    uploadCert
};