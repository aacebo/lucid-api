import { User } from '../../../controllers';

export interface IResponse<T = any> {
  readonly user?: Partial<User>;
  readonly meta?: {
    readonly length?: number;
    readonly total?: number;
  };
  readonly links?: {
    readonly self: string;
  };
  readonly data: T | T[];
}
