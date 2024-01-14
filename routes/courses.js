'use strict';

const express = require('express');
const router = express.Router();
const Course = require('../models').Course;
const User = require('../models').User;
const { asyncHandler } = require('../middleware/async-handler');
const { authenticateUser } = require('../middleware/auth-user');

//GET route /api/courses that will return a list of all courses including the User that owns each course and a 200 HTTP status code.
router.get('/', asyncHandler(async (req, res) => {
  const courses = await Course.findAll({
    include: [{ model: User }]
  });

  if (courses) {
    res.json(courses);
  } else {
    res
      .status(404)
      .json({ message: "Sorry, no courses found. :(" });
  }
}));

//GET route /api/courses/:id that will return the corresponding course along with the User.
router.get('/:id', asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id, {
    include: [{ model: User }]
  });

  if (course) {
    res.json(course);
  } else {
    res
      .status(404)
      .json({ message: "Sorry, No course found. :(" });
  }
}));


//POST route /api/courses that will CREATE a new course and return a 201 HTTP status code and no content.
router.post('/', authenticateUser, asyncHandler(async (req, res) => {
  try {
    const course = await Course.create(req.body);
    //console.log(course);
    res
      .status(201)
      .location('/api/courses/' + course.id)
      .end();
  } catch (error) {
    console.log('ERROR: ', error.name);

    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res
        .status(400)
        .json({ errors });
    } else {
      throw error;
    }
  }
}));

//PUT route /api/courses/:id that will UPDATE the corresponding course and return a 204 HTTP status code and no content.
router.put('/:id', authenticateUser, asyncHandler(async (req, res) => {
  try {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res
        .status(400)
        .json({ message: "No updated content found. :(" });
    }

    const course = await Course.findByPk(req.params.id);

    if (course) {
      await course.update({
        title: req.body.title,
        description: req.body.description,
        estimatedTime: req.body.estimatedTime,
        materialsNeeded: req.body.materialsNeeded,
        userId: req.body.userId
      });

      res
        .status(204)
        .end();
    } else {
      res
        .status(404)
        .json({ message: "Sorry, course not found. :(" });
    }
  } catch (error) {
    console.log('ERROR: ', error.name);

    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res
        .status(400)
        .json({ errors });
    } else {
      throw error;
    }
  }
}));

//DELETE route /api/courses/:id that will DELETE the corresponding course and return a 204 HTTP status code and no content.
router.delete('/:id', authenticateUser, asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id);

  if (course) {
    await course.destroy();
    res
      .status(204)
      .end();
  } else {
    res
      .status(404)
      .json({ message: "Sorry, No Courses found. :(" });
  }
}));

module.exports = router;