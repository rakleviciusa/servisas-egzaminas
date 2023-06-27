import React from 'react'

function Servisas(props) {

    

    fetch(`http://localhost:8080/api/getServisasById/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })

  return (
    <div>
        
    </div>
  )
}

export default Servisas