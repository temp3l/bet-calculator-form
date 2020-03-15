import React from 'react';
import './styles/App.css';
import bitmexHttp from './connectors/bitmexHttp';
//import TradingView from './pages/TradingView';
import Websocket from 'react-websocket';

type FormProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Form = ({ onChange }: FormProps) => (
  <div className='container'>
    <form>
      <div className='form-group row'>
        <label htmlFor='staticEmail' className='col-sm-2 col-form-label'>
          Email
        </label>
        <div className='col-sm-10'>
          <input onChange={onChange} type='text' className='form-control-plaintext' id='staticEmail' value='email@example.com' />
        </div>
      </div>
      <div className='form-group row'>
        <label htmlFor='inputPassword' className='col-sm-2 col-form-label'>
          Password
        </label>
        <div className='col-sm-10'>
          <input onChange={onChange} type='password' className='form-control' id='inputPassword' placeholder='Password' />
        </div>
      </div>
    </form>
  </div>
);

const App = () => {
  bitmexHttp();
  return (
    <div className='App'>
      <h1>asd</h1>
      <Form onChange={console.log} />
    </div>
  );
  // <TradingView />
};

export default App;
