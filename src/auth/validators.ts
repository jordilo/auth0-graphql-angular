import { ValidatorFn, AbstractControl } from '@angular/forms';

export function samePassword(originalControlName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.parent) {
      return control;
    }
    const originalControl = control.parent.get(originalControlName);
    const isDifferentValue = originalControl.value !== control.value;
    if (isDifferentValue && originalControl.valid) {
      const error = { differentValue: true, };
      originalControl.setErrors(error);
      return error;
    }
    originalControl.setErrors(null);
    return null;
  };
}
