import Image from "next/image";
import CreateCustomerInvAccount from "../../composants/add-form";
import Navbar from "../../composants/navbar";

export default function FormulaireClient() {
  return (
    <div>
        <div><Navbar/></div>
        <div><CreateCustomerInvAccount/></div>
    </div>
  );
}

