import 'reflect-metadata';

import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as json from 'koa-json';
import * as bodyparser from 'koa-bodyparser';
import * as cors from '@koa/cors';
import * as mongoose from 'mongoose';

import { Fixtures } from './fixtures';
import { Config } from './core/config';
import { Logger } from './core/logger';
import { printObject } from './core/utils';
import * as middleware from './core/middleware';
import * as controllers from './controllers';

mongoose.connect(Config.instance.env.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(async () => {
  const app = new Koa();
  const router = new Router();
  const port = process.env.PORT || 3000;

  printObject({
    port,
    env: Config.instance.env.env || 'prod',
  });

  if (!Config.instance.isProduction) {
    Logger.warn(`Initializing fixtures...`);
    await Fixtures.initialize();
  }

  app.use(json());
  app.use(bodyparser());
  app.use(cors());

  app.use(middleware.auth);

  app.use(controllers.user.routes())
     .use(controllers.auth.routes());

  app.use(middleware.logger)
     .use(middleware.response);

  app.use(router.routes());
  app.use(router.allowedMethods());

  app.listen(port, () => {
    Logger.info('Listening...');
  });
}).catch(err => {
  Logger.error(err);
});

