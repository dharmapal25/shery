import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./app.css"

const App = () => {

  const [userData, setUserData] = useState([]);
  const [editUser, setEditUser] = useState(null);

  function dataFetch() {
    axios.get("http://localhost:8000/data")
      .then((res) => {
        setUserData(res.data)
      }).catch((err) => {
        console.log("ERROR : ", err)
      })
  }

  useEffect(() => {
    dataFetch()
  }, [])


  function onSendId(user) {
    axios.delete(`http://localhost:8000/data/${user._id}`)
      .then(() => {
        dataFetch()
      }).catch((err) => {
        console.log("ERROR : ", err)
      })
  }


  function SubmitEvent(e) {
    e.preventDefault()
    let { email, password } = e.target.elements

    axios.post("http://localhost:8000/login", {
      email: email.value,
      password: password.value
    })
      .then(() => {
        dataFetch()
        e.target.reset() // form clear
      })
      .catch((err) => console.log("ERROR : ", err))
  }


  function onUpdateId(user) {
    setEditUser(user)
    console.log(user)
    
  }

  function handleUpdate(e) {
    e.preventDefault()
    let { email, password } = e.target.elements

    axios.patch(`http://localhost:8000/data/${editUser._id}`, {
      email: email.value,
      password: password.value
    })
      .then(() => {
        dataFetch()
        setEditUser(null)
      })
      .catch((err) => console.log("ERROR : ", err))
  }

  return (
    <div>
      <h1 style={{ padding: "10px", color: "crimson" }}>Users Data</h1>

      {/* Create Form */}

      <form onSubmit={SubmitEvent}>
        <input type="email" name='email' placeholder='Enter email' />
        <input type="password" name='password' placeholder='Enter password' />
        <button>Submit</button>
      </form>

      {/* Update Form - sirf tab dikhega jab Update button click ho */}

      {editUser && (
        <form onSubmit={handleUpdate}>
          <h3>Update User</h3>
          <input type="email" name='email' defaultValue={editUser.email} />
          <input type="password" name='password' defaultValue={editUser.password} />
          <button>Save Update</button>
          <button type="button" onClick={() => setEditUser(null)}>Cancel</button>
        </form>
      )}

      <div className="cards">
        {
          userData.map((user) => (
            <div className="card" key={user._id}>
              <h3>email : {user.email}</h3>
              <h3>password : {user.password}</h3>
              <h3>Time : {user.time}</h3>
              <p>_id : {user._id}</p>
              <button onClick={() => onSendId(user)}>Delete</button>
              <button onClick={() => onUpdateId(user)}>Update</button>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default App