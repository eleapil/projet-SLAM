
import { useState } from "react";
import Jeu from "./components/Jeu";
import ConnectionOrInscription from "./components/AfficherConnectInscr"
function App() {
const [isConnected, setIsConnected] = useState(() => {
    return localStorage.getItem("user") !== null; // Renvoie true s'il y a un user, sinon false
  });


  if (isConnected){
    return(
      <>
      <Jeu />
      </>
      )
    } else {
        return (
          <>
            <ConnectionOrInscription setIsConnected={setIsConnected} />
          </>
        )
      }  
}


export default App;
