/** @format */

const names = ['Aaran', 'Jake'];

const thoughtText = ['Decision Tracker', 'Find My Phone'];

const reactionBody = [
	'I agree!',
	'Great thought!',
	'I have a different perspective.',
];

const users = [];
const thoughts = [];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () =>
	`${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

// Function to generate random thoughts
const getRandomThoughts = (int) => {
	const results = [];
	for (let i = 0; i < int; i++) {
		results.push({
			thoughtText: getRandomArrItem(thoughtText),
			username: getRandomName(),
			reactions: [...getReactions(3)],
		});
	}
	return results;
};

// Function to generate random reactions
const getReactions = (int) => {
	const results = [];
	for (let i = 0; i < int; i++) {
		results.push({
			reactionBody: getRandomArrItem(reactionBody),
			username: getRandomName(),
		});
	}
	return results;
};

// Export the functions for use in seed.js
module.exports = {
	getRandomName,
	getRandomThoughts,
	getReactions,
	users,
	thoughts,
};
