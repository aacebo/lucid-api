import * as faker from 'faker';
import * as md5 from 'md5';

import { User } from '../../controllers/user';
import { DEV_USER } from '../dev-user.constant';

export function user(length = 10) {
  const seeds: Partial<User>[] = [DEV_USER];

  for (let i = 1; i < length; i++) {
    seeds.push({
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: md5(faker.random.word()),
    });
  }

  return seeds;
}
