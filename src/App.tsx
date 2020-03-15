/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import './styles/App.css';
import { postOrder } from './connectors/bitmexHttp';
import { OrderTypeEnum } from './types/Order';
//import TradingView from './pages/TradingView';
//import Websocket from 'react-websocket';
import OrderForm from './pages/OrderForm/OrderForm';

const App = () => {
  // postOrder({ symbol: 'XBTUSD', orderQty: 1, price: 5160, ordType: OrderTypeEnum.Limit, side: 'Buy', text: 'from bet-calculator-form' });
  return (
    <div className='App'>
      <br />
      <br />
      <br />
      <OrderForm onChange={console.log} price={5000} />
    </div>
  );
  // <TradingView />
};

export default App;
