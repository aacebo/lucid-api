import { format } from 'date-fns';

import { LOG_COLORS } from './log-colors.constant';
import { LogLevel } from './log-level.enum';

export class Logger {
  private static get _timestamp() {
    return format(new Date(), 'MM/dd/yyyy HH:mm:ss');
  }

  private static get _prefix() {
    return `[${this._timestamp}] - `;
  }

  private constructor() { }

  static async info(msg: string) {
    console.info(LOG_COLORS[LogLevel.Info](`${this._prefix}${msg}`));
  }

  static async warn(msg: string) {
    console.warn(LOG_COLORS[LogLevel.Warn](`${this._prefix}${msg}`));
  }

  static async error(msg: string) {
    console.error(LOG_COLORS[LogLevel.Error](`${this._prefix}${msg}`));
  }

  static async success(msg: string) {
    console.log(LOG_COLORS[LogLevel.Success](`${this._prefix}${msg}`));
  }

  static async bulk(parts: { text: string; level: LogLevel }[]) {
    let str = '';

    for (const part of parts) {
      str += LOG_COLORS[part.level](part.text);
    }

    console.log(`${LOG_COLORS[LogLevel.Info](this._prefix)}${str}`);
  }
}
