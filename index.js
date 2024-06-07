/** @format */

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

mongoose.connect(
	process.env.MONGODB_URI || 'mongodb://localhost/social-network-api',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
