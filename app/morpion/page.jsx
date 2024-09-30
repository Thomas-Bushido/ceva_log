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
  }, [game]);

  useEffect(() => {
    if (!player) {
      console.log("le joueur 1 commence");
      
    } else {
      console.log("le joueur 2 commence");
      
    }

  }, [player]);

  function handleClick(ligne, colonne) {
    const tempGameboard = [...gameBoard];
    setPlayer(Math.abs(player - 1));
    tempGameboard[ligne][colonne] = !player ? "X" : "O";

    function Check() {
      
      let count1 = 0;
      let count2 = 0;

      for (let l = 0; l <= 2; l++) {
        count1 = 0;
        count2 = 0;
        for (let c = 0; c <= 2; c++) {
          // console.log({l}, {c});
          // count1 = 0;
          // count2 = 0;
          if (tempGameboard[l][c] === "X") {
            count1++;
            // console.log("ok");
            //  console.log({l},{c})
          }
          if (tempGameboard[l][c] === "O") {
            count2++;
            // console.log("ok");
            //  console.log({l},{c})
          }
        }
        console.log(count1)
      }
      if (count1 === 3 || count2 === 3) {
        console.log("gagné,fin de la partie");
      } else {
        return setGameboard(tempGameboard)
      }
    }
    Check();

    
    // return setGameboard(tempGameboard);
  }

  return (
    <>
      <div>
        <div>
          {gameBoard.map((line, ligne) => {
            return (
              <div>
                {line.map((val, colonne) => {
                  return (
                    <button
                      style={{
                        backgroundColor: "grey",
                        minWidth: "20px",
                        border: "1px solid white",
                        color: "white",
                      }}
                      onClick={() => handleClick(ligne, colonne)}
                    >
                      {val}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div>{!player ? "Au tour du joueur 1" : "Au tour du joueur 2"}</div>
      </div>
    </>
  );
}
