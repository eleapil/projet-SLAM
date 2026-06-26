export class Setting {
  private _id: number;
  private _users_id: number;
  private _theme: string;
  private _clavier: string;

  constructor(id: number, users_id: number, theme: string, clavier: string) {
    this._id = id;
    this._users_id = users_id;
    this._theme = theme;
    this._clavier = clavier;
  }
  get id(): number {
    return this._id;
  }
  get users_id(): number {
    return this._users_id;
  }
  get theme(): string {
    return this._theme;
  }

  get clavier(): string {
    return this._clavier;
  }

  toJSON() {
    return {
      id: this._id,
      users_id: this._users_id,
      theme: this._theme,
      clavier: this._clavier,
    };
  }
  static fromRow(row: Record<string, unknown>): Setting {
    return new Setting(
      row.id as number,
      row.users_id as number,
      row.theme as string,
      row.clavier as string,
    );
  }
}
