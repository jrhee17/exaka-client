import {FormGroup} from "@angular/forms";
/**
 * Created by john on 24/04/2017.
 */

// FORM GROUP VALIDATORS
export function matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
  return (group: FormGroup): {[key: string]: any} => {
    let password = group.controls[passwordKey];
    let confirmPassword = group.controls[confirmPasswordKey];

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({notEquivalent: true});
    } else if (confirmPassword.value && password.value === confirmPassword.value) {
      confirmPassword.setErrors(null);
    }
    return null;
  }
}
