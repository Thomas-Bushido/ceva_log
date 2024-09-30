"use client"

import ListShipments from "../../composants/read-shipment-dbconnect";
import Navbar from "../../composants/navbar"; 


export default function ReadForm() {
  return (
    <div>
      <div><Navbar/></div>
      <div><ListShipments/></div>
    </div>
  );
}