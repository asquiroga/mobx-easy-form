import React from 'react';
import './App.css';
import { observer } from 'mobx-react-lite';
import { LoginFormState } from './stores/LoginFormState';
import LoginForm from './components/LoginForm';
import ComplexForm from './components/ComplexForm';

function App() {
  (window as any).JA = new LoginFormState();

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: 'flex' }}>
          <LoginForm />
          <ComplexForm />
        </div>
      </header>
    </div>
  );
}

export default observer(App);
