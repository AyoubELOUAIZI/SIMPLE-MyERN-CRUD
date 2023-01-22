const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const mysql=require('mysql');
app.use(express.json())

// Create a connection to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employeesystem'
});


// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, APIs are working successfully');
});

//-------------------------------------------------------------------------------------------//
app.post("/create", (req, res) => {

    console.log("-------------------------------")
    console.log(req);
    console.log("-------------------------------")
    console.log("-------------------------------")
    console.log(res);
    console.log("-------------------------------")
    // Get the values from the request body
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;

    // Insert the values into the 'employees' table in the database
    db.query(
        "INSERT INTO  employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
        [name, age, country, position, wage],
        (err, result) => {
            // Check for errors
            if (err) {
                console.log(err);
            } else {
                // Send a response to the client
                res.send("Values Inserted");
            }
        }
    );
});

// This code is handling a POST request to the / create endpoint on the server.
// When a request is made to this endpoint, the server extracts the values for name,
//  age, country, position, and wage from the request body.
//--------------------------------------------------------------------------------------------------------------//
app.get("/employees", (req, res) => {
    // Query the database to select all records from the 'employees' table
    db.query("SELECT * FROM employees", (err, result) => {
        // Check for errors
        if (err) {
            console.log(err);
        } else {
            // Send the query result as a response to the client
            res.send(result);
        }
    });
});

// This code is handling a GET request to the / employees endpoint on the server.
// When a request is made to this endpoint, the server uses the db.
// query() method to execute a SELECT statement that selects all records from the employees table in the database.

// The query method takes in a SQL statement as the first parameter and a callback function
//  as a second parameter, which is used to handle any errors or successful results.
// If there is no error, then the query result is sent as a response to the client.
// The client can then use this information to display the employees data on the front - end.
//-------------------------------------------------------------------------------------------------------------//
app.put("/update", (req, res) => {
    // Get the id and wage values from the request body
    const id = req.body.id;
    const wage = req.body.wage;

    // Update the employees table with the new wage value, where the id matches the one provided
    db.query(
        "UPDATE employees SET wage = ? WHERE id = ?",
        [wage, id],
        (err, result) => {
            // Check for errors
            if (err) {
                console.log(err);
            } else {
                // Send the query result as a response to the client
                res.send(result);
            }
        }
    );
});
//-------------------------------------------------------------------------------------------------------------//
app.delete("/delete/:id", (req, res) => {
    console.log(req);
    // Get the id from the request parameters
    const id = req.params.id;

    // Delete the record from the employees table where the id matches the one provided
    db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
        // Check for errors
        if (err) {
            console.log(err);
        } else {
            // Send the query result as a response to the client
            res.send(result);
        }
    });
});

//-------------------------------------------------------------------------------------------------------------//



















// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port} http://localhost:${port}`);
});
