/** @format */

const User = require('../models/Users');
const Thought = require('../models/Thoughts');

module.exports = {
	getAllUsers: async (req, res) => {
		try {
			const users = await User.find().populate('thoughts friends');
			res.json(users);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	getUserById: async (req, res) => {
		try {
			const user = await User.findById(req.params.id).populate(
				'thoughts friends'
			);
			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}
			res.json(user);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	createUser: async (req, res) => {
		try {
			const user = await User.create(req.body);
			res.json(user);
		} catch (err) {
			res.status(400).json(err);
		}
	},

	updateUser: async (req, res) => {
		try {
			const user = await User.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
				runValidators: true,
			});
			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}
			res.json(user);
		} catch (err) {
			res.status(400).json(err);
		}
	},

	deleteUser: async (req, res) => {
		try {
			const user = await User.findByIdAndDelete(req.params.id);
			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}
			await Thought.deleteMany({ username: user.username });
			res.json({ message: 'User and associated thoughts deleted' });
		} catch (err) {
			res.status(500).json(err);
		}
	},

	addFriend: async (req, res) => {
		try {
			const user = await User.findByIdAndUpdate(
				req.params.userId,
				{ $addToSet: { friends: req.params.friendId } },
				{ new: true }
			);
			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}
			res.json(user);
		} catch (err) {
			res.status(400).json(err);
		}
	},

	removeFriend: async (req, res) => {
		try {
			const user = await User.findByIdAndUpdate(
				req.params.userId,
				{ $pull: { friends: req.params.friendId } },
				{ new: true }
			);
			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}
			res.json(user);
		} catch (err) {
			res.status(400).json(err);
		}
	},
};
