import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state: any) => ({ socket: state.socket });

const ConnectedList = ({ socket }: any) => (
  <>
    <h3>Trades</h3>
    <ul>
      {socket.trades.map((trade: any) => (
        <li key={trade.trdMatchID}>{trade.timestamp}</li>
      ))}
    </ul>
    <pre>{JSON.stringify(socket.trades, null, 2)}</pre>
  </>
);

const List = connect(mapStateToProps)(ConnectedList);

export default List;

// Trades
// [
//   {
//     "timestamp": "2020-03-19T08:31:44.552Z",
//     "symbol": "XBTUSD",
//     "side": "Sell",
//     "size": 1,
//     "price": 5440.5,
//     "tickDirection": "MinusTick",
//     "trdMatchID": "9dd6c01b-ea11-2566-12d0-d4c48bf69234",
//     "grossValue": 18381,
//     "homeNotional": 0.00018381,
//     "foreignNotional": 1
//   },
