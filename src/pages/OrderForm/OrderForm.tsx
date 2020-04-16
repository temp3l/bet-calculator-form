/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { OrderTypeEnum, IOrder, SideEnum } from '../../types/Order';
import { postOrder } from '../../connectors/bitmexHttp';
import './OrderForm.css';

const OrderTypes = [
  { value: 'Limit', text: 'The default order type. Specify an orderQty and price.' },
  { value: 'Market', text: 'A traditional Market order. A Market order will execute until filled or your bankruptcy price is reached, at which point it will cancel.' },
  //{ value: 'Stop', text: 'A Stop Market order. Specify an orderQty and stopPx. When the stopPx is reached, the order will be entered into the book. On sell orders, the order will trigger if the triggering price is lower than the stopPx. On buys, higher.' },
  //{ value: 'Note', text: 'Stop orders do not consume margin until triggered. Be sure that the required margin is available in your settings so that it may trigger fully.' },
  //{ value: 'Close', text: "Stops don't require an orderQty. See Execution Instructions below." },
  //{ value: 'StopLimit', text: 'Like a Stop Market, but enters a Limit order instead of a Market order. Specify an orderQty, stopPx, and price.' },
  //{ value: 'MarketIfTouched', text: 'Similar to a Stop, but triggers are done in the opposite direction. Useful for Take Profit orders.' },
  //{ value: 'LimitIfTouched', text: 'As above; use for Take Profit Limit orders.' }
];
type StopsState = {
  SL: string;
  SLPrice: number;
  TP: string;
  TPPrice: number;
};
type SettingsState = {
  capitalUSD: string;
  capitalBTC: string;
};

const mapStateToProps = (state: any) => ({ instrument: state.socket.instrument });

