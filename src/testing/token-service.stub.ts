import {Observable} from "rxjs";
import {TEST_CONST} from "./constants";
/**
 * Created by john on 02/10/2017.
 */

export class Angular2TokenServiceStub {
  init() {}

  userSignedIn() {
    return true;
  }

  get() {
    return Observable.throw({message: 'err'});
  }

  validateToken() {
    return Observable.of({
      json() {
        return {data: TEST_CONST.AUTH_OBJ}
      }
    });
  }

  signOut() {
    return Observable.of({result: true});
  }
}
