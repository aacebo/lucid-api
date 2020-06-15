import { UserModel } from '../controllers';

import * as seeds from './seeds';

export class Fixtures {
  static async initialize() {
    await this._users();
  }

  private static async _users() {
    await UserModel.deleteMany({});

    for (const seed of seeds.user()) {
      const user = new UserModel(seed);
      await user.save();
    }
  }
}
