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
//-----------------------------------------------------------------------------------------//
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

//-----------------------------------------------------------------------------------------//



















// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port} http://localhost:${port}`);
});
