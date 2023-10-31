import AbstractFormState, { Field } from './AbstractFormState';

export class ComplexFormState extends AbstractFormState {
  validateOnKeyChange = true;

  fields = {
    age: {
      value: '',
      rules: 'required|numeric'
    },
    url: {
      value: '',
      rules: 'required|url'
    },
    custom: {
      value: ''
    }
  };

  customValidation(): void {
    if (this.fields.custom.value !== 'hello') {
      (this.fields.custom as Field).error = "This field must be 'hello'";
    }
  }
}
