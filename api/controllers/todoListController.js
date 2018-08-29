var mongoose = require('mongoose'),
    task = mongoose.model('Tasks');
var jwt = require('jsonwebtoken')
exports.list_all_tasks = function(req,res){
    Task.find({},function (err,task){
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.create_a_task = function(req,res){
    var new_task = new Task (req.body);
    new_task.save(function(err, task){
        if(err)
            res.send(err);
        res.json(task);    
    });
};

exports.read_task = function(req,res){
    Task.findById(req.params.taskId, function(err,task){
        if(err)
            res.send(err)
        const token = jwt.sign({
            name : task.name,
            taskId :  task._id
        }, 'secret',
        {
            expiresIn: "1h"
        }
    )
        res.json({
            task,
            token :token
        });
    });
};

exports.update_a_task = function (req,res){
    Task.findOneAndUpdate({_id:req.params.taskId}, req.body, {new:true},function(err,task){
        if(err)
            res.send(err)
        res.json(task);
    });
};

exports.delete_a_task = function(req,res){
    Task.remove({
        _id: req.params.taskId
    }, function (err,task){
        if(err)
            res.send(err)
        res.json({message: 'Task Successfully Deleted'});
    });
};