"use client";


import { useEffect, useState } from "react";


export default function CreateShipment() {
  const [customName, setCustomName] = useState("");
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [nature, setNature] = useState("");
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [freightRate, setFreightRate] = useState("");
  const [pickup, setPickup] = useState("");
  const [handling, setHandling] = useState("");
  const [secu, setSecu] = useState("");
  const [incoterm,setIncoterm] = useState("");
  const [customClearance,setCustomClearance] = useState("");
  const [agentRate, setAgentRate] = useState ("");
  const [flagSubmit, setFlagSubmit] = useState(false);
  const [result, setResult] = useState("");
  const [fassa, setFassa] = useState("");
  const [vente, setVente] = useState("");

  const validateForm = () => {
    if (customName.length > 1) {
        console.log(" Name ok");
      } else {
        console.log("Name error");
        setFlagSubmit(false);
        return;
      }
      if (incoterm.length > 1 && incoterm.length <=3) {
        console.log(" incoterm ok");
      } else {
        console.log("incoterm error");
        setFlagSubmit(false);
        return;
      }
    if (departure.length > 0){
        console.log("departure ok");
    } else {
      console.log("departure error");
      setFlagSubmit(false);
      return;
    }
    if (arrival.length > 0){
        console.log("arrival ok");
    } else {
      console.log(" arrival error");
      setFlagSubmit(false);
      return;
    }
    if (nature.length > 0){
        console.log("nature ok");
    } else {
      console.log("nature error");
      setFlagSubmit(false);
      return;
    }
    if (weight.length > 0){
        console.log("weight ok");
    } else {
      console.log("weight error");
      setFlagSubmit(false);
      return;
    }
    if (length.length > 0){
        console.log("length ok");
    } else {
      console.log("length error");
      setFlagSubmit(false);
      return;
    }
    if (width.length > 0){
        console.log("width ok");
    } else {
      console.log("width error");
      setFlagSubmit(false);
      return;
    }
    if (height.length > 0){
        console.log("height ok");
    } else {
      console.log("height error");
      setFlagSubmit(false);
      return;
    }
    if (pickup.length > 0){
        console.log("pickup ok");
    } else {
      console.log("pickup error");
      setFlagSubmit(false);
      return;
    }
    if (pickup.length > 0){
        console.log("pickup ok");
    } else {
      console.log("pickup error");
      setFlagSubmit(false);
      return;
    }
    if (customClearance.length > 0){
        console.log("Cutoms ok");
    } else {
      console.log("Customs error");
      setFlagSubmit(false);
      return;
    }
    if (handling.length > 0){
        console.log("Handling ok");
    } else {
      console.log("Handling error");
      setFlagSubmit(false);
      return;
    }
    if (secu.length > 0){
        console.log("Securization ok");
    } else {
      console.log("Securization error");
      setFlagSubmit(false);
      return;
    }
    if (freightRate.length > 0){
        console.log("air freight rate ok");
    } else {
      console.log("air freight rate error");
      setFlagSubmit(false);
      return;
    }
    if (incoterm === 'DAP' || incoterm === 'DDP'){
        if(agentRate.length > 0){
            console.log("agent freight ok");
        } else {
            console.log("agent rate error");
            setFlagSubmit(false);
        }
    } else {
      console.log("agent freight ok");
      setFlagSubmit(true);
      return;
    }
    if(fassa.length > 0){
        console.log("fassa ok")
    } else {
        console.log("fassa error")
    }
    if (vente.length > 0){
      console.log("Sell price ok");
  } else {
    console.log("Sell price error");
    setFlagSubmit(false);
    return;
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
            incoterm: incoterm,
            departure : departure,
            arrival: arrival,
            nature: nature,
            weight: weight,
            length: length,
            width: width,
            height: height,
            freightRate: freightRate,
            pickup: pickup,
            handling: handling,
            secu: secu,
            incoterm: incoterm,
            customClearance: customClearance,
            agentRate: agentRate,
            vente: vente,
            fassa: fassa,
             

          })
        );
        const response = await fetch("api/expeditions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: customName,
                incoterm: incoterm,
                departure : departure,
                arrival: arrival,
                nature: nature,
                weight: weight,
                length: length,
                width: width,
                height: height,
                freightRate: freightRate,
                pickup: pickup,
                handling: handling,
                secu: secu,
                incoterm: incoterm,
                customClearance: customClearance,
                agentRate: agentRate,
                vente: vente,
                fassa: fassa,
            }),
          });
          const result = await response.json();
    setResult(result.res);
    // récupération de la réponse envoyée depuis le back: return Response.json({ res: myPost.acknowledged ? "Done" : "Error" })
    console.log(result);
  };
    

    useEffect(() => {
        validateForm(customName, departure, arrival, nature, weight,length, width, height, freightRate, pickup, handling, secu,incoterm, customClearance, agentRate, flagSubmit, result, vente, fassa);
      }, [customName, departure, arrival, nature, weight,length, width, height, freightRate, pickup, handling, secu,incoterm, customClearance, agentRate, flagSubmit, result, vente, fassa]);
    
      useEffect(() => {
        console.log("test");
      
        if (flagSubmit) {
    
        } else {
          setFlagSubmit(false);
        }
      }, [flagSubmit]);


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
      <h1>Create new shipment</h1>
      <div style={{ padding: "5px" }}>
        <label>Customer's name:</label>
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
      <label>Incoterm:</label>
      </div>
      <div style={{ paddingBottom: "18px" }}>
        <input
          style={{border: "1px solid black"}}
          type="text"
          placeholder="Terms code for this shipment"
          value={incoterm}
          onChange={(e) => setIncoterm(e.target.value)}
        />
      </div>
      <div style={{ padding: "5px" }}>
        <label>Departure:</label>
      </div>
      <div style={{ paddingBottom: "18px" }}>
        <input
          style={{border: "1px solid black"}}
          type="text"
          placeholder="Airport of Departure"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
        />
      </div>
      <div style={{ padding: "5px" }}>
        <label>Arrival:</label>
      </div>
      <div style={{ paddingBottom: "18px" }}>
        <input
          style={{border: "1px solid black"}}
          type="text"
          placeholder="Airport of Arrival"
          value={arrival}
          onChange={(e) => setArrival(e.target.value)}
        />
      </div>
      <div style={{ padding: "5px" }}>
        <label>Nature of the shipment:</label>
      </div>
      <div style={{ paddingBottom: "18px" }}>
        <input
          style={{border: "1px solid black"}}
          type="text"
          placeholder="Nature of the shipment"
          value={nature}
          onChange={(e) => setNature(e.target.value)}
        />
      </div>
      <div style={{ padding: "5px" }}>
        <label>Dimensions:</label>
      </div>
      <div style={{ paddingBottom: "30px" }}>
        <input
          style={{border: "1px solid black"}}
          type="number"
          placeholder="gross weight in kgs"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <input
          style={{border: "1px solid black"}}
          type="number"
          placeholder="Length of the packet in cm"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
          <input
          style={{border: "1px solid black"}}
          type="number"
          placeholder="Width of the packet in cm"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />
         <input
          style={{border: "1px solid black"}}
          type="number"
          placeholder="Height of the packet in cm"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <div>Taxable weight in kgs: {weight>((length*width*height)/6000)? weight: ((length*width*height)/6000)}</div>
      </div>
      <div style={{ padding: "5px" }}>
        <label>Fees:</label>
      </div>
      <div style={{ paddingBottom: "18px" }}>
        <input
          style={{border: "1px solid black"}}
          type="number"
          placeholder="Pick up fees"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
        />
      </div>
      <div style={{ paddingBottom: "18px" }}>
        <input
          style={{border: "1px solid black"}}
          type="number"
          placeholder="Customs Fees"
          value={customClearance}
          onChange={(e) => setCustomClearance(e.target.value)}
        />
      </div>
      <div style={{ paddingBottom: "18px" }}>
        <input
          style={{border: "1px solid black"}}
          type="number"
          placeholder="Handling fees "
          value={handling}
          onChange={(e) => setHandling(e.target.value)}
        />
      </div>
      <div style={{ paddingBottom: "18px" }}>
        <input
          style={{border: "1px solid black"}}
          type="number"
          placeholder="Securization fees "
          value={secu}
          onChange={(e) => setSecu(e.target.value)}
        />
      </div>
      <div style={{ paddingBottom: "18px" }}>
        <input
          style={{border: "1px solid black"}}
          type="number"
          placeholder="Airfreight Rate"
          value={freightRate}
          onChange={(e) => setFreightRate(e.target.value)}
        />
      </div>
      <div style={{ paddingBottom: "18px" }}>
        <input
          style={{border: "1px solid black"}}
          type="number"
          placeholder="Agent total price"
          value={agentRate}
          onChange={(e) => setAgentRate(e.target.value)}
        />
      </div>
      <div style={{ paddingBottom: "18px" }}>
        <input
          style={{border: "1px solid black"}}
          type="number"
          placeholder="Sell price"
          value={vente}
          onChange={(e) => setVente(e.target.value)}
        />
      </div>
      <div style={{ paddingBottom: "18px" }}>
        <input
          style={{border: "1px solid black"}}
          type="number"
          placeholder="fassa"
          value={fassa}
          onChange={(e) => setFassa(e.target.value)}
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