import React, { useContext, useEffect, useState } from "react";
import AuthContext from '../context/AuthContext'
import './ServisaiStyle.scss'

function HomePage({ children, props }) {
  const [servisai, setServisai] = useState([]);
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editManager, setEditManager] = useState("");

  const servisaiApi = "http://localhost:8080/api/allServisai";

  let userRole = ""

  if (hasTokenInLocalStorage()) {

    const localStorageObj = JSON.parse(localStorage.getItem("tokens"));
    userRole = localStorageObj.user.authorities[0].authority

  }

  function hasTokenInLocalStorage() {
    return localStorage.getItem("tokens") !== null;
  }

  let jwtToken = "";

  if (hasTokenInLocalStorage()) {
    const localStorageObj = JSON.parse(localStorage.getItem("tokens"));
    jwtToken = localStorageObj.jwt;
  }

  useEffect(() => {
    async function fetchServisai() {
      try {
        const response = await fetch(servisaiApi, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setServisai(data);
        } else {
          throw new Error("Error: " + response.status);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchServisai();
  }, []);


  async function deleteServisas(id) {
    try {
      const response = await fetch(`http://localhost:8080/api/deleteServisasById/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
      } else {
        throw new Error("Error: " + response.status);
      }
    } catch (error) {
      console.error(error);
    }

    window.location.reload(false);
  }

  async function updateServisas(id) {

    const name = editName
    const address = editAddress
    const manager = editManager

    const servisaiInput = { name, address, manager };

    try {
      const response = await fetch(`http://localhost:8080/api/updateServisasById/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(servisaiInput),
      });

      if (response.ok) {
        const data = await response.json();

      } else {
        throw new Error("Error: " + response.status);
      }
    } catch (error) {
      console.error(error);
    }

    window.location.reload(false);
  }


  const { user } = useContext(AuthContext)


  return (
    <div>
      {servisai.length === 0 && (
        <div>
          <h2>NERA JOKIU SERVISU</h2>
          <p>
            <i>Prasau <a href="/login">prisijunkite</a> kad galetumete matyti servisus</i>
          </p>
        </div>
      )}
      {servisai.length !== 0 && (
        <div className="servisas-container">
          {servisai.map((servisas) => (
            <div key={servisas.id} className="servisas-card">
              <h2>Serviso Pavadinimas: {servisas.name}</h2>
              <h4>Adresas: {servisas.address}</h4>
              <p>Vadovas: {servisas.manager}</p>
              <div className="servisas-card--buttons">
                {userRole === "ADMIN" && <button onClick={() => deleteServisas(servisas.id)}>Pasalinti</button>}
                {userRole === "ADMIN" &&
                  <button onClick={() => {
                    setSelectedItemId(servisas.id);
                    setIsOpen(true);
                  }}>
                    Redaguoti
                  </button>
                }
              </div>


              {isOpen && selectedItemId === servisas.id && (
                <div>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    updateServisas(servisas.id);
                  }} className="popup-form">
                    <label htmlFor="name">Serviso Pavadinimas
                      <input type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    </label>

                    <label htmlFor="address">Adresas
                      <input
                        type="text"
                        value={editAddress}
                        onChange={(e) => setEditAddress(e.target.value)}
                      />
                    </label>

                    <label htmlFor="manager">Vadovas
                      <input type="text"
                        value={editManager}
                        onChange={(e) => setEditManager(e.target.value)}
                      />
                    </label>
                    <button type="submit">Redaguoti servisa</button>
                  </form>
                  <button onClick={() => {
                    setSelectedItemId(null);
                    setIsOpen(false);
                  }}>
                    Uzdaryti
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
