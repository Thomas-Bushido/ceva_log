"use client";


import { useEffect, useState } from "react";


export default function CreateCustomerInvAccount() {
  const [customName, setCustomName] = useState("");
  const [customInvAddress, setCustomInvAddress] = useState("");
  const [customSiret, setCustomSiret] = useState("");
  const [email, setEmail] = useState("");
  const [flagSubmit, setFlagSubmit] = useState(false);
  const [result, setResult] = useState("");

  const validateForm = () => {
    if (customName.length > 1) {
      console.log(1, "ok");
    } else {
      console.log(1, "error");
      setFlagSubmit(false);
      return;
    }
    if (customInvAddress.length > 0) {
      console.log(2, "ok");
    } else {
      console.log(2, "error");
      setFlagSubmit(false);
      return;
    }
    if (customSiret.length > 8 && customSiret.length <= 9) {
      console.log(3, "ok");
    } else {
      console.log(3, "error");
      setFlagSubmit(false);
      return;
    }
    if (!email) {
      console.log(4, "Email is required.");
      setFlagSubmit(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      console.log(5, "Email is invalid.");
      setFlagSubmit(false);
      return;
    } else {
      console.log(5, "ok");
    }
    setFlagSubmit(true);
  };

  const handleSubmit = async (event) => {
    console.log("success");
    await postData();
  };

  const postData = async () => {
    console.log(
      JSON.stringify({
        name: customName,
        invoiceAddress: customInvAddress,
        siret: customSiret,
        email: email,
      })
    );
    const response = await fetch("api/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: customName,
        invoiceAddress: customInvAddress,
        siret: customSiret,
        email: email,
      }),
    });

    const result = await response.json();
    setResult(result.res);
    // récupération de la réponse envoyée depuis le back: return Response.json({ res: myPost.acknowledged ? "Done" : "Error" })
    console.log(result);
  };

  useEffect(() => {
    validateForm(customName, customInvAddress, customSiret, email);
  }, [customName, customInvAddress, customSiret, email]);

  useEffect(() => {
    console.log("test");
    // const dataCustomer = {};
    if (flagSubmit) {
      // dataCustomer["customer_name"] = customName;
      // dataCustomer["customer_invoice"] = customInvAddress;
      // dataCustomer["customer_siret"] = customSiret;
      // dataCustomer["customer_email"] = email;
      // console.log({dataCustomer})
    } else {
      setFlagSubmit(false);
    }
  }, [flagSubmit]);

  // Submit

  return (
    <div
      style={{
        backgroundColor: "white",
        color: "#00008b",
        padding: "10px",
        display: "flex",
        flexDirection: "column", 
        justifyContent: "center", 
        position:"absolute",
        top:"100px",
        left:"730px",
        alignItems: "center", 
        minHeight: "60vh",
        border: "5px solid #cd5c5c",
        borderRadius: "20px",
        width: "400px",
      }}
    >
      <div style={{ padding: "5px" }}>
        <label>Please enter Customer's name:</label>
      </div>
      <div style={{ paddingBottom: "18px" }}>
        <input
          style={{border: "1px solid black"}}
          type="text"
          placeholder="Customer's Name"
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
        />
      </div>
      <div style={{ padding: "5px" }}>
        <label>Please enter the invoice address:</label>
      </div>
      <div style={{ paddingBottom: "18px" }}>
        <input
          style={{border: "1px solid black"}}
          type="text"
          placeholder="Customer's invoice address"
          value={customInvAddress}
          onChange={(e) => setCustomInvAddress(e.target.value)}
        />
      </div>
      <div style={{ padding: "5px" }}>
        <label>Please enter the Siret number:</label>
      </div>
      <div style={{ paddingBottom: "18px" }}>
        <input
          style={{border: "1px solid black"}}
          type="number"
          placeholder="Customer's Siret number"
          value={customSiret}
          onChange={(e) => setCustomSiret(e.target.value)}
        />
      </div>
      <div style={{ padding: "5px" }}>
        <label>Please enter the mail address:</label>
      </div>
      <div style={{ paddingBottom: "30px" }}>
        <input
          style={{border: "1px solid black"}}
          type="mail"
          placeholder="Customer's mail address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div style={{ padding: "20px", border:"3px solid black", borderRadius:"4px"}}>
        {flagSubmit ? (
          <button onClick={handleSubmit}>Submit</button>
        ) : (
          <button>Please fill the form</button>
        )}
        <p>{result}</p>
      </div>
    </div>
  );
}
