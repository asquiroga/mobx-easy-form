import { ComplexFormState } from '../stores/ComplexFormState';
import FormInput from './form/FormInput';

const state = new ComplexFormState();
export const ComplexForm = () => {
  return (
    <div
      style={{ backgroundColor: '#404050', padding: '1em', marginRight: '1em' }}
    >
      <h4>Complex Form</h4>

      <FormInput state={state} stateKey="age" label="Age" />
      <FormInput state={state} stateKey="url" label="URL" />
      <FormInput state={state} stateKey="custom" label="Custom Field" />
    </div>
  );
};

export default ComplexForm;
