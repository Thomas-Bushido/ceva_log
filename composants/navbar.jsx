"use client";
import React, { useState } from "react";
import "../composants/style/navbar.css";
const Navbar = () => {
  const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
  const [menu_class, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [button1, setButton1] = useState("button unclicked");
  const [button2, setButton2] = useState("button unclicked");
  const [button3, setButton3] = useState("button unclicked");
  const [button_menu1, setButtonMenu1] = useState("small_menu hidden");
  const [button_menu2, setButtonMenu2] = useState("small_menu hidden");
  const [button_menu3, setButtonMenu3] = useState("small_menu hidden");
  const [isButtonClicked1, setIsButtonClicked1] = useState(false);
  const [isButtonClicked2, setIsButtonClicked2] = useState(false);
  const [isButtonClicked3, setIsButtonClicked3] = useState(false);

  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass("burger-bar clicked");
      setMenuClass("menu visible");
      setButtonMenu1("small_menu hidden");
      setButtonMenu2("small_menu hidden");
      setButtonMenu3("small_menu hidden");
      
    } else {
      setBurgerClass("burger-bar unclicked");
      setMenuClass("menu hidden");
      
    }
    setIsMenuClicked(!isMenuClicked);
  };
  const updateButtonMenu1 = () => {
    if (!isButtonClicked1) {
      setButton1("button clicked");
      setButtonMenu1("small_menu visible");
      setButtonMenu2("small_menu hidden");
      setButtonMenu3("small_menu hidden");
    } else {
      setButton1("button unclicked");
      // setButtonMenu1("small_menu hidden");
    }
    setIsButtonClicked1(!isButtonClicked1);
  }

  const updateButtonMenu2 = () => {  
    
    if (!isButtonClicked2) {
      setButton2("button clicked");
      setButtonMenu2("small_menu visible");
      setButtonMenu1("small_menu hidden");
      setButtonMenu3("small_menu hidden");
    } else {
      setButton2("button unclicked");
      // setButtonMenu2("small_menu hidden");
    }
    setIsButtonClicked2(!isButtonClicked2); 
  }
   
  const updateButtonMenu3 = () => {  
    if (!isButtonClicked3) {
      setButton3("button clicked");
      setButtonMenu3("small_menu visible");
      setButtonMenu2("small_menu hidden");
      setButtonMenu1("small_menu hidden");
    } else {
      setButton3("button unclicked");
      // setButtonMenu3("small_menu hidden");
    }
    setIsButtonClicked3(!isButtonClicked3);
  };

  return (
    <div>
      <nav>
        <div className="burger-menu" onClick={updateMenu}>
          <div className={burger_class}></div>
          <div className={burger_class}></div>
          <div className={burger_class}></div>
        </div>
      </nav>
      <div className={menu_class}>
       <div className="menu_class">
          <button className={button1} onClick={updateButtonMenu1}>Commerce</button>
           <ul className="optionsMenu">
           <li className={button_menu1}>
              <a className="links" href="http://localhost:3000/formulaire_mise_en_place">Mise en place</a>
            </li>
            </ul>
            <button className={button3} onClick={updateButtonMenu3}>Exploitation</button>
            <ul className="optionsMenu">
            <li className={button_menu3}>
              <a className="links" href="http://localhost:3000/suivi_expeditions">Suivi de dossier</a>
            </li>
            {/* /* <li className={button_menu3}>
              <a className="links" href="">Transmission</a> 
            </li>
            <li className={button_menu3}>
              <a className="links" href="">Litiges</a>
            </li>
            <li className={button_menu3}>
              <a className="links" href="">informations pratiques</a>
            </li> */}
            </ul> 
          
          <button className={button2} onClick={updateButtonMenu2}>Clients</button>
            <ul className="optionsMenu">
            <li className={button_menu2}>
              <a className="links" href="http://localhost:3000/clients">Comptes clients</a>
            </li>
            <li className={button_menu2}>
              <a className="links" href="http://localhost:3000/formulaire_client">Création de compte client</a>
            </li>
        
            </ul>
          
          
            <button className={button3}><a className="Retour" href="http://localhost:3000/accueil">Accueil</a></button>
            
      </div>
      </div>
    </div>
  );
};

export default Navbar;
