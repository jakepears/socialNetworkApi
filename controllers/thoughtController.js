/** @format */

const Thought = require('../models/Thoughts');
const User = require('../models/Users');

module.exports = {
	getAllThoughts: async (req, res) => {
		try {
			const thoughts = await Thought.find();
			res.json(thoughts);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	getThoughtById: async (req, res) => {
		try {
			const thought = await Thought.findById(req.params.id);
			if (!thought) {
				return res.status(404).json({ message: 'Thought not found' });
			}
			res.json(thought);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	createThought: async (req, res) => {
		try {
			const thought = await Thought.create(req.body);
			await User.findByIdAndUpdate(
				req.body.userId,
				{ $push: { thoughts: thought._id } },
				{ new: true }
			);
			res.json(thought);
		} catch (err) {
			res.status(400).json(err);
		}
	},

	updateThought: async (req, res) => {
		try {
			const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
				runValidators: true,
			});
			if (!thought) {
				return res.status(404).json({ message: 'Thought not found' });
			}
			res.json(thought);
		} catch (err) {
			res.status(400).json(err);
		}
	},

	deleteThought: async (req, res) => {
		try {
			const thought = await Thought.findByIdAndDelete(req.params.id);
			if (!thought) {
				return res.status(404).json({ message: 'Thought not found' });
			}
			await User.findByIdAndUpdate(
				thought.userId,
				{ $pull: { thoughts: thought._id } },
				{ new: true }
			);
			res.json({ message: 'Thought deleted' });
		} catch (err) {
			res.status(500).json(err);
		}
	},

	addReaction: async (req, res) => {
		try {
			const thought = await Thought.findByIdAndUpdate(
				req.params.thoughtId,
				{ $push: { reactions: req.body } },
				{ new: true, runValidators: true }
			);
			if (!thought) {
				return res.status(404).json({ message: 'Thought not found' });
			}
			res.json(thought);
		} catch (err) {
			res.status(400).json(err);
		}
	},

	removeReaction: async (req, res) => {
		try {
			const thought = await Thought.findByIdAndUpdate(
				req.params.thoughtId,
				{ $pull: { reactions: { reactionId: req.params.reactionId } } },
				{ new: true }
			);
			if (!thought) {
				return res.status(404).json({ message: 'Thought not found' });
			}
			res.json(thought);
		} catch (err) {
			res.status(400).json(err);
		}
	},
};
