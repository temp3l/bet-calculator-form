import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../Spinner';
import BaseForm from '../OrderForm/BaseForm';
import { OrderTypeEnum, IOrder, SideEnum } from '../../types/Order';
import { postOrder } from '../../connectors/bitmexHttp';

const mapStateToProps = (state: any) => ({ instrument: state.socket.instrument });

const orderTypes = [
  { value: 'Limit', text: 'The default order type. Specify an orderQty and price.' },
  { value: 'StopLimit', text: 'Like a Stop Market, but enters a Limit order instead of a Market order. Specify an orderQty, stopPx, and price.' },
  { value: 'LimitIfTouched', text: 'As above; use for Take Profit Limit orders.' }
];

const getDefaults = () => {
  const defaultFan = {
    price: -1,
    amount: 50,
    symbol: 'XBTUSD',
    side: 'Buy',
    count: 3,
    spread: 50,
    ordType: OrderTypeEnum.Limit
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
  const onChange = (e: any) => {
    setFan({ ...fan, [e.target.name]: e.target.value });
    persistState();
  };

  const returnOrders = (): IOrder[] => {
    const { price, count, side, amount, spread } = fan;
    return _.times(fan.count, i => {
      const order: IOrder = {
        orderQty: Math.round(Number(amount) / Number(count)),
        price: Math.round(side === 'Buy' ? Number(price) - i * spread : Number(price) + i * spread),
        symbol: 'XBTUSD',
        ordType: OrderTypeEnum.Limit,
        side: SideEnum.Buy,
        text: `fan order ${i}`
      };
      return order;
    });
  };

  const persistState = () => localStorage.setItem('fan', JSON.stringify(fan));

  const submitOrders = () => {
    postOrder({ orders })
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.log('############# error posting');
        console.log(e);
      })
      .finally(() => {
        console.log('finally ....');
      });
  };

  React.useEffect(() => {
    setOrders(returnOrders());
  }, [fan]);

  React.useEffect(() => {
    if (!fan || !fan.price) return;
    if (instrument && instrument.lastPrice && fan.price === -1) {
      setFan({ ...fan, price: instrument.lastPrice });
      persistState();
    }
  }, [instrument, fan]);
  if (!fan || !fan.price || fan.price === -1) return <Spinner />;

  return (
    <>
      <div className='container-fluid'>
        <div className='row form-group'>
          <div className='col-8'>
            <BaseForm
              {...{
                price: fan.price,
                onChange,
                orderTypes,
                ordType: fan.ordType,
                ...fan,
                lastPrice: (instrument && instrument.lastPrice) || -1
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
              <input onChange={onChange} type='number' name='count' className='form-control' value={fan.count} placeholder='count' />
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

          {/*  */}
          <div className='col-6'></div>
          <div className='col'>
            <pre>{JSON.stringify({ fan }, null, 2)}</pre>
          </div>
        </div>
        {/* List Orders */}
        <div className='row'>
          <div className='col-8'>
            <table className='table table-condensed col-2'>
              <tbody>
                {orders.map((order: any, i: number) => (
                  <tr key={`orders-${i}`}>
                    <td>{order.price}</td>
                    <td>{order.orderQty}</td>
                    <td>{order.side}</td>
                    <td>
                      <small>
                        <pre>{JSON.stringify(order)}</pre>
                      </small>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Exec Button */}

          <div className='col'>
            <button onClick={submitOrders} className={`btn btn-block btn-info`}>
              Exec {fan.side}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const List = connect(mapStateToProps)(ConnectedList);

export default List;
