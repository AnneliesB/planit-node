const Todo = require('../models/Todo');

const getAll = (req, res) => {
    Todo.find({
        "user": "jos"
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

    console.log(req.body);
    let todo = new Todo();
    todo.text = req.body.text;
    todo.user = req.body.user;
    todo.completed = req.body.completed;
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

module.exports.getAll = getAll;
module.exports.create = create;