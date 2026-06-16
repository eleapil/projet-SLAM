
import { useState } from "react";
import Jeu from "./components/Jeu";
import Afficher from "./components/AfficherConnectInscr"
import StatsScore from "./components/Scoreboard";

function App() {
const [isConnected, setIsConnected] = useState(() => {
    return localStorage.getItem("user") !== null; // Renvoie true s'il y a un user, sinon false
  });


  if (isConnected){
    return(
      <>
      <Jeu />
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
