export class User {
  private _id: number;
  private _nom: string;
  private _prenom: string;
  private _email: string;
  private _mdp: string;
  private _pseudo: string;

  constructor(
    id: number,
    nom: string,
    prenom: string,
    email: string,
    pseudo: string,
    mdp: string,
  ) {
    this._id = id;
    this._nom = nom;
    this._prenom = prenom;
    this._email = email;
    this._pseudo = pseudo;
    this._mdp = mdp;
  }
  get id(): number;
}
