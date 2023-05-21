const { Thought, User } = require("../models");

module.exports = {
  // Get : To get all thoughts.
  async getAllThoughts(req, res) {
    try {
      const results = await Thought.find({});
      res.status(200).json(results);
    } catch (err) {
      console.log(
        'Unable to retrieve all thoughts from the database. Error: ' + err
      );
      res.status(500).json({
        message:
          'Something went wrong while retriving all thoughts from the database.',
      });
    }
  },

  async getOneThought(req, res) {
    try {
      const results = await Thought.findById(req.params.id);
      res.status(200).json(results);
    } catch (err) {
      console.log(
        'Error in retrieving one thought by id from the database. Error: ' + err
      );
      res
        .status(500)
        .json({ message: 'Unable to retieve thought from the database.' });
    }
  },

  async createThought(req, res) {
    try {
      const { thoughtText } = req.body;
      if (!thoughtText) {
        res.status(400).json({
          message:
            'Please ensure to enter valid text in order to update the thought.',
        });
      }
      const newThought = await Thought.create({
        thoughtText: thoughtText,
        username: req.params.id,
      });
      const user = await User.findById(req.params.id);
      user.thoughts.push(newThought);
      const updatedUser = await user.save();

      res.status(200).json(newThought);
    } catch (err) {
      console.log(
        'Error in creating a new thought in the database. Error: ' + err
      );
      res
        .status(500)
        .json({ message: 'Unable to create a new thought in the database.' });
    }
  },

  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.id,
        { thoughtText: req.body.thoughtText },
        { new: true }
      );
      res.status(200).json(updatedThought);
    } catch (err) {
      console.log(
        'Error in updating a thought by id in the database. Error: ' + err
      );
      res
        .status(500)
        .json({ message: 'Unable to update thought in the database.' });
      } 
      