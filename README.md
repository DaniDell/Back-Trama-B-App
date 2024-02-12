## General Description
This project is a web application developed with Node.js and Express, providing a RESTful API for managing sustainability measures taken by users. Users can record measures related to material management and obtain information about the measures taken.

## Project Structure
The project follows an organized structure as follows:

- **controllers/**: Contains the controllers for each model.
- **db/**: Contains the database configuration and Sequelize models.
- **handlers/**: Contains the handlers for each controller, managing HTTP requests and responses.
- **routers/**: Defines the application routes.
- **.env**: Configuration file for environment variables.
- **app.js**: Main application file.
- **package.json**: npm configuration file.

## API Usage
The API provides the following routes for managing measures and users:


### Users Routes
- `POST /users/create`: Creates a new user.
- `PUT /users/edit`: Edits an existing user.
- `GET /users/:id`: Gets user information by ID.
- `GET /users`: Gets all users.
- `DELETE /users/delete/:id`: Deletes a user by ID.

### Measures Routes
- `POST /measures/create`: Creates a new measure.
- `PUT /measures/edit`: Edits an existing measure.
- `GET /measures/:id`: Gets a measure by its ID.
- `GET /measures/getby`: Gets measures according to different criteria (see details in the implementation).


## JSON Examples for Testing



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