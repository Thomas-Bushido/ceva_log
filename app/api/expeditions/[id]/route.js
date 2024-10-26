
import { log } from "console";
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

const PUT = async (req, { params }) => {
    // console.log({params})
    const { id } = params; // Récupérer l'ID des paramètres de l'URL
    const bodyData = await req.json();
    const client = await clientPromise;
    const db = client.db("Cevadata");
//    console.log("test")
    // Rechercher l'expédition par ID
    const existingShipment = await db.collection("Expeditions").find({ _id:id});
    // console.log({id})
    // console.log("******EXISTING SHIPMENT*****" + existingShipment)
    // console.log(existingShipment)
    if (!existingShipment) {
        return new Response(JSON.stringify({ error: "Expédition non trouvée" }), { status: 404 });
    }
   console.log(bodyData)
    // Mettre à jour l'expédition
    // const updatedData = Object.assign({}, bodyData);
    delete bodyData._id;
    await db.collection("Expeditions").updateOne(
        { _id: new ObjectId(id) },
        { $set: bodyData }
    );
    return new Response(JSON.stringify({ res: "Mise à jour réussie" }), { status: 200 });

};
// Nouvelle fonction DELETE pour supprimer une expédition par ID
const DELETE = async (req, { params }) => {
    const { id } = params; // Récupérer l'ID des paramètres de l'URL
    const client = await clientPromise;
    const db = client.db("Cevadata");

    // Vérifier si l'expédition existe
    const existingShipment = await db.collection("Expeditions").findOne({ _id: new ObjectId(id) });

    if (!existingShipment) {
        return new Response(JSON.stringify({ error: "Expédition non trouvée" }), { status: 404 });
    }

    // Supprimer l'expédition
    await db.collection("Expeditions").deleteOne({ _id: new ObjectId(id) });

    return new Response(JSON.stringify({ res: "Suppression réussie" }), { status: 200 });
};

export { PUT, DELETE };




