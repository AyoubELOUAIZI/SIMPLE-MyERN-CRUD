import "./App.css";
import { useState } from "react";
import Axios from "axios";

//costomise the url
const port = 8000;//this is the port where the backend server is listening
const URL = `http://localhost:${port}`;
console.log(URL)


function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  //----------------------------------------1 add-------------------------------------------------//
  const addEmployee = () => {
    Axios.post(`${URL}/create`, {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);
    });
  };
  //------------------------------------------2 get-----------------------------------------------//
  const getEmployees = () => {
    Axios.get(`${URL}/employees`).then((response) => {
      setEmployeeList(response.data);
    });
  };
  //------------------------------------------3 update-----------------------------------------------//

  const updateEmployeeWage = (id) => {
    Axios.put(`${URL}/update`, { wage: newWage, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id === id
              ? {
                id: val.id,
                name: val.name,
                country: val.country,
                age: val.age,
                position: val.position,
                wage: newWage,
              }
              : val;
          })
        );
      }
    );
  };
  //--------------------------------------------4 delete---------------------------------------------//
  const deleteEmployee = (id) => {
    Axios.delete(`${URL}/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };
  //--------------------------------------------------------------------------------------------------------------------//
  //--------------------------------------------------------------------------------------------------------------------//
  return (
    <div className="App">
      <div className="information">
        {/*---------------------1 name----------------------*/}
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        {/*---------------------2 age----------------------*/}
        <label>Age:</label>
        <input
          type="number"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        {/*---------------------3 country----------------------*/}
        <label>Country:</label>
        <input
          type="text"
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        />
        {/*---------------------4 position----------------------*/}
        <label>Position:</label>
        <input
          type="text"
          onChange={(event) => {
            setPosition(event.target.value);
          }}
        />
        {/*---------------------5 salary----------------------*/}
        <label>Wage (year):</label>
        <input
          type="number"
          onChange={(event) => {
            setWage(event.target.value);
          }}
        />
        <button onClick={addEmployee}>Add Employee</button>
        <button onClick={getEmployees}>Show Employees</button>

      </div>
      {/* 0000000000000000000000000000000000000 display Employees 0000000000000000000000000000000000000 */}
      <div className="employees">

        {/*-----------------------------------------------------------------------------------------*/}
        {employeeList.map((val, key) => {
          return (
            <div className="employee">
              <div>
                <h3>Name: {val.name}</h3>
                <h3>Age: {val.age}</h3>
                <h3>Country: {val.country}</h3>
                <h3>Position: {val.position}</h3>
                <h3>Wage: {val.wage}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="2000..."
                  onChange={(event) => {
                    setNewWage(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateEmployeeWage(val.id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteEmployee(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
        {/*-----------------------------------------------------------------------------------------*/}

      </div>
      {/* 0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 */}
    </div>
  );
}

export default App;