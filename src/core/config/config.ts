import * as dotenv from 'dotenv';
import * as fs from 'fs';

import { IConfig } from './config.interface';
import { Env } from './env.enum';

class Config {
  private _env: IConfig;

  get env() {
    return this._env;
  }

  get isProduction() {
    return this._env.env === Env.Prod;
  }

  constructor() {
    const parsed = dotenv.parse(fs.readFileSync(`${__dirname}/../../../${process.env.NODE_ENV || ''}.env`));

    this._env = {
      port: +parsed['PORT'],
      env: process.env.NODE_ENV as Env,
      db: parsed['DB'],
      secret: parsed['SECRET'],
    }
  }
}

export default new Config();
