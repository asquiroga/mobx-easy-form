import { observer } from 'mobx-react-lite';
import { LoginFormState } from '../stores/LoginFormState';
import FormInput from './form/FormInput';

const state = new LoginFormState();
export const LoginForm = () => {
  return (
    <div
      style={{ backgroundColor: '#404050', padding: '1em', marginRight: '1em' }}
    >
      <h4>Login Form</h4>

      <FormInput state={state} stateKey="name" label="Username" />
      <FormInput
        state={state}
        stateKey="password"
        label="Password"
        type="password"
      />

      <input
        style={{ fontSize: '.8em' }}
        type="button"
        value="Submit"
        onClick={() => alert('Login Form Submit')}
        disabled={state.meta.hasErrors || !state.meta.isDirty}
      />
    </div>
  );
};

export default observer(LoginForm);
