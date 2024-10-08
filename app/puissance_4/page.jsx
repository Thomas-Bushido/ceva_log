"use client";
import React from "react";
import { useEffect, useState } from "react";
export default function Puissance4() {
  const [tab, setTab] = useState([
    ["_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_"],
  ]);
  const [player, setPlayer] = useState(0);
  const [game, setGame] = useState(false)
  const choix = [1, 2, 3, 4, 5, 6, 7];


useEffect(() => {
   if(!game){
    const joueurs = ["joueur 1", "joueur 2"];
    const random = Math.floor(Math.random() * joueurs.length);
    console.log(1,'test')
    setPlayer(random);
    setGame(true)
   } else{ 
    return
   }
   console.log(2,'test')
}, [game]);

useEffect(() => {
  if (!player) {
    console.log("le joueur 1 commence");
    console.log(player);
  } else {
    console.log("le joueur 2 commence");
    console.log(player);
  }
}, [player]);

const handleClick = (ind) => {
  const tempTab = [...tab]

  
  

  function Count(){
    
    let l = tempTab.length-1;

    while (tempTab[l][ind] === 'O' || tempTab[l][ind] === 'X') {
      l--;
      
    }
    console.log(l)
    return l;
  }
  const ligne_a_remplir = Count()
 console.log(5, ligne_a_remplir)
  
    
 tempTab[ligne_a_remplir][ind] = !player ? "X" : "O";
 setPlayer(Math.abs(player - 1));
 return setTab(tempTab);

    tempTab[5][ind] = 'O';
    
    setTab([...tempTab])

  
  }

  return (
    <>
      <div>
        <div style={{ width: "350px" }}>
          {choix.map((lettre, ind) => {
            return (
              <button
                style={{
                  backgroundColor: "grey",
                  minWidth: "50px",
                  border: "1px solid blue",
                  color: "black",
                  width: "50px",
                }}
                onClick={() => handleClick(ind)}
              >
                {lettre}
              </button>
            );
          })}
        </div>
        <div style={{ width: "350px" }}>
          {tab.map((ligne) => {
            return ligne.map((colonne) => {
              return (
                <button
                  style={{
                    backgroundColor: "blue",
                    minWidth: "50px",
                    border: "1px solid white",
                    color: "white",
                  }}
                >
                  {colonne}
                </button>
              );
            });
          })}
        </div>
      </div>
    </>
  );
}
