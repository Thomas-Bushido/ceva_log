



export default function validateShipForm(typeFile, customerName, departure, arrival, nature, grossWeight, length, width, height, freightRate, pickup, handling, secu,incoterm, customClearance, agentRate, flagSubmit, result, vente, fassa) {
  
    if(typeFile === "Import" || typeFile === "Export" || typeFile === "Route" || typeFile === "Crosstrade" || typeFile === "Douane") {
       console.log("type ok")
       
    } else {
      console.log("type error");
      console.log(typeFile)
      return false;
        
    }
  
    if (customerName.length > 1) {
        console.log(" Name ok");

      } else {
        console.log("Name error");
        
        return false;
        
      }
      if (incoterm.length > 1 && incoterm.length <=3) {
        console.log(" incoterm ok");
      } else {
        console.log("incoterm error");
        return false;
        
      }
    if (departure.length > 0){
        console.log("departure ok");
    } else {
      console.log("departure error");
      return false;
      
    }
    if (arrival.length > 0){
        console.log("arrival ok");
    } else {
      console.log(" arrival error");
      return false;
      
    }
    if (nature.length > 0){
        console.log("nature ok");
    } else {
      console.log("nature error");
      return false;
      
    }
    if (grossWeight > 0){
        console.log("grossweight ok");
        console.log(grossWeight)
    } else {
      console.log("grossweight error");
      return false;
      
    }
    if (length > 0){
        console.log("length ok");
    } else {
      console.log("length error");
      return false;
      
    }
    if (width > 0){
        console.log("width ok");
    } else {
      console.log("width error");
      return false;
      
    }
    if (height > 0){
        console.log("height ok");
    } else {
      console.log("height error");
      return false;
      
    }
    if (pickup > 0){
        console.log("pickup ok");
    } else {
      console.log("pickup error");
      return false;
    }
    if (customClearance > 0){
        console.log("Cutoms ok");
    } else {
      console.log("Customs error");
      return false;
      
    }
    if (handling > 0){
        console.log("Handling ok");
    } else {
      console.log("Handling error");
      return false;
      
    }
    if (secu > 0){
        console.log("Securization ok");
    } else {
      console.log("Securization error");
      return false;
      
    }
    if (freightRate > 0){
        console.log("air freight rate ok");
    } else {
      console.log("air freight rate error");
      return false;
      
    }
    if (incoterm === 'DAP' || incoterm === 'DDP'){
        if(agentRate > 0){
            console.log("agent freight ok");
        } else {
            console.log("agent rate error");
            return false;
        }
    }
    
    if (vente > 0){
      console.log("Sell price ok");
  } else {
    console.log("Sell price error");
    return false;
    
  }
  if (fassa > 0){
    console.log("fassa ok");
} else {
  console.log("fassa error");
  console.log(fassa)
  return false;
  
}

    return true;
    };
