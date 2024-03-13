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

### Authentication
Ensure to include the obtained token in the header of subsequent requests for authentication.

Authentication
Authentication is required for accessing certain endpoints in the API. Upon successful authentication, a JSON Web Token (JWT) is generated and provided to the client. This token must be included in the authorization header of subsequent requests for authentication.

Generating and Using JWT Token
After a user successfully logs in using the POST /users/login endpoint, a JWT token is generated and returned in the response. This token should be stored securely by the client and included in the authorization header of each subsequent request.

Here's how to include the JWT token in the authorization header of a request:

plaintext
Copy code
Authorization: Bearer <token>
Replace <token> with the JWT token obtained after successful login.

Authentication Middleware
The provided authenticateUser middleware is responsible for verifying and decoding the JWT token included in the authorization header of incoming requests. This middleware decodes the token using the secret key defined in the .env file and, if the verification is successful, attaches the decoded user information to the request object (req.user). This user information can then be accessed by subsequent route handlers.

Ensure to include the authenticateUser middleware in routes that require authentication. Here's an example of how to use the middleware in route handlers:


const jwt = require('jsonwebtoken');
const authenticateUser = require('./path/to/authenticateUser');

// Example of using the authentication middleware in routes
app.get('/secure-route', authenticateUser, (req, res) => {
  // Access user info via req.user
});


Secure Routes
Routes that require authentication should be protected by including the authenticateUser middleware. This ensures that only authenticated users can access these routes.


GET /secure-route
This route requires authentication. Include the JWT token in the authorization header of the request to access it.


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


