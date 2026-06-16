import { useState } from "react"
import Connection from "./Connection"
import Inscription from "./Insciption"

interface ConnectedProps {
  setIsConnected: (bool: boolean) => void;

}


export default function Afficher({ setIsConnected }: ConnectedProps) {
  const [isConnection, setIsConnection] = useState(true)

  return(
    <>
      {isConnection ? <Connection setIsConnection={setIsConnection} setIsConnected={setIsConnected}/> : <Inscription setIsConnection={setIsConnection}/>}
    </>
    )

}