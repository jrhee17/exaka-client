import {PipeTransform, Pipe} from "@angular/core";
/**
 * Created by john on 26/07/2017.
 */

@Pipe({name: 'timeSince'})
export class TimeSincePipe implements PipeTransform {
  public transform(value: any, args: string[]): string {

    if(value == null)
      return;

    const dateVal = new Date(value);

    // Seconds
    if(new Date().getTime() - dateVal.getTime() < 60 * 1000) {
      const seconds = Math.ceil((new Date().getTime() - dateVal.getTime()) / 1000);
      return `${seconds} seconds ago`;
    } else if (new Date().getTime() - dateVal.getTime() < 60 * 60 * 1000) {
      const mins = Math.ceil((new Date().getTime() - dateVal.getTime()) / (60 * 1000));
      return `${mins} minutes ago`;
    } else if (new Date().getTime() - dateVal.getTime() < 60 * 60 * 24 * 1000) {
      const hours = Math.ceil((new Date().getTime() - dateVal.getTime()) / (60 * 60 * 1000));
      return `${hours} hours ago`;
    } else if (new Date().getTime() - dateVal.getTime() < 60 * 60 * 24 * 365 * 1000) {
      const days = Math.ceil((new Date().getTime() - dateVal.getTime()) / (60 * 60 * 24 * 1000));
      return `${days} days ago`;
    } else {
      const years = Math.ceil((new Date().getTime() - dateVal.getTime()) / (60 * 60 * 24 * 365 * 1000));
      return `${years} years ago`;
    }
  }
}
