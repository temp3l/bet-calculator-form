import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state: any) => ({ orders: state.socket.orders });

const ConnectedList = ({ orders }: any) => (
  <>
    <div>
      <h3>Orders</h3>
      <table className='table table-dark table-condensed table-sm table-small'>
        <thead>
          <tr>
            <th>symbol</th>
            <th>Qty</th>
            <th>OrderPrice</th>
            <th>Filled</th>
            <th>StopPrice</th>
            <th>TriggeringPrice</th>
            <th>fillPrice</th>
            <th>Type</th>
            <th>Status</th>
            <th>Time</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order: any) => (
            <tr key={order.orderID}>
              <td>{order.symbol}</td>
              <td>{order.orderQty}</td>
              <td>{order.price}</td>
              <td></td>
              <td>{order.triggered}</td>
              <td></td>
              <td></td>
              <td>{order.ordType}</td>
              <td>{order.ordStatus}</td>
              <td>{order.timestamp}</td>
              <td>
                <button>cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <pre>{JSON.stringify(orders, null, 2)}</pre>
    </div>
  </>
);

const List = connect(mapStateToProps)(ConnectedList);

export default List;

// XBTUSD	 99	 3214.0		99	0.0308 XBT	-.--	Limit	New	9:05:18 PM
/*
const sample = {
  orderID: '7c8668df-0431-3276-308e-8818769c75d2',
  clOrdID: '',
  clOrdLinkID: '',
  account: 145875,
  symbol: 'XBTUSD',
  side: 'Buy',
  simpleOrderQty: null,
  orderQty: 1,
  price: 1000,
  displayQty: null,
  stopPx: null,
  pegOffsetValue: null,
  pegPriceType: '',
  currency: 'USD',
  settlCurrency: 'XBt',
  ordType: 'Limit',
  timeInForce: 'GoodTillCancel',
  execInst: '',
  contingencyType: '',
  exDestination: 'XBME',
  ordStatus: 'New',
  triggered: '',
  workingIndicator: true,
  ordRejReason: '',
  simpleLeavesQty: null,
  leavesQty: 1,
  simpleCumQty: null,
  cumQty: 0,
  avgPx: null,
  multiLegReportingType: 'SingleSecurity',
  text: 'Amended orderQty: Amend from testnet.bitmex.com\nSubmission from testnet.bitmex.com',
  transactTime: '2020-03-19T20:25:42.431Z',
  timestamp: '2020-03-19T20:27:31.358Z'
};
*/
