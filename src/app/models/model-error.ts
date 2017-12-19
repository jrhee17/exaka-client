/**
 * Created by john on 18/05/2017.
 */
export class ModelError {

  private errorDict: {};

  constructor(errorDict: {}) {
    this.errorDict = errorDict;
  }

  public getErrors(): string[] {
    const errors: string[] = [];

    for(let key in this.errorDict) {
      let errorArr: string[] = this.errorDict[key];
      errorArr.forEach((errorMessage) => {
        errors.push(key + ": " + errorMessage);
      }, this);
    }
    return errors;
  }
}
