import * as Chalk from 'chalk';

import { LogLevel } from './log-level.enum';

export const LOG_COLORS = {
  [LogLevel.Info]: Chalk.cyan,
  [LogLevel.Warn]: Chalk.yellow,
  [LogLevel.Error]: Chalk.red,
  [LogLevel.Success]: Chalk.green,
}
