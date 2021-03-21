const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Load User model
const User = require('../models/User');
const Task = require('../models/task');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  Task.findOne({email: req.user.email}).then((t) => {
    if(t){
      res.render('dashboard', {
        user: req.user,
        task: t.goal
      })
    }else{
      res.render('dashboard', {
        user: req.user,
        task: "No Goal Yet"
      })
    }
  })
  
);
router.post('/dashboard', ensureAuthenticated, (req, res) => {
  console.log(req.body.goal);
  //User.findOneAndUpdate({email: req.user.email}, {goal: req.body.goal}).then(() => {res.redirect('/dashboard')});
  Task.findOne({email:req.user.email}).then(t => {
    if(t){
      //t.goal = req.body.goal;
      Task.findOneAndUpdate({email: req.user.email}, {goal: req.body.goal}).then(() => {res.redirect('/dashboard')});
      //res.redirect('/dashboard')
    }
    else{
      const newTask = new Task({
        email: req.user.email,
        goal: req.body.goal
      })
      newTask.save().then(() => {res.redirect('/dashboard')})
    }
  })

})
router.get('/delete', ensureAuthenticated, (req, res)=>{
  Task.findOneAndDelete({email: req.user.email}).then(() => {res.redirect('/dashboard')});
  
})
module.exports = router;
