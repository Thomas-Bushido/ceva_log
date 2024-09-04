// export default function handler(req, res) {
//     if (req.method === 'POST') {
//       // Process a POST request
//     } else {
//       // Handle any other HTTP method
//       res.send("Hello World")
//     }
//   }

import clientPromise from "../../../lib/mongodb"

const POST = async (req) => {
    
    const bodyData = await req.json()
    const client = await clientPromise;

    const db = client.db("Cevadata");
    

    const compare = await db.collection("Clients").find({siret:
        bodyData.siret}).toArray();
   console.log(compare)

    if(compare.length !== 0) {
        return Response.json({ res: "Siret déjà utilisé"})
    }
    
    let myPost = await db.collection("Clients").insertOne(bodyData);

   
    


    return Response.json({ res: myPost.acknowledged ? "Done" : "Error" })
    // envoie la réponse au front 
    
}

const GET = async (req) => {
    const client = await clientPromise;
    const db = client.db("Cevadata");
    const tabList = await db.collection("Clients").find().toArray();
   console.log(tabList)
   return Response.json({res: tabList})
    // envoie la réponse au front 
}

export {GET, POST} 

