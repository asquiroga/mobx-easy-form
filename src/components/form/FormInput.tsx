import { observer } from 'mobx-react-lite';
import AbstractFormState from '../../stores/AbstractFormState';

type FormInputProps<T extends AbstractFormState> = {
  state: T;
  stateKey: keyof T['fields'];
  label?: string;
  type?: 'text' | 'password' | 'time';
};

const FormInput = <T extends AbstractFormState>({
  state,
  stateKey,
  label,
  type = 'text'
}: FormInputProps<T>) => {
  return (
    <div style={{ margin: '.5em' }}>
      {label && <span style={{ paddingRight: '1em' }}>{label}:</span>}
      <input
        type={type}
        value={state.fields[stateKey as string].value}
        name={stateKey as string}
        onChange={state.handleInputChange}
        onBlur={state.handleInputBlur}
      />

      {state.fields[stateKey as string].error && (
        <span
          style={{
            color: '#C87070',
            display: 'block',
            fontSize: '.8em',
            margin: '.2em'
          }}
        >
          {state.fields[stateKey as string].error}
        </span>
      )}
    </div>
  );
};

export default observer(FormInput);
