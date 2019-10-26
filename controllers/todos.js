const Todo = require('../models/Todo');

const getAll = (req, res) => {
    Todo.find({
    }, (err, docs) => {
        if (!err) {
            res.json({
                "status": "success",
                "data": {
                    "todos": docs
                }
            });
        }
    })
}

const create = (req, res, next) => {
    let todo = new Todo();
    todo.text = req.body.text;
    todo.user = req.body.user;
    todo.date = req.body.date;
    todo.completed = req.body.completed;
    todo.removed = req.body.removed;
    todo.save((err, doc) => {

        if (err) {
            res.json({
                "status": "error",
                "message": "Could not save this todo item"
            })
        }

        if (!err) {
            res.json({
                "status": "success",
                "data": {
                    "todo": doc
                }
            });
        }
    });
}


let put = (req, res) => {
    Todo.updateOne({
        _id: req.body.id
    }, {
        completed: req.body.completed,
        removed:req.body.removed
    }, {
        new: true
    }, (err, doc) => {
        if (!err) {
            res.json({
                "status": "success",
                "todoStatus": req.body.completed
            })
        } else {
            res.json({
                "status": "failed",
                "todoStatus": req.body.completed
            })
        }
    });
}

module.exports.getAll = getAll;
module.exports.create = create;
module.exports.put = put;