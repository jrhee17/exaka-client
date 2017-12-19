import {PipeTransform, Pipe} from "@angular/core";
/**
 * Created by john on 26/07/2017.
 */

@Pipe({name: 'formatNum'})
export class FormatNumPipe implements PipeTransform {
  public transform(value: any, args: string[]): string {
    if(!(value instanceof Number))
      return value;

    const numVal = Number(value);

    // Seconds
    if(numVal < 1000) {
      return String(numVal);
    } else {
      const kVal = Math.round(numVal / 1000);
      return `${kVal}K`;
    }
  }
}
