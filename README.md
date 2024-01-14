# REST API Project

## Overview

This is a REST API project managing users and courses. It uses Sequelize for database operations and incorporates user authentication for secure access.

## Getting Started

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm run seed` to create and seed the database.
4. Update `config.js` for Sequelize configuration.
5. Run `npm start` to launch the application.

## Models

1. **User Model:**
   - Attributes: firstName, lastName, emailAddress, password

2. **Course Model:**
   - Attributes: title, description, estimatedTime, materialsNeeded, userId (foreign key)

## Routes

### User Routes

1. **GET /api/users:**
   - Returns authenticated user details with a 200 HTTP status code.

2. **POST /api/users:**
   - Creates a new user with a 201 HTTP status code.

### Course Routes

1. **GET /api/courses:**
   - Returns all courses with associated user details (200 HTTP status code).

2. **GET /api/courses/:id:**
   - Returns a specific course with user details (200 HTTP status code).

3. **POST /api/courses:**
   - Creates a new course with a 201 HTTP status code.

4. **PUT /api/courses/:id:**
   - Updates a course with a 204 HTTP status code.

5. **DELETE /api/courses/:id:**
   - Deletes a course with a 204 HTTP status code.

## Validations

- User creation: firstName, lastName, emailAddress, password are required.
- Course creation: title, description are required.
- Course update: title, description are required.

## Security

User passwords are hashed using bcrypt.js for storage.

## Authentication Middleware

Custom middleware authenticates users for specific routes, returning a 401 HTTP status code on failure.

## Testing

Use Postman and import the provided collection for route testing.
