"use client";
import { useEffect, useState } from "react";

export default function List() {
  const [list, setList] = useState([]);

  console.log("plop");
  

  useEffect(() => {
    const fetchData = async () => {
      await getData()
    }
    fetchData()
  }, []);

  const getData = async () => {
    console.log('Hello')
    const response = await fetch('api/clients')
    const data = await response.json();
    console.log({data})

    
    setList(data.res);
  };

  // useEffect(() => {
  //   console.log({list})

  // }, [list]);


  return (
    <>
      <p>{list.map((element) => 
       <li>{element.email}</li>)}</p>
     
    </>
  );
}

//////////////////////////////////////////////////////////////////////////////
//   const initialList = [
//   { name: 'x', invAddress: '8 rue w', siret: '123456789', mailAddress: 'd@g.com'  },
//   { name: 'y', invAddress: '10 rue s', siret: '123456789', mailAddress: 'q@m.com'  },
//   { name: 'z', invAddress: '15 rue a', siret: '123456789', mailAddress: 'a@c.com'  },
// ];

//   return (
//     <>
//       <ul>
//         {list.map(customer => (
//           <li key={customer.name}>{customer.name}, {customer.invAddress}, {customer. siret}, {customer.mailAddress}</li>
//         ))}
//       </ul>
//     </>
//   );
// }
