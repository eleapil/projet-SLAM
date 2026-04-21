export class Stat {
  private _id: number;
  private _users_id: number;
  private _tentatives: number;
  private _duree: number;
  private _is_win: boolean;
  private _guess: string;

  constructor(
    id: number,
    users_id: number,
    tentatives: number,
    duree: number,
    is_win: boolean,
    guess: string,
  ) {
    this._id = id;
    this._users_id = users_id;
    this._tentatives = tentatives;
    this._duree = duree;
    this._is_win = is_win;
    this._guess = guess;
  }
  get id(): number {
    return this._id;
  }
  get users_id(): number {
    return this._users_id;
  }
  get tentatives(): number {
    return this._tentatives;
  }
  get duree(): number {
    return this._duree;
  }
  get is_win(): boolean {
    return this._is_win;
  }
  get guess(): string {
    return this._guess;
  }
}
