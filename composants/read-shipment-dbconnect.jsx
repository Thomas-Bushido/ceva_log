"use client";
import { useEffect, useState } from "react";
import "../composants/style/read-shipment-dbconnect.css";


export default function ListShipments() {
  const [list, setList] = useState([]);
  const [trackfile, setTrackFile] = useState("checklist hidden");
  const [selectedId, setSelectedId] = useState(null);
  const [menuList, setMenuList] = useState("menuList hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [isCheckListClicked, setIsCheckListClicked] = useState(false);
  const [checklists, setChecklists] = useState({}); // État pour stocker la checklist pour chaque ID
  

  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };
    fetchData();
  }, []);

  const getData = async () => {
    const response = await fetch("api/expeditions");
    const data = await response.json();
    setList(data.res);
  };

  const updateMenu = (id) => {
    setSelectedId(id);
    setMenuList(isMenuClicked ? "menuList hidden" : "menuList visible");
    setIsMenuClicked(!isMenuClicked);

    if (!checklists[id]) {
      // Initialiser la checklist pour cet ID si elle n'existe pas
      setChecklists((prev) => ({
        ...prev,
        [id]: {
          ExploitNumber: "",
          pickupDate: "",
          receptionDate: "",
          flightBooking: "",
          ltaDraft: "",
          agentApproval: "",
          companyDelivery: "",
          cfa: "",
          agentReception: "",
          clearance: "",
          delivery: "",
        },
      }));
    }
  };

  const updateChecklist = () => {
    setTrackFile(isCheckListClicked ? "checklist hidden" : "checklist visible");
    setIsCheckListClicked(!isCheckListClicked);
  };

  const handleChecklistChange = (e, field) => {
    const value = e.target.value;
    setChecklists((prev) => ({
      ...prev,
      [selectedId]: {
        ...prev[selectedId],
        [field]: value,
      },
    }));
  };


  return (
    <div className="backGround">
      <div className="maincontainer">
        <div className="container inlineContainer">
          <div className="listTitle">Liste des dossiers en cours</div>
          <div className="fileList">
            <div>
              {list.map((element) => (
                <li className="List" key={element._id}>
                  <p className="ChildList">Dossier Exploit' n°: ......<br /> Mise en place n°: {element.shipNumber}</p>
                  <div>
                  <button
                    className="detail-menu"
                    onClick={() => updateMenu(element._id)}
                  >
                    Voir le détail
                  </button>
                  </div>
                  <div>
                  <button className="detail-menu">
                    Supprimer
                  </button>
                  </div>
                </li>
              ))}
            </div>
          </div>
        </div>
        <div className="containerdetail">
          <div className={menuList}>
            <div className="fileDetail">
              <div className="shipmentInfos">
                {list
                  .filter((element) => element._id === selectedId)
                  .map((element) => (
                    <div key={element._id} className="divShipment">
                      <div className="fileTitle">
                        Mise en place n°: {element.shipNumber}<br />
                        Réf Exploit: 0N......
                      </div>
                      <div className="containerRatesRecap">
                      <div className="recap">
                        <h1 className="titleCosts">Récap</h1>
                        <div className="labelsCosts">
                          <label htmlFor="inputtext">Type de dossier:</label>
                          <p id="inputtext" type="text" defaultValue={element.typeFile}>{element.typeFile}</p>
                        </div>
                        <div className="labelsCosts">
                          <label htmlFor="inputtext">Client:</label>
                          <p id="inputtext" type="text" defaultValue={element.customerName}>{element.customerName}</p>
                        </div>
                        <div className="labelsCosts">
                          <label htmlFor="inputtext">Incoterm:</label>
                          <p id="inputtext" type="text" defaultValue={element.incoterm}>{element.incoterm}</p>
                        </div>
                        <div className="labelsCosts">
                          <label htmlFor="inputtext">Départ:</label>
                          <p id="inputtext" type="text" defaultValue={element.departure}>{element.departure}</p>
                        </div>
                        <div className="labelsCosts">
                          <label htmlFor="inputtext">Arrivée:</label>
                          <p id="inputtext" type="text" defaultValue={element.arrival}>{element.arrival}</p>
                        </div>
                        <div className="labelsCosts">
                          <label htmlFor="inputtext">Marchandise:</label>
                          <p id="inputtext" type="text" defaultValue={element.nature}>{element.nature}</p>
                        </div>
                        <div className="labelsCosts">
                          <label htmlFor="inputtext">Poids (en kgs):</label>
                          <p id="inputtext" type="text" defaultValue={element.weight}>{element.weight}</p>
                        </div>
                        <div className="labelDims">
                        <div>
                          <label htmlFor="inputnumber">dimension (en cm):</label>
                          <p id="inputnumber" type="number">{element.length}*{element.width}*{element.height}</p>
                        </div>
                          <label htmlFor="inputnumber">Poids taxable:</label>
                              {element.weight <
                              (element.length *
                                element.width *
                                element.height) /
                                6000
                                ? (element.length *
                                    element.width *
                                    element.height) /
                                  6000
                                : element.weight}{" "}
                              kgs
                         
                        </div>
                      </div>
                      <div className="rates">
                        <h1 className="titleCosts">Achats/Ventes</h1>
                        <div>
                          
                          <div className="labelsCosts">
                         <label  htmlFor="inputnumber">Pick up:</label> 
                         <p type="inputnumber" defaultValue={element.pickup}>{element.pickup}</p>
                          </div>
                          <div className="labelsCosts">
                         <label  htmlFor="inputnumber">Handling:</label> 
                         <p type="inputnumber" defaultValue={element.handling}>{element.handling}</p>
                          </div>
                          <div className="labelsCosts">
                         <label  htmlFor="inputnumber">Sécurisation:</label> 
                         <p type="inputnumber" defaultValue={element.secu}>{element.secu}</p>
                          </div>
                          <div className="labelsCosts">
                         <label  htmlFor="inputnumber">Douane export:</label> 
                         <p type="inputnumber" defaultValue={element.customClearance}>{element.customClearance}</p>
                          </div>
                          <div className="labelsCosts">
                         <label htmlFor="inputnumber">Frais aériens:</label> 
                         <p type="inputnumber" defaultValue={element.freightRate}>{element.freightRate}</p> 
                          </div>
                          <div className="labelsCosts">
                         <label  htmlFor="inputnumber">Frais agent:</label> 
                         <p type="inputnumber" defaultValue={element.agentRate}>{element.agentRate}</p> 
                          </div>
                          <div className="labelsCosts">
                         <label  htmlFor="inputnumber">Vente:</label> 
                         <p type="inputnumber" defaultValue={element.vente}>{element.vente}</p> 
                          </div>
                          <div className="labelsCosts">
                         <label  htmlFor="inputnumber">Fassa:</label> 
                         <p type="inputnumber" defaultValue={element.fassa}>{element.fassa}</p> 
                          </div>
                            
                          </div>
                          </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="checklistContainer">
                <div className="buttonChecklist">
                  <button onClick={updateChecklist}>Checklist</button>
                </div>
                <div className={trackfile}>
                  <div className="checklist">
                    {selectedId && checklists[selectedId] && (
                      <>
                        <div className="step"> 
                        <label>Dossier Exploitation N°:</label>
                        <input
                           type="text"
                           value={checklists[selectedId].ExploitNumber}
                           onChange={(e) =>
                             handleChecklistChange(e, "ExploitNumber")
                           }>
                        </input>
                        </div>
                        <div className="step">
                          <label>Date d'Enlèvement:</label>
                          <input 
                            type="date"
                            value={checklists[selectedId].pickupDate}
                            onChange={(e) =>
                              handleChecklistChange(e, "pickupDate")
                            }
                          />
                          <select
                            value={checklists[selectedId].pickupStatus || ""}
                            onChange={(e) =>
                              handleChecklistChange(e, "pickupStatus")
                            }
                          >
                            <option value=""> </option>
                            <option value="fait">fait</option>
                            <option value="à faire">non fait</option>
                          </select>
                          <br />
                          <label>
                            Note:<input></input>
                          </label>
                        </div>
                        <div className="step">
                          <label>Date de Réception:</label>
                          <input
                            type="date"
                            value={checklists[selectedId].receptionDate}
                            onChange={(e) =>
                              handleChecklistChange(e, "receptionDate")
                            }
                          />
                          <select
                            value={checklists[selectedId].receptionStatus || ""}
                            onChange={(e) =>
                              handleChecklistChange(e, "receptionStatus")
                            }
                          >
                            <option value=""> </option>
                            <option value="fait">fait</option>
                            <option value="à faire">non fait</option>
                          </select>
                          <br />
                          <label>
                            Note:<input></input>
                          </label>
                        </div>
                        <div className="step">
                          <label>Réservation de vol:</label>
                          <select
                            value={checklists[selectedId].flightBooking || ""}
                            onChange={(e) =>
                              handleChecklistChange(e, "flightBooking")
                            }
                          >
                            <option value=""> </option>
                            <option value="fait">fait</option>
                            <option value="à faire">non fait</option>
                          </select>
                          <br />
                          <label>
                            Note:<input></input>
                          </label>
                        </div>
                        <div className="step">
                          <label>Rédaction de LTA:</label>
                          <select
                            value={checklists[selectedId].ltaDraft || ""}
                            onChange={(e) =>
                              handleChecklistChange(e, "ltaDraft")
                            }
                          >
                            <option value=""> </option>
                            <option value="fait">fait</option>
                            <option value="à faire">non fait</option>
                          </select>
                          <br />
                          <label>
                            Note:<input></input>
                          </label>
                        </div>
                        <div className="step">
                          <label>Date de Remise en compagnie:</label>
                          <input
                            type="date"
                            value={checklists[selectedId].companyDelivery}
                            onChange={(e) =>
                              handleChecklistChange(e, "companyDelivery")
                            }
                          />
                          <select
                            value={checklists[selectedId].deliveryStatus || ""}
                            onChange={(e) =>
                              handleChecklistChange(e, "deliveryStatus")
                            }
                          >
                            <option value=""> </option>
                            <option value="fait">fait</option>
                            <option value="à faire">non fait</option>
                          </select>
                          <br />
                          <label>
                            Note:<input></input>
                          </label>
                        </div>
                        <div className="step">
                          <label>CFA:</label>
                          <select
                            value={checklists[selectedId].cfa || ""}
                            onChange={(e) => handleChecklistChange(e, "cfa")}
                          >
                            <option value=""> </option>
                            <option value="fait">fait</option>
                            <option value="à faire">non fait</option>
                          </select>
                          <br />
                          <label>
                            Note:<input></input>
                          </label>
                        </div>
                        <div className="step">
                          <label>Réception par l'agent à destination:</label>
                          <select
                            value={checklists[selectedId].agentReception || ""}
                            onChange={(e) =>
                              handleChecklistChange(e, "agentReception")
                            }
                          >
                            <option value=""> </option>
                            <option value="fait">fait</option>
                            <option value="à faire">non fait</option>
                          </select>
                          <br />
                          <label>
                            Note:<input></input>
                          </label>
                        </div>
                        <div className="step">
                          <label>Dédouanement:</label>
                          <select
                            value={checklists[selectedId].clearance || ""}
                            onChange={(e) =>
                              handleChecklistChange(e, "clearance")
                            }
                          >
                            <option value=""> </option>
                            <option value="fait">fait</option>
                            <option value="à faire">non fait</option>
                          </select>
                          <br />
                          <label>
                            Note:<input></input>
                          </label>
                        </div>
                        <div className="step">
                          <label>Livraison à destination:</label>
                          <input
                            type="date"
                            value={checklists[selectedId].deliveryDate}
                            onChange={(e) =>
                              handleChecklistChange(e, "deliveryDate")
                            }
                          />
                          <select
                            value={checklists[selectedId].delivery || ""}
                            onChange={(e) =>
                              handleChecklistChange(e, "delivery")
                            }
                          >
                            <option value=""> </option>
                            <option value="fait">fait</option>
                            <option value="à faire">non fait</option>
                          </select>
                          <br />
                          <label>
                            Note:<input></input>
                          </label>
                        </div>
                        {/* Répétez les blocs ci-dessus pour les autres champs de la checklist */}
                      </>
                    )}
                    
                  </div>
                  <div className="containersave">
                      <div className="saveButton">
                        <button>Sauvegarder</button>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
