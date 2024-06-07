/** @format */

const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomThoughts, users, thoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
	console.log('connected');

	// Drop existing users
	await User.deleteMany({});

	// Drop existing thoughts
	await Thought.deleteMany({});

	// Create empty array to hold the users
	const users = [];

	// Loop 15 times -- add users to the users array
	for (let i = 0; i < 15; i++) {
		const fullName = getRandomName();
		const first = fullName.split(' ')[0];
		const last = fullName.split(' ')[1];
		const username = `${first}${last}${Math.floor(
			Math.random() * (99 - 18 + 1) + 18
		)}`;
		const email = `${username}@example.com`;

		users.push({
			username,
			email,
		});
	}

	// Add users to the collection and await the results
	const createdUsers = await User.collection.insertMany(users);

	// Add thoughts to the collection and await the results
	for (let i = 0; i < 100; i++) {
		const thought = getRandomThoughts(1)[0];
		thought.userId =
			createdUsers.ops[Math.floor(Math.random() * createdUsers.ops.length)]._id;
		thoughts.push(thought);
	}
	await Thought.collection.insertMany(thoughts);

	// Log out the seed data to indicate what should appear in the database
	console.table(users);
	console.table(thoughts);
	console.info('Seeding complete! 🌱');
	process.exit(0);
});
