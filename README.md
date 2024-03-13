# Trama B App

This project is a web application developed with Node.js and Express, providing a RESTful API for managing sustainability measures taken by users. Users can record measures related to material management and obtain information about the measures taken. The application uses MongoDB as its database, with Mongoose as the ODM.

## Project Structure

The project follows an organized structure as follows:

- **controllers/**: Contains the controllers for each model.
- **db/**: Contains the database configuration and Mongoose models.
- **handlers/**: Contains the handlers for each controller, managing HTTP requests and responses.
- **routers/**: Defines the application routes.
- **.env**: Configuration file for environment variables.
- **app.js**: Main application file.
- **package.json**: npm configuration file.

## Getting Started

Follow these steps to set up and run the project locally:

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Set up environment variables by creating a `.env` file based on the provided `.env.example`.
4. Start the server using `npm start`.

## API Usage

The API provides the following routes for managing measures and users:

### Users Routes

- `POST /users/create`: Creates a new user.
- `PUT /users/edit`: Edits an existing user.
- `GET /users/:id`: Gets user information by ID.
- `GET /users`: Gets all users.
- `DELETE /users/delete/:id`: Deletes a user by ID.
- `POST /users/login`: Allows registered users to log in and obtain an authentication token.

### Measures Routes

- `POST /measures/create`: Creates a new measure.
- `PUT /measures/edit`: Edits an existing measure.
- `GET /measures/:id`: Gets a measure by its ID.
- `GET /measures/getby`: Gets measures according to different criteria (see details in the implementation).

## JSON Examples for Testing

Here are some JSON examples to test the API endpoints:

### Create a User

```json
{
  "name": "Test User",
  "email": "user@example.com",
  "password": "password123",
  "country": "Argentina",
  "province": "Buenos Aires"
}
```

### Edit a User

```json
{
  "id": "5f5adfe5-7fc8-4db1-9a14-094341812b4c",
  "name": "Edited User",
  "email": "editeduser@example.com",
  "country": "Argentina",
  "province": "Córdoba"
}
```

### User login

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Get User by ID

Send a GET request to `/users/5f5adfe5-7fc8-4db1-9a14-094341812b4c`.

### Get All Users

Send a GET request to `/users`.

### Delete a User

Send a DELETE request to `/users/delete/5f5adfe5-7fc8-4db1-9a14-094341812b4c`.

### Create a Measure

```json
{
  "userId": "5f5adfe5-7fc8-4db1-9a14-094341812b4c",
  "deliveryDate": "2024-02-11T12:00:00Z",
  "managedCottonBaseKg": 100,
  "managedPolyesterBaseKg": 50,
  "managedMixBaseKg": 25,
  "carbonFootprintResult": 10.5,
  "waterFootprintResult": 20.3
}
```

### Edit a Measure

```json
{
  "id": "3a9b7d10-0f20-41c6-929d-1944f2aeed33",
  "userId": "5f5adfe5-7fc8-4db1-9a14-094341812b4c",
  "managedCottonBaseKg": 150,
  "managedPolyesterBaseKg": 75,
  "managedMixBaseKg": 40,
  "carbonFootprintResult": 15.2,
  "waterFootprintResult": 25.6
}
```

### Get Measure by ID

Send a GET request to `/measures/3a9b7d10-0f20-41c6-929d-1944f2aeed33`.

### Get All Measures for a User

Send a GET request to `/measures/getby` with the following JSON in the body:

```json
{
  "userId": "5f5adfe5-7fc8-4db1-9a14-094341812b4c"
}
```

# Authentication

This API uses JSON Web Tokens (JWT) for authentication. Certain endpoints require a valid JWT in the request's authorization header.

## Obtaining a JWT

To obtain a JWT, you need to authenticate using the `POST /users/login` endpoint. Upon successful authentication, a JWT is returned in the response. This token should be stored securely on the client-side and included in the authorization header of each subsequent request.

Here's an example of how to include the JWT in the authorization header:

```plaintext
Authorization: Bearer <token>

Replace <token> with the JWT obtained after successful login.

Using the Authentication Middleware
The authenticateUser middleware is provided for verifying and decoding the JWT from the authorization header of incoming requests. If the token verification is successful, the middleware attaches the decoded user information to the request object (req.user), which can then be accessed by subsequent route handlers.

Include the authenticateUser middleware in routes that require authentication. Here's an example:

const jwt = require('jsonwebtoken');
const authenticateUser = require('./path/to/authenticateUser');

// Example of using the authentication middleware in routes
app.get('/secure-route', authenticateUser, (req, res) => {
  // Access user info via req.user
});

Secure Routes
Routes that require authentication should include the authenticateUser middleware. This ensures that only authenticated users can access these routes.

For example, the /secure-route endpoint requires authentication. Include the JWT in the authorization header of the request to access it.

Here's an example of a secure GET request requiring authentication:

const jwt = require('jsonwebtoken');
const authenticateUser = require('./path/to/authenticateUser');

// Get the JWT token after authentication
const token = '...'; // Get the JWT token from the response after login

// Example of a secure GET request requiring authentication
fetch('https://api.example.com/secure-route', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}` // Include the JWT token in the authorization header
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));



