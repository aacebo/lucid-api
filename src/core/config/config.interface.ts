import { Env } from './env.enum';

export interface IConfig {
  readonly port: number;
  readonly env: Env;
  readonly db: string;
  readonly secret: string;
}
