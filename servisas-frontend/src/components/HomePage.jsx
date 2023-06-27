import React, { useContext, useEffect, useState } from "react";
import AuthContext from '../context/AuthContext'
import './ServisaiStyle.scss'

function HomePage({ children }) {
  const [servisai, setServisai] = useState([]);
  const [isOpen, setIsOpen] = useState(false)

  const servisaiApi = "http://localhost:8080/api/allServisai";

  let userRole = ""

    if (hasTokenInLocalStorage()){

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
        <div className="meals-container">
          {servisai.map((servisas) => (
            <div key={servisas.id} className="meal-card">
              <h2>Serviso Pavadinimas: {servisas.name}</h2>
              <h4>Adresas: {servisas.address}</h4>
              <p>Vadovas: {servisas.manager}</p>
              {userRole === "ADMIN" && <button onClick={() => deleteServisas(servisas.id)}>Pasalinti</button>}
              {userRole === "ADMIN" &&
                <button onClick={() => setIsOpen(true)}>
                  Redaguoti
                </button>
              }

              {isOpen && (
                <div>
                  <div>
                    This is the content of the pop-up.
                  </div>
                  <button onClick={() => setIsOpen(false)}>
                    Close Pop-up
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
