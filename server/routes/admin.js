const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const adminSchema = require('../Schema/adminSchema');
const courseSchema = require('../Schema/courseSchema');
const { accountValidate , courseValidation} = require('../utils/validate');
const { z } = require('zod');
const JWT_SECRET = process.env.JWT_SECRET;
const auth = require('../utils/auth');

// Admin routes
router.post('/signup',async (req, res) => {
  // logic to sign up admin
  const adminParse = accountValidate.safeParse(req.headers);
  if(!adminParse.success){
    return res.status(402).json({
      message : adminParse.error.format(),
    })
  }
  const { username, password } = req.headers;
  try{
    const user = await adminSchema.create({
      username, 
      password
    })
    const token = jwt.sign({
      id : user._id,
    }, JWT_SECRET)
    res.status(200).json({
      token
    })
  }catch(e) {
    console.log(e);
    res.status(500).json({
      message : "Something Went wrong!!",
    })
  }
});

router.post('/login',async (req, res) => {
    // logic to log in admin
    console.log(req.headers);
    const adminParse = accountValidate.safeParse(req.headers);
    if(!adminParse.success){
      return res.status(402).json({
        message : adminParse.error.format(),
      })
    }
    const { username, password } = req.headers;
    try{
      const user = await adminSchema.findOne({
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

router.post('/create',auth, async (req, res) => {
    // logic to create a course
    const token = req.authorization;
    const validate = courseValidation.safeParse(req.body);
    if(!validate.success) return res.status(400).json({
      error : validate.error.format(),
    })
    const { title , description , price , imageLink , published } = req.body; 
    try{
      const course =await courseSchema.create({
        title,
        description, 
        price, 
        imageLink, 
        published
      });
      res.status(200).json({
        message : 'course created'
      })
    }catch(e){
      console.log(e);
      res.status(500).json({
        message : 'something went wrong',
      });
    }
});

router.put('/courses/:courseId',auth ,  async (req, res) => {
    // logic to edit a course
    const { courseId } = req.params;
    const validate = courseValidation.safeParse(req.body);
    if(!validate.success) return res.status(400).json({
      error : validate.error.format(),
    })
    const { title , description , price , imageLink , published } = req.body;
    try{
    const data = await courseSchema.findOneAndUpdate({ _id : courseId }, {
      title , 
      description , 
      price , 
      imageLink , 
      published
    })
    if(!data) throw new Error('No course found');
    res.status(200).json({
      message : 'Course updated',
    })
  }catch(e){
    console.log(e);
    res.status(500).json({
      message : 'something went wrong'
    })
  }
});

router.get('/courses', auth, async (req, res) => {
    // logic to get all courses
    try{
      const data = await courseSchema.find();
      if(!data) throw new Error('No data found');
      res.status(200).json(data);
    }catch(e){
      console.log(e);
      res.status(500).json({
        message : "something went wrong."
      })
    }
});

router.get('/courses/:courseId',auth, async (req, res) => {
  const { courseId } = req.params;
  try{
    const data = await courseSchema.findById(courseId);
    if(!data) throw new Error('No data found');
    res.status(200).json(data);
  }catch(e){
    console.log(e);
    res.status(500).json({
      message : "something went wrong."
    })
  }
});

module.exports = router;
