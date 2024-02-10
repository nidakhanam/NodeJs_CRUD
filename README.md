# NodeJs_CRUD
# Student Management System

This project is a simple Student Management System implemented using Node.js and Express.js. It provides CRUD (Create, Read, Update, Delete) functionality for managing student records in a database.

## Features

- **Fetch Data**: Retrieve student records from the database.
- **Insert Data**: Add new student records to the database.
- **Update Data**: Update existing student records in the database.
- **Delete Data**: Delete student records from the database.

## Setup

1. Clone the repository:
        git clone https://github.com/nidakhanam/NodeJs_CRUD.git
   
2. Install dependencies:
        npm install


3. Configure the database connection:
   
   - Ensure you have a MySQL database set up.
   - Update the database connection details in the `connectdb.js` file.

4. Start the server:
        npm start

## Usage

1. Use Postman to interact with the API endpoints.
2. Send HTTP requests to the appropriate endpoints for fetching, inserting, updating, or deleting student records.
3. Ensure that request bodies are formatted correctly as JSON.

## Endpoints

- **Fetch Data**: GET /fetch
  ![image](https://github.com/nidakhanam/NodeJs_CRUD/assets/86373830/1f4f6caf-13d8-4f0b-9d9e-19b1e063a478)
- **Insert Data**: POST /insert
- **Update Data**: POST /update
- **Delete Data**: POST /delete

## Dependencies

- express
- body-parser
- cors
- mysql



