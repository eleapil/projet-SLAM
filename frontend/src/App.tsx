import { useState } from "react";

import Afficher from "./components/AfficherConnectInscr"
import StatsScore from "./components/Scoreboard";

function App() {
const [isConnected, setIsConnected] = useState(() => {
    return localStorage.getItem("user") !== null; // Renvoie true s'il y a un user, sinon false
  });


  if (isConnected){
    return(
      <>
      <StatsScore/>
      </>
      )
    } else {
        return (
          <>
            <Afficher setIsConnected={setIsConnected} />
          </>
        )
      }  
}


export default App;
