import {Observable} from "rxjs";
import {TEST_CONST} from "./constants";
/**
 * Created by john on 02/10/2017.
 */



export class StoreStub {
  select() {
    return Observable.of(TEST_CONST.AUTH_OBJ);
  }

  dispatch(val: any) {
    return Observable.of(val);
  }
}
