<!-- @format -->

# Social Network API

This is a backend API for a social network application built with Node.js, Express.js, and MongoDB. It provides routes for users, thoughts, friends, and reactions, allowing clients to perform CRUD operations on these resources.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Technologies](#technologies)
- [License](#license)

## Installation

1. Clone the repository:

```

git clone https://github.com/jakepears/socialnetworkapi.git

```

2. Install the dependencies:

```

cd socialnetworkapi
npm install

```

3. Set up the MongoDB database:

- Make sure you have MongoDB installed on your machine.
- Update the MongoDB connection URL in the `config/connection.js` file if necessary.

4. Seed the database (optional):

```

npm run seed

```

## Usage

1. Start the server:

```

npm start

```

2. Use a tool like Insomnia or Postman to test the API routes.

## API Routes

### User Routes

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a single user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user by ID
- `DELETE /api/users/:id` - Delete a user by ID

### Thought Routes

- `GET /api/thoughts` - Get all thoughts
- `GET /api/thoughts/:id` - Get a single thought by ID
- `POST /api/thoughts` - Create a new thought
- `PUT /api/thoughts/:id` - Update a thought by ID
- `DELETE /api/thoughts/:id` - Delete a thought by ID

### Friend Routes

- `POST /api/users/:userId/friends/:friendId` - Add a friend to a user's friend list
- `DELETE /api/users/:userId/friends/:friendId` - Remove a friend from a user's friend list

### Reaction Routes

- `POST /api/thoughts/:thoughtId/reactions` - Add a reaction to a thought
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId` - Remove a reaction from a thought

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose

## License

This project is licensed under the [MIT License](LICENSE).
