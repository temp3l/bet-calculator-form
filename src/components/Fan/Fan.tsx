import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../Spinner';
import BaseForm from '../OrderForm/BaseForm';
import { OrderTypeEnum, IOrder, SideEnum } from '../../types/Order';
import { postOrder } from '../../connectors/bitmexHttp';
import { orderBulk } from './OrderBulk';
import { generateOrders } from './scaler';
import './Fan.css';
const mapStateToProps = (state: any) => ({ instrument: state.socket.instrument });
// https://camo.githubusercontent.com/2a48aa2c3194b58474fea5b647640c0b55d410ca/68747470733a2f2f692e696d6775722e636f6d2f6b6673517a4c682e706e67
const orderTypes = [
  { value: 'Limit', text: 'The default order type. Specify an orderQty and price.' },
  { value: 'StopLimit', text: 'Like a Stop Market, but enters a Limit order instead of a Market order. Specify an orderQty, stopPx, and price.' },
  { value: 'LimitIfTouched', text: 'As above; use for Take Profit Limit orders.' },
];
// https://www.amcharts.com/demos/live-order-book-depth-chart/
const sampleTakeProfit = {
  ordType: 'LimitIfTouched',
  price: 6778,
  stopPx: 6778,
  orderQty: 10,
  side: 'Sell',
  execInst: 'Close,LastPrice',
  symbol: 'XBTUSD',
  text: 'Submission from testnet.bitmex.com',
};
const sampleStopLoss = {
  ordType: 'Stop',
  stopPx: 4555,
  orderQty: 10,
  side: 'Sell',
  execInst: 'Close,LastPrice',
  symbol: 'XBTUSD',
  text: 'Submission from testnet.bitmex.com',
};

const getDefaults = () => {
  const defaultFan = {
    price: -1,
    amount: 50,
    symbol: 'XBTUSD',
    side: SideEnum.Buy,
    count: 3,
    spread: 50,
    ordType: OrderTypeEnum.Limit,
  };
  let fan = defaultFan;
  try {
    fan = JSON.parse(localStorage.getItem('fan') || JSON.stringify(defaultFan));
  } catch (e) {
    console.log('localStorage.getItem("fan") ', e.message);
  }
  return { fan };
};

