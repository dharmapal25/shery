import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./App.css"
const App = () => {

  const [data, setData] = useState([]);

  function fetchData() {

    axios.get("http://localhost:8000/user-data")
      .then((res) => {
        setData(res.data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])


  function handleSubmit(e) {
    e.preventDefault()

    let { username, email, register } = e.target.elements
    console.log(email.value)

    axios.post("http://localhost:8000/users-create", {
      username: username.value,
      email: email.value,
      register: register.value
    })
      .then((res) => {
        fetchData()
        console.log("Successfully Submitted!");
      })

  }


  function deleteBtn(e) {
    console.log(e)
    axios.delete("http://localhost:8000/delete/" + e)
      .then((res) => {
        console.log(res)
        alert(res.data.msg)
        fetchData()
      })

  }


  // data.map

  return (
    <div>
      <h1>React app</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Enter name' name='username' />
        <input type="email" placeholder='Enter email' name='email' />
        <input type="number" placeholder='Enter register' name='register' />
        <button>Submit</button>
      </form>

      <div className="cards">

        {

          data.map((e, i) => {

            return (
              <div className="card" key={e._id}  >
                <h4>Username : <span> {e.username} </span> </h4>
                <p>E-mail : <span>{e.email} </span></p>
                <p>Register no : <span>{e.register}</span></p>
                <p>Time : <span> {e.time} </span> </p>
                <p>ID : <span> {e._id} </span> </p>

                <div className="main-btn">
                  <button onClick={() => deleteBtn(e._id)} >Delete</button>
                  <button>Edit</button>
                </div>
              </div>
            )
          })

        }

      </div>

    </div>
  )
}

export default App