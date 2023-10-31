import { action, makeObservable, observable, toJS } from 'mobx';
import Validator from 'validatorjs';

export interface Field {
  value: string;
  rules?: string; // ValidatorJS rules, like "required|minLength:3"
  error?: string;
}

interface Meta {
  hasErrors: boolean;
  isDirty: boolean; // if any field has changed
  fieldBlured: boolean; // if some field has lost focus
}

export abstract class AbstractFormState {
  abstract fields: Record<string, Field>;
  abstract validateOnKeyChange: boolean; // if false, will only validate on input blur
  customValidation?(): void; // Implement if you need custom validations

  meta: Meta = {
    hasErrors: false,
    isDirty: false,
    fieldBlured: false
  };

  constructor() {
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    // Add mobx observers
    const properties = Object.getOwnPropertyNames(this);
    const observableMap: Record<string, any> = {};
    properties.forEach((aProperty) => {
      if (typeof this[aProperty as keyof AbstractFormState] === 'function') {
        observableMap[aProperty] = action;
      } else {
        observableMap[aProperty] = observable;
      }
    });
    makeObservable(this, observableMap);
  }

  handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const fieldsKey = e.target.getAttribute('name') as string;
    this.fields[fieldsKey].value = e.target.value;
    this.meta.isDirty = true;
    if (this.validateOnKeyChange) {
      this.validate(fieldsKey);
    }
  }

  handleInputBlur(e: React.ChangeEvent<HTMLInputElement>) {
    if (this.validateOnKeyChange) return;
    // Validate, and show current field error
    this.meta.fieldBlured = true;
    const fieldsKey = e.target.getAttribute('name') as string;
    this.validate(fieldsKey);
  }

  // Validates all fields. If field specified, updates the field error.
  validate(field?: string) {
    const values = this.getFlattenedFields();
    const rules = this.getFlattenedFields('rules');

    const validation = new Validator(values, rules);
    this.meta.hasErrors = !validation.check();
    if (field) {
      this.fields[field].error = validation.errors.first(field) || undefined;
    }
    if (this.customValidation) {
      this.customValidation();
    }
    return validation;
  }

  validateAllFields() {
    const validation = this.validate();
    const errors = validation.errors;
    Object.keys(toJS(this.fields)).forEach((aKey) => {
      this.fields[aKey].error = errors.first(aKey) || undefined;
    });
  }

  getFlattenedFields(valueKey = 'value') {
    const result: any = {};
    Object.keys(toJS(this.fields)).forEach((aKey) => {
      if ((this.fields[aKey] as any)[valueKey] !== undefined)
        result[aKey] = (this.fields[aKey] as any)[valueKey];
    });
    return result;
  }
}

export default AbstractFormState;
