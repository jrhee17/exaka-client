/**
 * Created by john on 05/10/2017.
 */
import {Injectable} from "@angular/core";

import * as log from 'loglevel';
import {Response} from "@angular/http";

@Injectable()
export class LoggerService {

  trace(message: string, ...args: any[]): void {
    let str_args = args.map((arg) => String(arg));
    log.trace(message, str_args);
  }

  debug(message: string, ...args: any[]): void {
    let str_args = args.map((arg) => String(arg));
    log.debug(message, str_args);
  }

  info(message: string, ...args: any[]): void {
    let str_args = args.map((arg) => String(arg));
    log.info(message, str_args);
  }

  warn(message: string, ...args: any[]): void {
    let str_args = args.map((arg) => String(arg));
    log.warn(message, str_args);
  }

  error(message: string, ...args: any[]): void {
    let str_args = args.map((arg) => String(arg));
    log.error(message, ...str_args);
  }

}
