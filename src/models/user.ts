import { Client } from "pg";

export default class User {
  private _client: Client

  constructor (client: Client) {
    this._client = client
  }

  public addUser() {

  }

  public removeUser() {

  }
}
