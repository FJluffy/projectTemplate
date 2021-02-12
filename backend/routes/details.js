const router = require('express').Router();
let Detail = require('../models/detail.model');
const multer = require( 'multer');

//images folder
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png' || ext !== '.mp4') {
            return cb(res.status(400).end('only jpg,png,mp4 are allowed'), false);
        }
        cb(null, true)
    }
})
router.route('/images/add').post((req, res) => {
    upload(req, res, err => {
        if (err) return res.json({ success: false, err })
        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    })
});
var upload = multer({ storage: storage }).single("file")

router.route('/').get((req, res) => {
    Detail.find()
        .then(details => res.json(details))
        .catch(err => res.status(400).json('Error ' + err));
    // let order = req.body.order ? req.body.order : "desc";
    // let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    // let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    // let skip = parseInt(req.body.skip);
    // let findArgs = {};
    // let term = req.body.searchTerm;

    // for (let key in req.body.filters) {
    //     if (req.body.filters[key].length > 0) {
    //         if (key === "price") {
    //             findArgs[key] = {
    //                 $gte: req.body.filters[key][0],
    //                 $lte: req.body.filters[key][1]
    //             }
    //         } else {
    //             findArgs[key] = req.body.filters[key];
    //         }
    //     }
    // }
    // console.log(findArgs)

    // if (term) {
    //     Detail.find(findArgs)
    //         .find({ $text: {$search:term}})
    //         //.populate("")
    //         .sort([[sortBy, order]])
    //         .skip(skip)
    //         .limit(limit)
    //         .exec((err, details) => {
    //             if (err) return res.status(400).json({ success: false, err })
    //             res.status(200).json({ success: true, details, postSize: details.length })
    //         })
    // } else {
    //     Detail.find(findArgs)
    //         //.populate("")
    //         .sort([[sortBy, order]])
    //         .skip(skip)
    //         .limit(limit)
    //         .exec((err, details) => {
    //             if (err) return res.status(400).json({ success: false, err })
    //             res.status(200).json({ success: true, details, postSize: details.length })
    //         })
    // }
});

router.route('/add').post((req, res) => {
    const accountname = req.body.accountname;
    const description = req.body.description;
    const price = Number(req.body.price);
    const date = Date.parse(req.body.date);
    const images = req.body.images;

    const newDetail = new Detail({
        accountname,
        description,
        price,
        date,
        images
    });

    newDetail.save()
        .then(() => res.json('Details added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Detail.findById(req.params.id)
        .then(detail => res.json(detail))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Detail.findByIdAndDelete(req.params.id)
        .then(() => res.json('Detail deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Detail.findById(req.params.id)
        .then(detail => {
            detail.accountname = req.body.accountname;
            detail.description = req.body.description;
            detail.price = Number(req.body.price);
            detail.date = Date.parse(req.body.date);
            detail.images = req.body.images;

            detail.save()
                .then(() => res.json('Detail updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + er));
});

module.exports = router;