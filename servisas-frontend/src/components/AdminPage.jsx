import React, { useState } from "react";

function AdminPage() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [manager, setManager] = useState("");

  const localStorageObj = JSON.parse(localStorage.getItem("tokens"));
  const jwtToken = localStorageObj.jwt;

  const addServisas = (e) => {

    e.preventDefault();

    const servisaiInput = { name, address, manager };

    fetch('http://localhost:8080/api/addServisas', {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${jwtToken}`
        },
      body: JSON.stringify(servisaiInput),
    })
      .then((res) => res.json())
      .then((data) => {

      });

    setName("")
    setAddress("")
    setManager("")
  };

  return (
    <div>
      <form className="register-form" onSubmit={addServisas}>
        <h1>Pridekite Servisa 🚗</h1>
        <br />
        <div className="register-input">
          <label htmlFor="name">Serviso pavadinimas</label>
          <input
            type="text"
            id="name"
            value={name}
            required
            placeholder="For Example: Melga"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="register-input">
          <label htmlFor="address">Adresas</label>
          <input
            type="text"
            id="address"
            value={address}
            required
            placeholder="For Example: Pylimo 5"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="register-input">
          <label htmlFor="manager">Vadovas</label>
          <input
            type="text"
            id="manager"
            value={manager}
            onChange={(e) => setManager(e.target.value)}
          />
        </div>
        <button type="submit">Prideti servisa</button>
      </form>
    </div>
  );
}

export default AdminPage;
