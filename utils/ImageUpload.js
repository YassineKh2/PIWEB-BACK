

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
const storageStaff = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/staff/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' +file.originalname)
    }
})

const upload = multer({ storage: storage }).single('image')

const uploadPlayerImg = multer({ storage: storagePlayer }).single('image')

const uploadStaffImg = multer({ storage: storageStaff }).single('image')


const uploadImg = (req, res, next) => {
    console.log(req.body)
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message })
        }
        req.body.imagename = req.file.filename
        next()
    })
}
const uploadImgPlayer = (req, res, next) => {
    uploadPlayerImg(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message })
        }
        req.body.imagename = req.file.filename
        next()
    })
}

const uploadImgStaff = (req, res, next) => {
    uploadStaffImg(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message })
        }
        req.body.imagename = req.file.filename
        next()
    })
}

module.exports = {
    uploadImg,
    uploadImgPlayer,
    uploadImgStaff
};