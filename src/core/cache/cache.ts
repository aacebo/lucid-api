import { User } from '../../controllers';

const EXPIRATION_MS = 5 * 60 * 1000;

export class Cache {
  private static _instance: Cache;
  private _cache: { [id: string]: { user: User, exp: number } } = { };

  static get instance() {
    if (!this._instance) {
        this._instance = new Cache();
    }

    return this._instance;
  }

  private get _timestamp() {
    return new Date().getTime();
  }

  private constructor() { }

  has(id: string) {
    return this._cache[id] !== undefined;
  }

  set(id: string, v: User) {
    this._cache[id] = {
      user: v,
      exp: this._timestamp + EXPIRATION_MS,
    }
  }

  get(id: string) {
    const entry = this._cache[id];

    if (entry && entry.exp > this._timestamp) {
      return entry.user;
    } else {
      delete this._cache[id];
    }
  }

  remove(id: string) {
    if (this._cache[id]) {
      delete this._cache[id];
    }
  }
}
