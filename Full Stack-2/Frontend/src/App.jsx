import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./App.css"
const App = () => {

  const [data, setData] = useState([]);
  const [editData, setEditData] = useState([]);

  console.log(editData);

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


  function editBtn(e) {
    setEditData(e);
  }

  function handleDone(e) {
    e.preventDefault()

    let { email } = e.target.elements

    axios.patch(`http://localhost:8000/update/${editData._id}`, {
      email: email.value
    })
      .then((res) => {
        fetchData()
        setEditData("")

      }).catch((err) => {
        console.log("ERROR : ", err);
      })

  }


  return (

    <div>

      <h1>React app</h1>
      <div className="forms">
        <form onSubmit={handleSubmit}>
          <h2>Create users</h2>
          <input type="text" placeholder='Enter name' name='username' />
          <input type="email" placeholder='Enter email' name='email' />
          <input type="number" placeholder='Enter register' name='register' />
          <button>Submit</button>
        </form>

        {
          editData &&

          <form onSubmit={handleDone}>
            <h2>Edit user</h2>
            <input type="text" placeholder='Enter name' name='username' readOnly defaultValue={editData.username} style={{ cursor: 'no-drop' }} />
            <input type="email" placeholder='Enter email' name='email' defaultValue={editData.email} />
            <button>Done</button>
          </form>

        }

      </div>


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
                  <button onClick={() => deleteBtn(e._id)}>Delete</button>
                  <button onClick={() => editBtn(e)}>Edit</button>
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