import clientPromise from "../../../lib/mongodb"

const POST = async (req) => {
    
    const bodyData = await req.json()
    const client = await clientPromise;

    const db = client.db("Cevadata");
    


    let myPost = await db.collection("Expeditions").insertOne(bodyData);

   
    


    return Response.json({ res: myPost.acknowledged ? "Done" : "Error" })
    // envoie la réponse au front 
    
}

const GET = async (req) => {
    const client = await clientPromise;
    const db = client.db("Cevadata");
    const tabList = await db.collection("Expeditions").find().toArray();
   console.log(tabList)
   return Response.json({res: tabList})
    // envoie la réponse au front 
}

export {GET, POST} 