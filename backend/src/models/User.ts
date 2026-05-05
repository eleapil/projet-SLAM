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
  get id(): number {
    return this.id;
  }
  get nom(): number {
    return this.nom;
  }
  get prenom(): number {
    return this.prenom;
  }
  get email(): number {
    return this.email;
  }
  get pseudo(): number {
    return this.pseudo;
  }
  get mdp(): number {
    return this.mdp;
  }

  toJSON() {
    return {
      id: this._id,
      nom: this._nom,
      prenom: this._prenom,
      email: this._email,
      pseudo: this._pseudo,
      mdp: this._mdp,
    };
  }
  static fromRow(row: Record<string, unknown>): User {
    return new User(
      row.id as number,
      row.nom as string,
      row.prenom as string,
      row.email as string,
      row.pseudo as string,
      row.mdp as string,
    );
  }
}
