"use client"

import List from "../../composants/read-customer";
import Navbar from "../../composants/navbar"; 
import { relative } from "path";

export default function ReadForm() {
  return (
    <div>
      <div><Navbar/></div>
      <div><List/></div>
    </div>
  );
}