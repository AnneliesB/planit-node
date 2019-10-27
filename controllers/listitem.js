const ListItem = require("../models/ListItem");

let get = (req, res) => {

    ListItem.find({}, (err, docs) => {
        if (!err) {
            res.json({
                "status": "success",
                "data": {
                    "listitems": docs
                }
            });
        }
    });
}


let put = (req, res) => {
    ListItem.update({
        _id: req.body.id
    }, {
        status: req.body.status,
        removed: req.body.removed
    }, {
        new: true
    }, (err, doc) => {
        if (!err) {
            res.json({
                "status": "success",
                "listitemStatus": req.body.status
            })
        } else {
            res.json({
                "status": "failed",
                "listitemStatus": req.body.status
            })
        }
    });
}

let post = (req, res) => {
    let listItem = new ListItem();
    listItem.user = req.body.user;
    listItem.description = req.body.description;
    listItem.id = req.body.id;
    listItem.status = req.body.status;
    listItem.removed = req.body.removed;


    listItem.save((err, doc) => {
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
                    "listitem": doc
                }
            });
        }
    });
}


module.exports.get = get;
module.exports.put = put;
module.exports.post = post;