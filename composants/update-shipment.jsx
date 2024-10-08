"use client";
import { useEffect, useState } from "react";
import "../composants/read-shipment-dbconnect";
import "../composants/style/add-shipment.css";
import validateShipForm from "./validate-ship-form";

export default function UpdateShipments() {
  const [list, setList] = useState([]);
  const [visibleList, setVisibleList] = useState([]);
  const [result, setResult] = useState("result visible");
  const [selectedId, setSelectedId] = useState("");
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };
    fetchData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch("api/expeditions");
      const data = await response.json();
      setList(data.res);
      setVisibleList(data.res);
    } catch (error) {
      console.error("Erreur lors du chargement des données :", error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSelectedId(value); // Met à jour l'ID sélectionné
    const filterList = list.filter((element) => element._id.includes(value));
    setResult("result visible");
    setVisibleList(filterList);
  };

  const handleEdit = (item) => {
    setEditData({ ...item });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!editData || !editData._id) return; // Assurez-vous qu'il y a des données à sauvegarder

    // Appeler validateShipForm et vérifier si les données sont valides
    const isValid = validateShipForm(
        editData.typeFile,
        editData.customerName,
        editData.departure,
        editData.arrival,
        editData.nature,
        editData.grossWeight,
        editData.length,
        editData.width,
        editData.height,
        editData.freightRate,
        editData.pickup,
        editData.handling,
        editData.secu,
        editData.incoterm,
        editData.customClearance,
        editData.agentRate,
        editData.flagSubmit,
        editData.result,
        editData.vente,
        editData.fassa
    );

    if (!isValid) {
        alert("Les données du formulaire ne sont pas valides. Veuillez vérifier les champs.");
        return; // Stopper l'enregistrement si les données ne sont pas valides
    }

    try {
        console.log("Données envoyées :", JSON.stringify(editData));
        console.log("ID de l'expédition :", editData._id);
        const response = await fetch(`api/expeditions/${editData._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editData), // Convertit editData en JSON pour l'envoi
        });

        if (response.ok) {
            alert("Mise à jour réussie !");
            await getData(); // Rafraîchir les données
            setEditData(null); // Réinitialiser l'édition
        } else {
            const errorMessage = await response.json();
            console.error(`Erreur lors de la mise à jour. Statut: ${response.status}. Détails: ${errorMessage.error}`);
            alert(`Erreur lors de la mise à jour. Détails: ${errorMessage.error}`);
        }
    } catch (error) {
        console.error("Erreur :", error);
    }
};

  


  return (
    <div className="MainContainer">
      <h1 className="MainTitle">Modifier une expédition</h1>
      <div>
        <label>Rechercher par ID</label>
        <input
          type="text"
          value={selectedId}
          onChange={(e) => {
            handleSearch(e); // Recherche à chaque changement
          }}
        />
      </div>
      <div className={result}>
        {visibleList.length > 0 ? (
          visibleList.map((item) => (
            <div key={item._id} className="FeesContainer">
              <h3>ID: {item._id}</h3>
              <button onClick={() => handleEdit(item)}>Modifier</button>
            </div>
          ))
        ) : (
          <p>Aucun résultat trouvé</p>
        )}
      </div>
      {editData && (
        <div className="EditForm">
          <h2>Modification de l'expédition</h2>
          <div>
            <label>Type de dossier :</label>
            <select
    name="typeFile"
    value={editData.typeFile || ""}
    onChange={handleInputChange}
  >
    <option value="">Sélectionnez un type</option>
    <option value="Export">Export</option>
    <option value="Import">Import</option>
    <option value="Douane">Douane</option>
    <option value="Crosstrade">Crosstrade</option>
    {/* Ajoutez d'autres options ici */}
  </select>
          </div>
          <div>
            <label>Nom :</label>
            <input
              name="customerName"
              value={editData.customerName || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Incoterm :</label>
            <input
              name="incoterm"
              value={editData.incoterm || ""}
              onChange={handleInputChange}
            />
          </div>
          <button onClick={handleSave}>Enregistrer</button>
          <button onClick={() => setEditData(null)}>Annuler</button>
        </div>
      )}
    </div>
  );
}

