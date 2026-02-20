import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./app.css"
// import {collectionData} from "../../Backend/src/models/users.model.js"
const App = () => {


  const [useData, setUseData] = useState([]);

  function dataFetch() {

    axios.get("http://localhost:8000/data")
      .then((e) => {
        console.log(e.data)
        setUseData(e.data)
      }).catch((err) => {
        console.log("ERROR : ", err)
      })
  }

  useEffect(() => {
    dataFetch()
  }, [])


  function onSendId(e) {
    console.log(e._id)

    axios.delete(`http://localhost:8000/data/${e._id}`)
      .then((e) => {
      }).catch((err)=> {
        console.log("ERROR : ",err)
      })

  }
  return (
    <div>
      <h1 style={{ padding: "10px", color: "crimson" }} > Users Data </h1>

      <div className="cards">

        {
          useData.map((e, i) => {
            let idx = i + 1;
            console.log(idx, i)
            console.log(e.email)
            return (
              <div className="card" key={i + 1} >
                <h3>email : {e.email} </h3>
                <h3>password : {e.password}</h3>
                <h3>Time : {e.time}</h3>
                <p>_id : {e._id} </p>
                <button onClick={() => onSendId(e)} >Delete</button>
              </div>
            )
          })
        }

      </div>

    </div>
  )
}

export default App