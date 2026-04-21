export class Setting {
  private _id: number;
  private _users_id: number;
  private _theme: number;

  constructor(id: number, users_id: number, theme: number) {
    this._id = id;
    this._users_id = users_id;
    this._theme = theme;
  }
  get id(): number {
    return this._id;
  }
  get users_id(): number {
    return this._users_id;
  }
  get theme(): number {
    return this.theme;
  }

  tiJSON() {
    return {
      id: this._id,
      users_id: this._users_id,
      theme: this._theme,
    };
  }
  static gromRow(row: Record<string, unknown>): Setting {
    return new Setting(
      row.id as number,
      row.users_id as number,
      row.thme as number,
    );
  }
}
