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
    const response = await fetch("api/expeditions/[id]");
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
    <>
      <div className="maincontainer">
        <div className="container">
          <div className="listTitle">Liste des dossiers en cours</div>
          <div className="fileList">
            <div>
              {list.map((element) => (
                <li key={element._id}>
                  ID: {element._id}
                  <button
                    className="detail-menu"
                    onClick={() => updateMenu(element._id)}
                  >
                    Voir le détail
                  </button>
                  <button>
                    Supprimer
                  </button>
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
                    <div key={element._id}>
                      <div className="fileTitle">
                        <p>Numéro de dossier: {element._id}</p>
                      </div>
                      <div className="recap">
                        <h1 className="titleCosts">Récap</h1>
                        <div style={{ paddingTop: "5px", paddingLeft: "18px" }}>
                          <label htmlFor="inputtext">Type de dossier:</label>
                          <input id="inputtext" type="text" defaultValue={element.typeFile}/>
                        </div>
                        <div style={{ paddingTop: "5px", paddingLeft: "18px" }}>
                          <label htmlFor="inputtext">Client:</label>
                          <input id="inputtext" type="text" defaultValue={element.customerName}/>
                        </div>
                        <div style={{ paddingTop: "5px", paddingLeft: "18px" }}>
                          <label htmlFor="inputtext">Incoterm:</label>
                          <input id="inputtext" type="text" defaultValue={element.incoterm}/>
                        </div>
                        <div style={{ paddingTop: "5px", paddingLeft: "18px" }}>
                          <label htmlFor="inputtext">Départ:</label>
                          <input id="inputtext" type="text" defaultValue={element.departure}/>
                        </div>
                        <div style={{ paddingTop: "5px", paddingLeft: "18px" }}>
                          <label htmlFor="inputtext">Arrivée:</label>
                          <input id="inputtext" type="text" defaultValue={element.arrival}/>
                        </div>
                        <div style={{ paddingTop: "5px", paddingLeft: "18px" }}>
                          <label htmlFor="inputtext">Marchandise:</label>
                          <input id="inputtext" type="text" defaultValue={element.nature}/>
                        </div>
                        <div style={{ paddingTop: "5px", paddingLeft: "18px" }}>
                          <label htmlFor="inputtext">Poids (en kgs):</label>
                          <input id="inputtext" type="text" defaultValue={element.weight}/>
                        </div>
                        <div style={{ paddingTop: "5px", paddingLeft: "18px" }}>
                        <div>
                          <label htmlFor="inputnumber">Longueur (en cm):</label>
                          <input id="inputnumber" type="number" defaultValue={element.length}/>
                        </div>
                        <div>
                          <label htmlFor="inputnumber">Largeur (en cm):</label>
                          <input id="inputnumber" type="number" defaultValue={element.width}/>
                        </div>
                        <div>
                          <label htmlFor="inputnumber">Hauteur (en cm):</label>
                          <input id="inputnumber" type="number" defaultValue={element.height}/>
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
                        <div style={{ padding: "18px" }}>
                          
                          <div>
                         <label htmlFor="inputnumber">Pick up:</label> 
                         <input type="inputnumber" defaultValue={element.pickup}/> 
                          </div>
                          <div>
                         <label htmlFor="inputnumber">Handling:</label> 
                         <input type="inputnumber" defaultValue={element.handling}/> 
                          </div>
                          <div>
                         <label htmlFor="inputnumber">Sécurisation:</label> 
                         <input type="inputnumber" defaultValue={element.secu}/> 
                          </div>
                          <div>
                         <label htmlFor="inputnumber">Dédouanement export:</label> 
                         <input type="inputnumber" defaultValue={element.customClearance}/> 
                          </div>
                          <div>
                         <label htmlFor="inputnumber">Frais aériens:</label> 
                         <input type="inputnumber" defaultValue={element.freightRate}/> 
                          </div>
                          <div>
                         <label htmlFor="inputnumber">Frais agent:</label> 
                         <input type="inputnumber" defaultValue={element.agentRate}/> 
                          </div>
                          <div>
                         <label htmlFor="inputnumber">Vente:</label> 
                         <input type="inputnumber" defaultValue={element.vente}/> 
                          </div>
                          <div>
                         <label htmlFor="inputnumber">Fassa:</label> 
                         <input type="inputnumber" defaultValue={element.fassa}/> 
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
    </>
  );
}
