import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state: any) => ({ socket: state.socket });

const ConnectedList = ({ socket }: any) => (
  <>
    <div className='tradeHistory'>
      <table className='table table-dark table-condensed table-sm table-small'>
        <tbody>
          {socket.trades
            .concat()
            .reverse()
            .map((trade: any) => (
              <tr key={trade.trdMatchID} style={{ color: trade.side === 'Sell' ? 'red' : 'green' }}>
                <td>{trade.price}</td>
                <td>{trade.size}</td>
                <td>{trade.side}</td>
                <td>{new Date(trade.timestamp).toLocaleTimeString()}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </>
);

const List = connect(mapStateToProps)(ConnectedList);

export default List;

/* [
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
//   },*/
