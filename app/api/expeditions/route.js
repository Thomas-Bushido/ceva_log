import clientPromise from "../../../lib/mongodb";

// Nouvelle méthode POST pour créer une expédition
const POST = async (req) => {
    const bodyData = await req.json();
    const client = await clientPromise;
    const db = client.db("Cevadata");

    // Créer une nouvelle expédition
    const newShipment = await db.collection("Expeditions").insertOne(bodyData);

    if (!newShipment.insertedId) {
        return new Response(JSON.stringify({ error: "Erreur lors de la création de l'expédition" }), { status: 500 });
    }

    return new Response(JSON.stringify({ res: "Expédition créée avec succès", id: newShipment.insertedId }), { status: 201 });
};


const GET = async (req) => {
    const client = await clientPromise;
    const db = client.db("Cevadata");
    // console.log({db})
    const tabList = await db.collection("Expeditions").find({}).toArray();
    // console.log({tabList})
    return new Response(JSON.stringify({ res: tabList }), { status: 200 });
};

export { POST, GET };