const ConnectedList = ({ instrument }: any) => {
  const initialState = getDefaults();
  const [orders, setOrders] = React.useState<IOrder[]>([]);
  const [fan, setFan] = React.useState(initialState.fan);
  const [bulk, setBulk] = React.useState<any>();

  const onChange = (e: any) => {
    setFan({ ...fan, [e.target.name]: e.target.value });
    persistState();
  };

  const returnOrders = (): IOrder[] => {
    const { price, count, side, amount, spread } = fan;
    //let qty = Math.floor((count / amount) * count);

    let data = {
      amount: Number(amount),
      orderCount: Number(count) < 2 || Number.isNaN(Number(amount)) ? 2 : Number(count),
      priceLower: Number(price),
      priceUpper: side === 'Sell' ? Number(price) + Number(spread) * Number(count) : Number(price) - Number(spread) * Number(count),
      distribution: 'increasing',
      tickSize: Number(spread),
    };
    let _orders: any = generateOrders(data);
    console.log(_orders);

    //return _orders
    if (!_orders || !_orders.length) return [];
    return _.times(fan.count, (i) => {
      const order: IOrder = {
        //orderQty: Math.round(Number(amount) / Number(count)),
        orderQty: _orders[i].amount,
        price: Math.round(side === 'Buy' ? Number(price) - i * spread : Number(price) + i * spread),
        symbol: 'XBTUSD',
        ordType: OrderTypeEnum.Limit,
        side,
        text: `fan order ${i}`,
      };
      return order;
    });
  };

  const persistState = () => localStorage.setItem('fan', JSON.stringify(fan));

  const submitOrders = () => {
    postOrder({ orders })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log('############# error posting');
        console.log(e);
      })
      .finally(() => {
        console.log('finally ....');
      });
  };

  React.useEffect(() => {
    setOrders(returnOrders());
    setBulk(
      orderBulk({
        quantity: 100,
        n_tp: 5,
        start: 4000,
        end: 5000,
        side: 'Buy',
        stop: 6000,
        symbol: 'XBTUSD',
        //execInst: 'ParticipateDoNotInitiate',
        distribution: 'Positive',
      })
    );
  }, [fan]);

  React.useEffect(() => {
    if (!fan || !fan.price) return;
    if (instrument && instrument.lastPrice && fan.price === -1) {
      setFan({ ...fan, price: instrument.lastPrice });
      persistState();
    }
  }, [instrument, fan]);
  if (!fan || !fan.price || fan.price === -1) return <Spinner />;

  //       <pre>{JSON.stringify(bulk, null, 4)}</pre>

  return (
    <>
      <div className='container-fluid'>
        <p>Allways have some bits below and above</p>

        <ul>
          <li>Set order (scaled)</li>
          <li>Set StopLoss</li>
          <li>Set TakeProfit</li>
        </ul>

        <div className='row form-group'>
          <div className='col-8'>
            <BaseForm
              {...{
                price: fan.price,
                onChange,
                orderTypes,
                ordType: fan.ordType,
                ...fan,
                lastPrice: (instrument && instrument.lastPrice) || -1,
              }}
            />
          </div>
        </div>
        <div className='row form-group'>
          {/* orderCount */}
          <div className='col-2'>
            <div className='input-group'>
              <div className='input-group-prepend'>
                <span className='input-group-text'>count</span>
              </div>
              <input onChange={onChange} type='number' min={2} name='count' className='form-control' value={fan.count} placeholder='count' />
            </div>
          </div>
          {/* spread */}
          <div className='col-2'>
            <div className='input-group'>
              <div className='input-group-prepend'>
                <span className='input-group-text'>spread</span>
              </div>
              <input onChange={onChange} type='number' name='spread' className='form-control' value={fan.spread} placeholder='spread' />
            </div>
          </div>

          {/* OrderType */}
          <div className='col-2'>
            <div className='orderType'>
              <div className='custom-control custom-checkbox'>
                <input type='checkbox' className='custom-control-input' id='postOnly' />
                <label className='custom-control-label' htmlFor='postOnly'>
                  Post-Only
                </label>
              </div>
              <div className='custom-control custom-checkbox'>
                <input type='checkbox' className='custom-control-input' id='reduceOnly' />
                <label className='custom-control-label' htmlFor='reduceOnly'>
                  Reduce-Only
                </label>
              </div>
              <div className='custom-control custom-checkbox'>
                <input type='checkbox' className='custom-control-input' id='hidden' />
                <label className='custom-control-label' htmlFor='hidden'>
                  Hidden
                </label>
              </div>
              <div className='custom-control custom-checkbox'>
                <input type='checkbox' className='custom-control-input' id='retryOnOverload' />
                <label className='custom-control-label' htmlFor='retryOnOverload'>
                  Retry on overload
                </label>
              </div>
            </div>
          </div>
          {/* Exec Button */}
          <div className='col-2'>
            <button onClick={submitOrders} className={`btn btn-block ${fan.side === 'Sell' ? 'btn-danger' : 'btn-success'}`}>
              Exec {fan.side}
            </button>
          </div>
        </div>

        <br />
        <br />
        <br />
        <br />
        {/* List Orders */}
        <div className='row'>
          <div className='col-2'>
            <h3>Limit Orders</h3>
            <table className='table table-responsive orderTable'>
              <thead>
                <tr>
                  <th>Price</th>
                  <th>OrderQty</th>
                  <th>Side</th>
                  <th>OrderVAlue</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order: any, i: number) => (
                  <tr key={`orders-${i}`}>
                    <td>{order.price}</td>
                    <td>{order.orderQty}</td>
                    <td>{order.side}</td>
                    {/*<td><small>{JSON.stringify(order)}</small></td>*/}
                    <td>
                      <span className={order.orderQty / order.price >= 0.0025 ? '' : 'spammOrder'}> {(order.orderQty / order.price).toFixed(4)} XBT</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className='col-2'>
            <h3>Take Profit Orders</h3>
            <table className='table table-responsive orderTable'>
              <thead>
                <tr>
                  <th>Price</th>
                  <th>OrderQty</th>
                  <th>Side</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order: any, i: number) => (
                  <tr key={`orders-${i}`}>
                    <td>{order.price}</td>
                    <td>{order.orderQty}</td>
                    <td>{order.side}</td>
                    {/*<td><small>{JSON.stringify(order)}</small></td>*/}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className='col-2'>
            <h3>StopLoss Orders</h3>
            <table className='table table-responsive orderTable'>
              <thead>
                <tr>
                  <th>Price</th>
                  <th>OrderQty</th>
                  <th>Side</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order: any, i: number) => (
                  <tr key={`orders-${i}`}>
                    <td>{order.price}</td>
                    <td>{order.orderQty}</td>
                    <td>{order.side}</td>
                    {/*<td><small>{JSON.stringify(order)}</small></td>*/}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <br />
        <br />
        <br />
        <br />
        <i>https://github.com/Effanuel/BitMEX-scaled-orders</i>
        <br />
        <i>https://kb.clientam.com/article/1005</i>
        <pre>{JSON.stringify({ fan }, null, 2)}</pre>

        <ul>
          <li>Maximum 200 open orders per contract per account;</li>
          <li>Maximum 10 stop orders per contract per account;</li>
          <li>if you are marked as a Spam Account:</li>
          <li>Orders below 0.0025 XBT in value will automatically become hidden orders.</li>
          <li>Hidden orders do not show in the orderbook and always pay the taker fee.</li>
          <li>Post-Only spam orders will be Rejected instead of being hidden.</li>
          <li>Too many spam orders may be grounds to temporarily ban an account from trading.</li>
          <li>Spam Account designations are re-evaluated and lifted automatically every 24 hours if user behavior has changed.</li>
        </ul>
      </div>
    </>
  );
};

const List = connect(mapStateToProps)(ConnectedList);

export default List;
let o = { orderQty: 1, price: 6950, symbol: 'XBTUSD', ordType: 'Limit', side: 'Sell', text: 'fan order 0' };
let f = { orderQty: 16, price: 6950, symbol: 'XBTUSD', ordType: 'Limit', side: 'Sell', text: 'fan order 0' };
