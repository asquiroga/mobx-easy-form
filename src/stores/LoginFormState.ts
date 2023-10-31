import AbstractFormState from './AbstractFormState';

export class LoginFormState extends AbstractFormState {
  validateOnKeyChange = true;

  fields = {
    name: {
      value: '',
      rules: 'required'
    },
    password: {
      value: '',
      rules: 'required|min:3'
    }
  };
}