const ConnectedForm = ({ instrument }: any) => {
  const [settings, setSettings] = React.useState<SettingsState>({ capitalUSD: '200', capitalBTC: '' });
  const [stops, setStops] = React.useState<StopsState>({ SL: '0.5', SLPrice: 0, TP: '1', TPPrice: 0 });
  const [state, setState] = React.useState<IOrder>({
    symbol: 'XBTUSD',
    price: -1,
    orderQty: 100,
    ordType: OrderTypeEnum.Limit,
    side: SideEnum.Buy,
    text: 'from bet-calculator-form',
  });

  const onChange2 = (e: any) => {
    const { name, value } = e.target;
    let val = name === 'price' ? Number(value) : value;
    setState({ ...state, [name]: val });
  };
  const changeStops = (e: any) => {
    const { name, value } = e.target;
    setStops({ ...stops, [name]: value });
  };
  const changeSettings = (e: any) => {
    const { name, value } = e.target;
    console.log({ name, value });
    setSettings({ ...settings, [name]: Number(value) });
  };
  //const usd2btc = ({ capitalUSD, btcUsdRate }: SettingsState) => (Number(capitalUSD) / Number(btcUsdRate)).toFixed(4);
  // STOPLOSSLIMIT: { "ordType":"StopLimit","price":7270,"stopPx":7230.5,"orderQty":400,"side":"Buy","execInst":"Close,LastPrice","symbol":"XBTUSD","text":"Submission from testnet.bitmex.com"}
  // TAKEPROFITLIMIT: {"ordType":"LimitIfTouched","price":7200,"stopPx":7230.5,"orderQty":400,"side":"Sell","execInst":"Close,LastPrice","symbol":"XBTUSD","text":"Submission from testnet.bitmex.com"}
  const execTrades = () => {
    console.log({ order: state, stops });
    let orders: IOrder[] = [
      state,
      {
        // STOP-LOSS-LIMIT
        symbol: 'XBTUSD',
        stopPx: stops.SLPrice, // trigger
        price: Number(state.side === 'Sell' ? Number(stops.SLPrice) + 60 : Number(stops.SLPrice) - 60),
        orderQty: Number(state.orderQty),
        ordType: 'StopLimit',
        side: state.side === 'Sell' ? SideEnum.Buy : SideEnum.Sell,
        text: 'stopLoss',
        execInst: 'Close,LastPrice',
      },
      {
        // TAKE-PROFIT-LIMIT
        symbol: 'XBTUSD',
        stopPx: Number(stops.TPPrice),
        price: Number(stops.TPPrice), //state.side === 'Sell' ? Number(stops.TPPrice) + 100 : Number(stops.TPPrice) - 100,
        orderQty: Number(state.orderQty),
        ordType: 'LimitIfTouched',
        side: state.side === 'Sell' ? SideEnum.Buy : SideEnum.Sell,
        text: 'take Profit',
        execInst: 'Close,LastPrice',
      },
    ];
    postOrder({ orders })
      .then((res: any) => {
        console.log(res);
      })
      .catch((e: any) => {
        console.log('############# error posting');
        console.log(e);
      })
      .finally(() => {
        console.log('finally ....');
      });
    console.log(JSON.stringify(orders, null, 5));
  };
  React.useEffect(() => {
    const { price: _price, side } = state;
    if (_price === -1) return;
    const SLDiff = (Number(_price) / 100) * Number(stops.SL);
    const TPDiff = (Number(_price) / 100) * Number(stops.TP);
    let _SLPrice, _TPPrice;
    if (side === 'Sell') {
      _SLPrice = Number(_price) + SLDiff;
      _TPPrice = Number(_price) - TPDiff;
    } else {
      _SLPrice = Number(_price) - SLDiff;
      _TPPrice = Number(_price) + TPDiff;
    }
    setStops({
      ...stops,
      SLPrice: Math.round(_SLPrice),
      TPPrice: Math.round(_TPPrice),
    });
    if (instrument && instrument.lastPrice && state.price === -1) {
      setState({ ...state, price: instrument.lastPrice });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stops.TP, stops.SL, state]);

  return (
    <div className='container'>
      {/* <!-- Symbol, Limit/Margin -->*/}
      <div className='form-group row'>
        <div className='col'>
          {/* <!-- select Symbol --> */}
          <div className='input-group'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>capital</span>
            </div>
            <input onChange={changeSettings} type='string' name='capitalUSD' className='form-control' value={settings.capitalUSD} placeholder='USD' />
          </div>
        </div>
        <div className='col'>
          <div className='input-group'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>Symbol</span>
            </div>
            <input readOnly onChange={onChange2} type='text' name='symbol' className='form-control' id='symbol' value={state.symbol} />
          </div>
        </div>
        <div className='col'>
          {/* <!-- select Limit --> */}
          <div className='input-group mb-3'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>Type</span>
            </div>
            <select className='form-control' id='ordType' onChange={onChange2} name='ordType' disabled>
              {OrderTypes.map(({ value, text }) => (
                <option key={`oType-${value}`} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* <!-- Action Button Group / Submit -->*/}
      <div className='form-group row'>
        <div className='col'>
          <button onClick={() => setState({ ...state, side: SideEnum.Buy })} className={`btn btn-block  ${state.side === 'Buy' ? 'btn-success' : 'btn-outline-success'}`}>
            Long{' '}
            <span className='actionButtonSubtitle'>
              {state.orderQty} @ {state.price}
            </span>
          </button>
        </div>
        <div className='col'>
          <button onClick={() => setState({ ...state, side: SideEnum.Sell })} className={`btn btn-block  ${state.side === 'Sell' ? 'btn-danger' : 'btn-outline-danger'}`}>
            Short{' '}
            <span className='actionButtonSubtitle'>
              {state.orderQty} @ {state.price}
            </span>
          </button>
        </div>
      </div>

      {/* <!-- second row: Price + Quantity --> */}
      <div className='form-group row'>
        <div className='col'>
          <div className='input-group mb-3'>
            <div
              className='input-group-prepend clickRate'
              onClick={() => {
                setState({ ...state, price: instrument.lastPrice });
              }}
            >
              <span className='input-group-text '>Rate {instrument && instrument.lastPrice}</span>
            </div>
            <input value={state.price} onChange={() => {}} name='rate' type='number' className='form-control' placeholder='Rate' />
          </div>
        </div>
        <div className='col'>
          <div className='input-group mb-3'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>Price</span>
            </div>
            <input value={state.price} onChange={onChange2} name='price' type='number' className='form-control' id='orderQty' placeholder='Contract Count' />
          </div>
        </div>
        <div className='col'>
          <div className='input-group mb-3'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>Quantity</span>
            </div>
            <input value={state.orderQty} onChange={onChange2} name='orderQty' type='number' className='form-control' id='orderQty' placeholder='Contract Count' />
          </div>
        </div>
      </div>

      {/* <!-- third Row: StopLoss + TakeProfit --> */}
      <div className='form-group row'>
        <div className='col'>
          <div className='input-group'>
            <div className='input-group-prepend'>
              <span className='input-group-text stopsLabel'>SL {stops.SL}%</span>
            </div>
            <input min='1' max='100' value={stops.SL} type='range' onChange={changeStops} name='SL' className='form-control form-control-range' />
            <span className='font-weight-bold ml-2 mt-1'>{stops.SLPrice}</span>
          </div>
        </div>

        <div className='col'>
          <div className='input-group'>
            <div className='input-group-prepend'>
              <span className='input-group-text stopsLabel'>TP {stops.TP}%</span>
            </div>
            <input min='1' max='100' value={stops.TP} type='range' onChange={changeStops} name='TP' className='form-control form-control-range' />
            <span className='font-weight-bold ml-2 mt-1'>{stops.TPPrice}</span>
          </div>
        </div>
      </div>

      <div className='form-group row'>
        <div className='col'>
          <button onClick={execTrades} className='btn btn-info btn-block'>
            Exec
          </button>
        </div>
      </div>
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <a href='htTPs://testnet.bitmex.com/api/explorer/#!/Order/Order_new' target='_blank' rel='noopener noreferrer'>
          posting bitmex orders
        </a>
        <br />
        <br />
        <pre>{JSON.stringify({ stops, state }, null, 2)}</pre>
      </div>
    </div>
  );
};

const Form = connect(mapStateToProps)(ConnectedForm);

export default Form;
