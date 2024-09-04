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
  const [game, setGame] = useState(false)
  const [player, setPlayer] = useState(false)
  const choix = [["A"], ["B"], ["C"], ["D"], ["E"], ["F"], ["G"]];


useEffect(() => {
   if(!game){
    const joueurs = ['joueur 1', 'joueur 2'];
    const joueur1 = 'X';
    const joueur2 = 'O';
    console.log(1,'test')
   } else{ return
   }
   setGame(true)
   console.log(2,'test')
}, [game]);

// function Tour(){

// setPlayer(Math.abs(player-1))

// }


const handleClick = (index, num) => {

// Tour()
};













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
                onClick={handleClick(ind)}
              >
                {lettre}
              </button>
            );
          })}
        </div>
        <div style={{ width: "350px" }}>
          {tab.map((ligne, index) => {
            return ligne.map((colonne, num) => {
              return (
                <button
                  style={{
                    backgroundColor: "blue",
                    minWidth: "50px",
                    border: "1px solid white",
                    color: "white",
                  }}
                  onClick={handleClick(index, num)}
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
