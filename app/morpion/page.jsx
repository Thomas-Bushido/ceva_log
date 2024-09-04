"use client";
import React from "react";

import { useEffect, useState } from "react";
// 1. render le gameBoard et faire un bouton pour chaque valeur dans le tableau
// 2. associé une fonction onclick pour chaque bouton pour changer la valeur du bouton
// 3. faire la gestion des joueurs, avoir un state pour gerer a qui c'est le tour

export default function Morpion() {
  const [gameBoard, setGameboard] = useState([
    ["_", "_", "_"],
    ["_", "_", "_"],
    ["_", "_", "_"],
  ]);
  const [game, setGame] = useState(false);
  const [player, setPlayer] = useState(0);

  useEffect(() => {
    if (game) {
      return;
    } else {

    const joueurs = ["joueur 1", "joueur 2"];
    const random = Math.floor(Math.random() * joueurs.length);
    setPlayer(random);

    setGame(true);
    }
  }, []);

  useEffect(() => {
    if (!player) {
      console.log("le joueur 1 commence");
      console.log(player);
    } else {
      console.log("le joueur 2 commence");
      console.log(player);
    }
  }, [player]);

  function handleClick(index, num) {
    const tempGameboard = [...gameBoard];

    tempGameboard[index][num] = !player ? "X" : "O";
    setPlayer(Math.abs(player - 1));
    return setGameboard(tempGameboard);
  }

  return (
    <>
      <div>
        <div>
          {gameBoard.map((ligne, index) => {
            return (
              <div>
                {ligne.map((val, num) => {
                  return (
                    <button
                      style={{
                        backgroundColor: "grey",
                        minWidth: "20px",
                        border: "1px solid white",
                        color: "white",
                      }}
                      onClick={() => handleClick(index, num)}
                    >
                      {val}
                    </button>
                  );
                })}
              </div>
            );
          })}
          {/* {gameBoard[0].map((val, index) => {
            return (
              <button
                style={{
                  backgroundColor: "grey",
                  minWidth: "20px",
                  border: "1px solid black",
                  color: "black",
                }}
                onClick={handleSubmit}
              >
                {val}
              </button>
            );
          })} */}
        </div>
        <div>{!player? "Au tour du joueur 1" : "Au tour du joueur 2"}</div>
      </div>
    </>
  );
}
