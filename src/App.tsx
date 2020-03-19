/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { postOrder } from './connectors/bitmexHttp';
//import Socket from './connectors/bitmexSocket';
//import { OrderTypeEnum, SideEnum } from './types/Order';
import OrderForm from './pages/OrderForm/OrderForm';
//import { InstrumentProvider, defaultInstrument, InstrumentConsumer } from './contexts/instrument-context';
import RecentTrades from './components/RecentTrades';
// import SocketContext from './contexts/socket_context/context';
// import Emitter from './connectors/emitter';
// import { addArticle } from './redux/actions/index';
import List from './components/List';
import Form from './components/Form';
import Instrument from './components/Instrument';
import SocketStatus from './components/SocketStatus';
import TradeHistory from './components/TradeHistory';
import Orders from './components/Orders';
import './styles/App.css';
import Wallet from './components/Wallet';
import Position from './components/Position';

const Home = () => {
  //  postOrder({ symbol: 'XBTUSD', orderQty: 1, price: 5160, ordType: OrderTypeEnum.Limit, side: SideEnum.Buy, text: 'from bet-calculator-form' });
  return (
    <div className='App'>
      <br />
      <br />
      <br />
      <RecentTrades />
    </div>
  );
  // <pre>{JSON.stringify(liveData, null, 4)}</pre>
  // <TradingView />
  // <OrderForm onChange={console.log} price={5000} socket={socket} />
};

const App = ({ socket, dispatch }: any) => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/list'>list</Link>
            </li>
            <li>
              <Link to='/instrument'>Instrument</Link>
            </li>
            <li>
              <Link to='/Orders'>Orders</Link>
            </li>
            <li>
              <Link to='/Wallet'>Wallet</Link>
            </li>
            <li>
              <Link to='/Position'>Position</Link>
            </li>
            <li>
              <Link to='/form'>Form</Link>
            </li>
            <li>
              <Link to='/TradeHistory'>TradeHistory</Link>
            </li>
          </ul>
        </nav>
        <SocketStatus />
        <Switch>
          <Route path='/TradeHistory'>
            <TradeHistory />
          </Route>
          <Route path='/Orders'>
            <Orders />
          </Route>
          <Route path='/Position'>
            <Position />
          </Route>
          <Route path='/Wallet'>
            <Wallet />
          </Route>
          <Route path='/list'>
            <List />
          </Route>
          <Route path='/instrument'>
            <Instrument />
          </Route>
          <Route path='/form'>
            <Form />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
