const express = require('express');
const Router = express.Router();
const jwt = require('jsonwebtoken');
const userSchema = require('../Schema/userSchema');
const { accountValidate } = require('../utils/validate')
const { z } = require('zod');
const JWT_SECRET = process.env.JWT_SECRET;
const courseSchema = require('../Schema/courseSchema');
const auth = require('../utils/auth')

// User routes
Router.post('/signup', async (req, res) => {
  // logic to sign up user
  const validate = accountValidate.safeParse(req.body);
  if(!validate.success){
    return res.status(402).json({
      message : validate.error.format(),
    })
  }
  const { username, password } = req.body;
  try{
    const user = await userSchema.create({
      username, 
      password
    })
    const token = jwt.sign({
      id : user._id
    }, JWT_SECRET)
    res.status(200).json({
      token
    })
  }catch(e) {
    console.log(e)
    res.status(500).json({
      message : e.message,
    })
  }
});

Router.post('/login',async (req, res) => {
  // logic to log in user
  console.log(req.headers);
  const validate = accountValidate.safeParse(req.body);
      if(!validate.success){
        return res.status(402).json({
          message : validate.error.format(),
        })
      }
      const { username, password } = req.body;
      try{
        const user = await userSchema.findOne({
          username, 
          password
        });
        if(!user) throw new Error('User not Found.');
        const token = jwt.sign({
          id : user._id,
        }, JWT_SECRET);
        res.status(200).json({
          token
        });
      }catch(e) {
        console.log(e);
        res.status(400).json({
          message : e,
        });
      }
});

Router.get('/courses',auth, async (req, res) => {
  // logic to list all courses
  try{
        const data =await courseSchema.find({published : true});
        if(!data) throw new Error('No data found');
        console.log(data)
        res.status(200).json(data);
      }catch(e){
        console.log(e);
        res.status(500).json({
          message : "something went wrong.",
          error : e.message,
        })
      }
});

Router.post('/courses/:courseId',auth,  async (req, res) => {
  // logic to purchase a course
  try{
    const { courseId } = req.params;
    const id = req.authorization.id;
    console.log(id);
    const data = await userSchema.findById(id);
    if(!data) return res.status(400).json({message : 'user not found'});
    const course = await courseSchema.findOne({_id : courseId, published : true});
    if(!course) return res.status(400).json({message : 'course not found'});
    data.coursesAccess.push(course);
    await data.save();
    res.status(200).json({
      message : 'course added'
    })
  }catch(e){
    res.status(500).json({
      message : 'Something went wrong.',
      error : e.message,
    })
  }
});

Router.get('/purchasedCourses',auth,async (req, res) => {
  // logic to view  purchased courses
  const token = req.authorization;
  try{
      const data =await userSchema.findById(token.id).populate("coursesAccess");
      console.log(data);
      if(!data) return res.status(404).json({
        message : "no data found!",
      });
      res.status(200).json({
        user : data,
      });
    }catch(e){
      console.log(e);
      res.status(500).json({
        message : "Something went wrong.", 
        error : e.message,
      })
    }
});

module.exports = Router;