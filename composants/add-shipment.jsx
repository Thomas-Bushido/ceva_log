"use client";

import { useEffect, useState } from "react";
import validateShipForm from "./validate-ship-form";
import "../composants/style/add-shipment.css";

export default function CreateShipment() {
  const [typeFile, setTTypeFile] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [nature, setNature] = useState("");
  const [grossWeight, setGrossWeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [freightRate, setFreightRate] = useState(0);
  const [totalFreightCost, setTotalFreightCost] = useState(0);
  const [pickup, setPickup] = useState(0);
  const [handling, setHandling] = useState(0);
  const [secu, setSecu] = useState(0);
  const [incoterm, setIncoterm] = useState("");
  const [customClearance, setCustomClearance] = useState(0);
  const [agentRate, setAgentRate] = useState(0);
  const [flagSubmit, setFlagSubmit] = useState(false);
  const [fassa, setFassa] = useState(0);
  const [result, setResult] = useState("");
  const [vente, setVente] = useState(0);
  const [note, setNote] = useState("");
  const [buttonIsClicked, setButtonIsClicked] = useState("button hidden");
  const [ButtonSubmit, setButtonSubmit] = useState("button visible");
  const [buttonYes, setButtonYes] = useState("button hidden");
  const [buttonNo, setButtonNo] = useState("button hidden");
  const [shipDiv, setShipDiv] = useState("div hidden");
  const [shipNumber, setShipNumber] = useState("");

  const TaxableWeigth = () => {
    const calculTax = (length * width * height) / 6000;
    if (grossWeight > calculTax) {
      setWeight(Number(grossWeight.toFixed(1))); // Convertir en nombre après toFixed()
    } else {
      setWeight(Number(calculTax.toFixed(1)));
    }
  };

  const CostFreightCalculation = () => {
    const freightcost = freightRate * weight;
    setTotalFreightCost(Number(freightcost.toFixed(1))); // Convertir en nombre après toFixed()
  };

  const FassaCalculation = () => {
    const totalCosts =
      (parseFloat(pickup) || 0) +
      (parseFloat(customClearance) || 0) +
      (parseFloat(handling) || 0) +
      (parseFloat(secu) || 0) +
      (parseFloat(totalFreightCost) || 0) +
      (parseFloat(agentRate) || 0);

    const totalFassa = (parseFloat(vente) || 0) - totalCosts;
    setFassa(Number(totalFassa.toFixed(1))); // Convertir en nombre après toFixed()
  };

  const generateRandomReference = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    // Génère 3 lettres aléatoires
    let randomLetters = "";
    for (let i = 0; i < 3; i++) {
      randomLetters += letters.charAt(
        Math.floor(Math.random() * letters.length)
      );
    }

    // Génère 3 chiffres aléatoires
    let randomNumbers = "";
    for (let i = 0; i < 3; i++) {
      randomNumbers += numbers.charAt(
        Math.floor(Math.random() * numbers.length)
      );
    }

    // Combine les lettres et les chiffres
    setShipNumber(randomLetters + randomNumbers);
  };

  const handleValidation = (e) => {
    generateRandomReference()
    setButtonIsClicked("button visible");
    setButtonSubmit("button hidden");
    setButtonYes("button visible");
    setButtonNo("button visible");
  };

  const handleReset = (e) => {
    console.log("test");
    setButtonIsClicked("button hidden");
    setButtonSubmit("button visible");
    setButtonYes("button hidden");
    setButtonNo("button hidden");
  };

  const handleSubmit = async (event) => {
    setShipDiv("div visible");
    
    console.log("success");
    console.log(shipNumber);

    setTimeout(() => {
      setShipDiv("div hidden");
      setTTypeFile("");
      setCustomerName("");
      setDeparture("");
      setArrival("");
      setNature("");
      setGrossWeight(0);
      setWeight(0);
      setLength(0);
      setWidth(0);
      setHeight(0);
      setFreightRate(0);
      setTotalFreightCost(0);
      setPickup(0);
      setHandling(0);
      setSecu(0);
      setIncoterm("");
      setCustomClearance(0);
      setAgentRate(0);
      setFlagSubmit("");
      setResult("");
      setFassa(0);
      setVente(0);
      setNote("");
      setShipNumber("");
    }, 3000);

    await postData();
  };
  const postData = async () => {
    console.log(
      JSON.stringify({
        typeFile: typeFile,
        customerName: customerName,
        incoterm: incoterm,
        departure: departure,
        arrival: arrival,
        nature: nature,
        grossWeight: grossWeight,
        weight: weight,
        length: length,
        width: width,
        height: height,
        freightRate: freightRate,
        totalFreightCost: totalFreightCost,
        pickup: pickup,
        handling: handling,
        secu: secu,
        incoterm: incoterm,
        customClearance: customClearance,
        agentRate: agentRate,
        vente: vente,
        note: note,
        fassa: fassa,
        shipNumber: shipNumber,
      })
    );
    const response = await fetch("/api/expeditions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        typeFile: typeFile,
        customerName: customerName,
        incoterm: incoterm,
        departure: departure,
        arrival: arrival,
        nature: nature,
        grossWeight: grossWeight,
        weight: weight,
        length: length,
        width: width,
        height: height,
        freightRate: freightRate,
        totalFreightCost: totalFreightCost,
        pickup: pickup,
        handling: handling,
        secu: secu,
        incoterm: incoterm,
        customClearance: customClearance,
        agentRate: agentRate,
        vente: vente,
        note: note,
        fassa: fassa,
        shipNumber: shipNumber,
      }),
    });
    const result = await response.json();
    setResult(result.res);
    // récupération de la réponse envoyée depuis le back: return Response.json({ res: myPost.acknowledged ? "Done" : "Error" })
    console.log(result);
  };

  useEffect(() => {
    setFlagSubmit(
      validateShipForm(
        typeFile,
        customerName,
        departure,
        arrival,
        nature,
        grossWeight,
        length,
        width,
        height,
        freightRate,
        pickup,
        handling,
        secu,
        incoterm,
        customClearance,
        agentRate,
        flagSubmit,
        result,
        vente,
        fassa,
        shipNumber
      )
    );
  }, [
    typeFile,
    customerName,
    departure,
    arrival,
    nature,
    grossWeight,
    length,
    width,
    height,
    freightRate,
    pickup,
    handling,
    secu,
    incoterm,
    customClearance,
    agentRate,
    flagSubmit,
    result,
    vente,
    fassa,
    shipNumber
  ]);

  return (
    <div className="MainContainer">
      <h1 className="MainTitle">Nouvelle mise en place</h1>
      <div className="Container0">
        <div className="Container1">
          <div className="Title">
            <label>Expédition</label>
          </div>
          <div className="FeesContainer">
            <label>type de dossier:</label>
          </div>
          <div
            style={{
              paddingBottom: "18px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <select onChange={(e) => setTTypeFile(e.target.value)}>
              <option value="">Sélectionnez un type</option>
              <option
                style={{ border: "1px solid black" }}
                type="text"
                placeholder="File's type"
              >
                Export
              </option>
              <option
                style={{ border: "1px solid black" }}
                type="text"
                placeholder="File's type"
              >
                Import
              </option>
              <option
                style={{ border: "1px solid black" }}
                type="text"
                placeholder="File's type"
              >
                Crosstrade
              </option>
              <option
                style={{ border: "1px solid black" }}
                type="text"
                placeholder="File's type"
              >
                Douane
              </option>
              <option
                style={{ border: "1px solid black" }}
                type="text"
                placeholder="File's type"
              >
                Route
              </option>
            </select>
          </div>
          <div className="FeesContainer">
            <label>Nom du client:</label>
          </div>
          <div
            style={{
              paddingBottom: "18px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <input
              style={{ border: "1px solid black" }}
              type="text"
              placeholder="Customer's Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <div className="FeesContainer">
            <label>Incoterm:</label>
          </div>
          <div
            style={{
              paddingBottom: "18px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <input
              style={{ border: "1px solid black" }}
              type="text"
              placeholder="Terms code"
              value={incoterm}
              onChange={(e) => setIncoterm(e.target.value)}
            />
          </div>
          <div className="FeesContainer">
            <label>Aéroport de départ:</label>
          </div>
          <div
            style={{
              paddingBottom: "18px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <input
              style={{ border: "1px solid black" }}
              type="text"
              placeholder="Airport of Departure"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
            />
          </div>
          <div className="FeesContainer">
            <label>Aéroport d'arrivée:</label>
          </div>
          <div
            style={{
              paddingBottom: "18px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <input
              style={{ border: "1px solid black" }}
              type="text"
              placeholder="Airport of Arrival"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
            />
          </div>
          <div className="FeesContainer">
            <label>Nature de marchandise:</label>
          </div>
          <div
            style={{
              paddingBottom: "18px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <input
              style={{ border: "1px solid black" }}
              type="text"
              placeholder="Nature of the shipment"
              value={nature}
              onChange={(e) => setNature(e.target.value)}
            />
          </div>
          <div className="FeesContainer">
            <label>Dimensions:</label>
          </div>
          <div className="DimensionContainer" style={{ paddingBottom: "30px" }}>
            <input
              style={{ border: "1px solid black" }}
              type="number"
              placeholder="gross weight in kgs"
              value={grossWeight}
              onChange={(e) => setGrossWeight(parseFloat(e.target.value))}
            />
            <input
              style={{ border: "1px solid black" }}
              type="number"
              placeholder="Length of the packet in cm"
              value={length}
              onChange={(e) => setLength(parseFloat(e.target.value))}
            />
            <input
              style={{ border: "1px solid black" }}
              type="number"
              placeholder="Width of the packet in cm"
              value={width}
              onChange={(e) => setWidth(parseFloat(e.target.value))}
            />
            <input
              style={{ border: "1px solid black" }}
              type="number"
              placeholder="Height of the packet in cm"
              value={height}
              onChange={(e) => setHeight(parseFloat(e.target.value))}
            />
            <button className="ButtonTaxable" onClick={TaxableWeigth}>
              Valider
            </button>
            <div type="number" className="ResultatTaxable">
              Poids taxable: {weight}kgs
            </div>
          </div>
        </div>
        <div className="Container2">
          <div className="Title">
            <label>Achats/Vente:</label>
          </div>
          <div className="FeesContainer">
            <label>Enlèvement: </label>
          </div>
          <input
            style={{ border: "1px solid black", width: "40%" }}
            type="number"
            placeholder="Pick up fees"
            value={pickup}
            onChange={(e) => setPickup(parseFloat(e.target.value))}
          />

          <div className="FeesContainer">
            <label>Frais douane: </label>
          </div>
          <input
            style={{ border: "1px solid black", width: "40%" }}
            type="number"
            placeholder="Customs Fees"
            value={customClearance}
            onChange={(e) => setCustomClearance(parseFloat(e.target.value))}
          />

          <div className="FeesContainer">
            <label>Handling: </label>
          </div>
          <input
            style={{ border: "1px solid black", width: "40%" }}
            type="number"
            placeholder="Handling fees "
            value={handling}
            onChange={(e) => setHandling(parseFloat(e.target.value))}
          />

          <div className="FeesContainer">
            <label>Sécurisation: </label>
          </div>
          <input
            style={{ border: "1px solid black", width: "40%" }}
            type="number"
            placeholder="Securization fees "
            value={secu}
            onChange={(e) => setSecu(parseFloat(e.target.value))}
          />

          <div className="FeesContainer">
            <label>Taux aérien: </label>
          </div>
          <input
            style={{ border: "1px solid black", width: "40%" }}
            type="number"
            placeholder="Airfreight Rate"
            value={freightRate}
            onChange={(e) => setFreightRate(parseFloat(e.target.value))}
          />
          <div className="Fret">
            <button
              type="number"
              className="ButtonTaxable"
              onClick={CostFreightCalculation}
            >
              Calcul du taux{" "}
            </button>
            <div className="ResultatTaxable">{totalFreightCost} eur</div>
          </div>
          <div className="FeesContainer">
            <label>Frais agent: </label>
          </div>
          <input
            style={{ border: "1px solid black", width: "40%" }}
            type="number"
            placeholder="Agent total price"
            value={agentRate}
            onChange={(e) => setAgentRate(parseFloat(e.target.value))}
          />

          <div className="FeesContainer">
            <label>Vente: </label>
          </div>
          <input
            style={{ border: "1px solid black", width: "40%" }}
            type="number"
            placeholder="Sell price"
            value={vente}
            onChange={(e) => setVente(parseFloat(e.target.value))}
          />
          <div className="FeesContainer">
            <label>Informations particulières: </label>
          </div>
          <input
            style={{ border: "1px solid black" }}
            type="text"
            placeholder="Notes on shipment"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <div className="FeesContainer">
            <div className="Fassa">
              <button
                type="text"
                className="ButtonTaxable"
                onClick={FassaCalculation}
              >
                Marge nette
              </button>
              <div className="ResultatTaxable">{fassa} eur</div>
            </div>
          </div>
        </div>
      </div>
      <div className="Container3">
        <div className="DivSubmit">
          {flagSubmit ? (
            <div className="SubmitContainer">
              <div>
                <button className={ButtonSubmit} onClick={handleValidation}>
                  Soumettre
                </button>
              </div>
              <div className={buttonIsClicked}>
                Confirmez-vous cette nouvelle mise en place?
              </div>
              <div>
                <button className={buttonYes} onClick={handleSubmit}>
                  Oui
                </button>
                <button className={buttonNo} onClick={handleReset}>
                  Non
                </button>
              </div>
            </div>
          ) : (
            <button>Please fill the form</button>
          )}
        </div>
      </div>
      <div className={shipDiv}>Référence Commerce n°:{shipNumber}</div>
    </div>
  );
}
