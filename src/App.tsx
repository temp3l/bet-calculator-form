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
import Fan from './components/Fan/Fan';
import NavBar from './components/Navbar/Navbar';

const Home = () => {
  //  postOrder({ symbol: 'XBTUSD', orderQty: 1, price: 5160, ordType: OrderTypeEnum.Limit, side: SideEnum.Buy, text: 'from bet-calculator-form' });
  return (
    <div className='App'>
      <br />
      <br />
      <br />
      {/*<RecentTrades />*/}
    </div>
  );
  // <pre>{JSON.stringify(liveData, null, 4)}</pre>
  // <TradingView />
  // <OrderForm onChange={console.log} price={5000} socket={socket} />
};

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
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
          <Route path='/OrderForm'>
            <OrderForm />
          </Route>
          <Route path='/Fan'>
            <Fan />
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
