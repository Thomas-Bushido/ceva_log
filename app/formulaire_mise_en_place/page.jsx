"use client";

import Navbar from "../../composants/navbar"; 
import CreateShipment from "../../composants/add-shipment";


export default function ReadShipment() {
    return (
        <div className="App">
         <div><Navbar/></div>
         <div><CreateShipment/></div>
        </div>
      );
}