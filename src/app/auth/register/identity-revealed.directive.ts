import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

// Validar que las contraseñas sean iguales
export const passwordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {

  const pass1Control = control.get('password').value;
  const pass2Control = control.get('passwordConfirm').value;

  return (pass1Control === pass2Control) ? null : { noEsIgual: true };
};
