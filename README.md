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
  ![image](https://github.com/nidakhanam/NodeJs_CRUD/assets/86373830/9565cb2c-22bc-496d-972d-81b64d49558e)

- **Insert Data**: POST /insert
  ![image](https://github.com/nidakhanam/NodeJs_CRUD/assets/86373830/7ed1fa79-0097-400b-a6d3-7c757cac17cd)

- **Update Data**: POST /update
  ![image](https://github.com/nidakhanam/NodeJs_CRUD/assets/86373830/a7b9e0e4-add0-43c3-ab49-6bf8c6ccf628)

- **Delete Data**: POST /delete
  ![image](https://github.com/nidakhanam/NodeJs_CRUD/assets/86373830/6d84b084-074d-4de5-9403-998d0c930cca)

  

## Dependencies

- express
- body-parser
- cors
- mysql



