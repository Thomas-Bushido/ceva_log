"use client";
import { useEffect, useState } from "react";

export default function List() {
  const [list, setList] = useState([]);

  console.log("plop");

  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };
    fetchData();
  }, []);

  const getData = async () => {
    console.log("Hello");
    const response = await fetch("api/clients");
    const data = await response.json();
    console.log({ data });

    setList(data.res);
  };

  // useEffect(() => {
  //   console.log({list})

  // }, [list]);

  return (
    <>
      <div
        style={{
          backgroundColor: "white",
          color: "black",
          maxWidth: "70%",
          display: "flex",
          flexDirection: "column",
          position:"absolute",
          top:"100px",
          left:"340px",
          alignItems: "center",
          // margin: "0 auto",
          border: "5px solid #cd5c5c",
          borderRadius: "20px"
          
        }}
      >
        <div style={{color:"blue", margin:"50px", fontSize: "40px"}}>
        <h1>Liste des comptes clients</h1>
        </div>
        <div style={{display: "flex", justifyContent: "center", padding: "50px"
        }}>
        <div style={{padding: "18px"}}>
          <h2 style={{padding:"5px", fontSize:"15px", border: "2px solid black", textAlign:"center"}}>Nom de la société: </h2>
          <p>
            {list.map((element) => (
             <li>{element.name}</li>
            ))}
          </p>
        </div>
        <div style={{padding: "18px"}}>
          <h2 style={{padding:"5px", fontSize:"15px", border: "2px solid black", textAlign:"center"}}>Adresse mail: </h2>
          <p>
            {list.map((element) => (
              <li>{element.email}</li>
            ))}
          </p>
        </div>
        <div style={{padding: "18px"}}>
          <h2 style={{padding:"5px", fontSize:"15px", border: "2px solid black", textAlign:"center"}}>Numéro de Siret: </h2>
          <p>
            {list.map((element) => (
              <li>{element.siret}</li>
            ))}
          </p>
        </div>
        <div style={{padding: "18px"}}>
          <h2 style={{padding:"5px", fontSize:"15px", border: "2px solid black", textAlign:"center"}}>Adresse de facturation: </h2>
          <p>
            {list.map((element) => (
              <li>{element.invoiceAddress}</li>
            ))}
          </p>
        </div>
        <div style={{padding: "18px"}}>
          <h2 style={{padding:"5px", fontSize:"15px", border: "2px solid black", textAlign:"center"}}>ID: </h2>
          <p>
            {list.map((element) => (
              <li>{element._id}</li>
            ))}
          </p>
        </div>
        </div>
      </div>
    </>
  );
}

//////////////////////////////////////////////////////////////////////////////

