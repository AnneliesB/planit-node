const List = require('../models/List');

const getAll = (req, res) => {
    List.find({
    }, (err, docs) => {
        if (!err) {
            res.json({
                "status": "success",
                "data": {
                    "lists": docs
                }
            });
        }
    }).sort('-_id');
}

const create = (req, res) =>{
    let list = new List();
    list.listname = req.body.listname;
    list.user = req.body.user;
    list.status = req.body.status;
    list.removed = req.body.removed;

    list.save((err, doc) => {
        if (err) {
            res.json({
                "status": "error",
                "message": err
            });
        }
        if (!err) {
            res.json({
                "status": "success",
                "data": {
                    "list": doc
                }
            });
        }
    });
}

let put = (req, res) =>{
    List.update({
        _id: req.body.id
    }, {
        removed:req.body.removed
    }, {
        new: true
    }, (err, doc) => {
        if (!err) {
            res.json({
                "status": "success"
            })
        } else {
            res.json({
                "status": "failed"
            })
        }
    });
}

module.exports.getAll = getAll;
module.exports.create = create;
module.exports.put = put;